import Image from "next/image";
import formatprice from "@/util/PriceFormat";
import { ProductType } from "@/type/ProductType";
import Link from "next/link";

export default function Product({
  name,
  image,
  unit_amount,
  id,
  description,
  metadata,
}: ProductType) {
  const { features } = metadata
  return (
    <Link
      href={{
        pathname: `/product/${id}`,
        query: { name, image, unit_amount, id, description, features },
      }}
    >
      <div className="bg-base-100 shadow-xl p-4">
        <Image
          src={image}
          alt={name}
          width={600}
          height={600}
          className="w-full object-cover rounded-lg"
          priority={true}
        />
        <div className="font-medium py-2">
          <h1>{name}</h1>
          <h2 className="text-sm text-primary">
            {unit_amount !== null ? formatprice(unit_amount) : "N/A"}
          </h2>
        </div>
      </div>
    </Link>
  );
}
