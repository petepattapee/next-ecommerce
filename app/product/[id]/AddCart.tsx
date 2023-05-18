"use client";

import { useCartStore } from "@/store";
import { AddCartType } from "@/type/AddCartType";
import { useState } from "react";


export default function AddCart({
  name,
  id,
  image,
  unit_amount,
  quantity,
}: AddCartType) {
  const cartStore = useCartStore();
  cartStore.addProduct;
  const [added, setAdded] = useState(false)

  const handleAddtoCart = () => {
    cartStore.addProduct({ id, image, unit_amount, quantity, name })
    setAdded(true)
    setTimeout(() => {
      setAdded(false)
    }, 500)
  }
  
  return (
    <>
      <button
        onClick={handleAddtoCart}
        disabled={added}
        className="my-4 btn btn-primary"
      >
        {!added && <span>Add to Cart</span>}
        {added && <span>Adding to Cart</span>}
      </button>
    </>
  );
}
