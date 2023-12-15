import RenderProductList from "@/components/storeComponents/RenderListProduct";
import fetchData from "@/util/fetchData";
import { Metadata } from "next";
import React from "react";
// export async function generateMetadata({
//   searchParams,
// }: {
//   searchParams?: { [key: string]: string | string[] | undefined };
// }): Promise<Metadata> {
//   const category_id = searchParams?.category_id;
//   // read route params
//   const url = "Product " + category_id;
//   return {
//     title: url,
//     description: url,
//   };
// }

export default function page() {
  return (
    <RenderProductList url={"http://localhost:8081/product/productlist/"} />
  );
}
