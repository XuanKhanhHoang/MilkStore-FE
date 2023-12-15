import RenderProductList from "@/components/storeComponents/RenderListProduct";
import { Metadata } from "next";
import React from "react";
export async function generateMetadata({
  params,
}: {
  params: {
    category_id: string;
  };
}): Promise<Metadata> {
  const category_id = params?.category_id;
  // read route params
  const url = "Product " + category_id;
  return {
    title: url,
    description: url,
  };
}

export default function page({
  params,
}: {
  params: {
    category_id: string;
  };
}) {
  const category_id = params?.category_id;
  return (
    <RenderProductList
      url={`http://localhost:8081/product/productlist/${category_id}`}
    />
  );
}
