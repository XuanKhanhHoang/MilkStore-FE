import "./page.scss";
import { notFound } from "next/navigation";
import isEmptyObject from "@/util/isEmptyObject";
import RenderAProductInfo from "@/components/storeComponents/RenderAProductInfo/RenderAProductInfo";
async function page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  let data: productInfo = await fetch(
    "http://localhost:8081/product?productId=" + (searchParams?.productId || 1),
    { cache: "no-store" }
  ).then((pr) => pr.json());
  if (searchParams == undefined) return notFound();
  if (isEmptyObject(data) == true) return <main>Product not found.</main>;
  return <RenderAProductInfo productInfo={data} />;
}
export default page;
