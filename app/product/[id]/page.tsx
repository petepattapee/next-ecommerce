import Image from "next/image";
import { SearchParamsTypes } from "@/type/SearchParamsType";
import formatprice from "@/util/PriceFormat";
import AddCart from "./AddCart";

export default async function Product({ searchParams }: SearchParamsTypes) {
  return (
    <div className="flex flex-col 2xl:flex-row items-center justify-between gap-24 text-gray-700">
      <Image
        src={searchParams.image}
        alt={searchParams.name}
        width={600}
        height={600}
        priority={true}
      />
      <div className=" font-medium text-primary">
        <h1 className="text-2xl py-2">{searchParams.name}</h1>
        <p className="py-2">{searchParams.description}</p>
        <p className="py-2">{searchParams.features}</p>
        <div className="flex gap-2">
          <p className="font-bold text-primary">
            {searchParams.unit_amount !== null
              ? formatprice(searchParams.unit_amount)
              : "N/A"}
          </p>
        </div>
        <AddCart {...searchParams} />
      </div>
    </div>
  );
}
