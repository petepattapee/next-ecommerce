import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AddCartType } from "./type/AddCartType";


type CartState = {
  isOpen: boolean;
  cart: AddCartType[];
  toggleCart: () => void;
  clearCart: () => void;
  addProduct: (item: AddCartType) => void;
  removeProduct: (item: AddCartType) => void;
  paymentIntent: string;
  onCheckout: string;
  setCheckout: (val: string) => void;
  setPaymentIntent: (val: string) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      isOpen: false,
      paymentIntent: "",
      onCheckout: "cart",
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      addProduct: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) => cartItem.id === item.id
          );
          if (existingItem) {
            const updatedCart = state.cart.map((cartItem) => {
              if (cartItem.id === item.id) {
                return { ...cartItem, quantity: cartItem.quantity! + 1 };
              }
              return cartItem;
            });
            return { cart: updatedCart };
          } else {
            return { cart: [...state.cart, { ...item, quantity: 1 }] };
          }
        }),
      removeProduct: (item) =>
        set((state) => {
          //check item and -1
          const existingItem = state.cart.find(
            (cartItem) => cartItem.id === item.id
          );
          if (existingItem && existingItem.quantity! > 1) {
            const updatedCart = state.cart.map((cartItem) => {
              if (cartItem.id === item.id) {
                return { ...cartItem, quantity: cartItem.quantity! - 1 };
              }
              return cartItem;
            });
            return { cart: updatedCart };
          } else {
            //remove item from cart
            const filtedredCart = state.cart.filter(
              (cartItem) => cartItem.id !== item.id
            );
            return { cart: filtedredCart };
          }
        }),
        setCheckout: (val) => set((state) => ({ onCheckout: val })),
        clearCart: () => set((state) => ({ cart: [] })),
        setPaymentIntent: (val) => set((state) => ({ paymentIntent: val}))
    }),
    { name: "cart-store" }
  )
);
