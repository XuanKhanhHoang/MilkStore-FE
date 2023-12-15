import RenderProductList from "@/components/adminComponents/RenderListProduct";
import fetchData from "@/util/fetchData";
import React from "react";

export default async function page() {
  let listProduct: productGeneral[];
  listProduct = [];
  if (typeof window == "undefined") {
    await fetchData(`http://localhost:8081/product/productlist/`).then((dt) => {
      listProduct = dt;
    });
  }
  return (
    <main>
      {listProduct.length != 0 ? (
        <RenderProductList listProduct={listProduct} />
      ) : (
        <div>Somthing wrong</div>
      )}
    </main>
  );
}
