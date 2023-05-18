import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authoptions } from "./auth/[...nextauth]";
import { AddCartType } from "@/type/AddCartType";
import { prisma } from "@/util/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});


const calculateOrderAmount = (items: AddCartType[]) => {
  const totalPrice = items.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!;
  }, 0);
  return totalPrice;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //GET USER
  const userSession = await getServerSession(req, res, authoptions);
  if (!userSession?.user) {
    res.status(403).json({ message: "Not logged in" });
    return;
  }
  //extract data from body
  const { items, payment_intent_id } = req.body;

  //create the order data
  const orderData = {
    user: { connect: { id: userSession.user?.id } },
    amount: calculateOrderAmount(items),
    currency: "thb",
    status: "pending",
    paymentIntentID: payment_intent_id,
    products: {
      create: items.map((item) => ({
        name: item.name,
        description: item.description || null,
        unit_amount: parseFloat(item.unit_amount),
        image: item.image,
        quantity: item.quantity,
      })),
    },
  };

  //check payment intent exist
  if (payment_intent_id) {
    const current_intent = await stripe.paymentIntents.retrieve(
      payment_intent_id
    );
    if (current_intent) {
      const updated_intent = await stripe.paymentIntents.update(
        payment_intent_id,
        { amount: calculateOrderAmount(items) }
      );
      //Fetch order with product id
      const existing_order = await prisma.order.findFirst({
        where: { paymentIntentID: updated_intent.id },
        include: { products: true },
      });
      if (!existing_order) {
        res.status(400).json({ message: "Invalid Payment Intent" });
      }

      //update existing orider
      const updated_order = await prisma.order.update({
        where: { id: existing_order?.id },
        data: {
          amount: calculateOrderAmount(items),
          products: {
            deleteMany: {},
            create: items.map((item) => ({
              name: item.name,
              description: item.description || null,
              unit_amount: parseFloat(item.unit_amount),
              image: item.image,
              quantity: item.quantity,
            })),
          },
        },
      });
      res.status(200).json({ paymentIntent: updated_intent })
      return
    }
  } else {
    //create new order
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "thb",
      automatic_payment_methods: { enabled: true },
    });
    orderData.paymentIntentID = paymentIntent.id;
    const newOrder = await prisma.order.create({
      data: orderData,
    });
    res.status(200).json({ paymentIntent });
  }
}
