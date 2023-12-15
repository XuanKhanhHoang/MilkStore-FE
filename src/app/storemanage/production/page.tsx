// import "./page.scss";
import { notFound } from "next/navigation";
import isEmptyObject from "@/util/isEmptyObject";
import ProductDetail from "@/components/adminComponents/ProductDetail";
async function page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  try {
    let data: productInfo = await fetch(
      "http://localhost:8081/product?productId=" +
        (searchParams?.productId || 1),
      { cache: "no-store" }
    ).then((pr) => pr.json());
    if (searchParams == undefined) return notFound();
    if (isEmptyObject(data) == true) return <main>Product not found.</main>;

    let categoryList = await fetch("http://localhost:8081/product/categories", {
      next: { revalidate: 3600 },
    }).then((pr) => pr.json());
    return <ProductDetail productInfo={data} categoryList={categoryList} />;
  } catch (e) {
    console.log(e);
    return <div>Something wrong</div>;
  }
}
export default page;
