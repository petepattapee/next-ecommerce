"use client";

import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Cart from "./Cart";
import { useCartStore } from "@/store";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";

export default function Nav({ user }: Session) {
  const cartStore = useCartStore();
  return (
    <div className="navbar bg-base-100 py-8">
      <div className="flex-1">
        <Link href={"/"}>
          <h1 className="btn btn-ghost normal-case text-xl">Pete Store</h1>
        </Link>
      </div>
      <ul className="flex item-center gap-12">
        {/* Toggle the Cart */}
        <li
          onClick={() => cartStore.toggleCart()}
          className="flex items-center text-3xl relative cursor-pointer"
        >
          <AiOutlineShoppingCart />
          <AnimatePresence>
            {cartStore.cart.length > 0 && (
              <motion.span
                animate={{ scale: 1 }}
                initial={{ scale: 0 }}
                exit={{ scale: 0 }}
                className="bg-white text-black text-sm font-bold w-5 h-5 rounded-full border-2 drop-shadow-2xl border-solid absolute left-4 bottom-4 flex items-center justify-center"
              >
                {cartStore.cart.length}
              </motion.span>
            )}
          </AnimatePresence>
        </li>
        {/* if user not signin */}
        {!user && (
          <>
            <li className="bg-primary text-white py=2 px-4 rounded-md">
              <button onClick={() => signIn()}>Sign in</button>
            </li>
          </>
        )}
        {user && (
          <li>
            <div className="dropdown dropdown-end cursor-pointer">
              <Image
                src={user?.image as string}
                alt={user.name as string}
                width={36}
                height={36}
                className="drop-shadow-2xl rounded-full border-solid border-2 border-black "
                tabIndex={0}
              />
              <ul
                tabIndex={0}
                className="dropdown-content menu p-4 space-y-4 shadow bg-base-100 rounded-box w-72"
              >
                <Link
                  className="hover:bg-base-300 p-4 rounded-md"
                  href={"/dashboard"}
                  onClick={() => {
                    if (document.activeElement instanceof HTMLElement) {
                      document.activeElement.blur();
                    }
                  }}
                >
                  Orders
                </Link>
                <li
                  onClick={() => {
                    signOut();
                    if (document.activeElement instanceof HTMLElement) {
                      document.activeElement.blur();
                    }
                  }}
                  className="hover:bg-base-300 p-4 rounded-md"
                >
                  Sign out
                </li>
              </ul>
            </div>
          </li>
        )}
      </ul>
      <AnimatePresence>{cartStore.isOpen && <Cart />}</AnimatePresence>
    </div>
  );
}
