"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import orderpic from "@/public/orderpic.jpg";
import Link from "next/link";
import { useCartStore } from "@/store";
import { useEffect } from "react";

export default function OrderConfirmed() {
  const cartStore = useCartStore();

      useEffect(() => {
            cartStore.setPaymentIntent("")
            cartStore.clearCart()
      })
  return (
    <motion.div
      className="flex items-center justify-center my-12"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <div className="p-12 rounded-md text-center">
        <h1 className="text-xl font-medium">Your order has been placed</h1>
        <h2 className="text-sm my-4">Check your email for the receipt.</h2>
        <Image src={orderpic} className="py-8" alt="orderpic" />
        <div className="flex item-center justify-center gap-12">
          <Link href={"./dashboard"}>
            <button className="font-medium">Check your Order</button>
          </Link>
          <button
            onClick={() => {
              cartStore.setCheckout("cart");
              cartStore.toggleCart();
            }}
          >
            Create a new Order
          </button>
        </div>
      </div>
    </motion.div>
  );
}
