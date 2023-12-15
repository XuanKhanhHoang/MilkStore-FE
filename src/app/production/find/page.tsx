import { notFound } from "next/navigation";
import RenderProductList from "@/components/storeComponents/RenderListProduct";
async function page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  if (searchParams == undefined || searchParams.search_key == undefined)
    return notFound();
  return (
    <RenderProductList
      url={
        "http://localhost:8081/product/find?search_key=" +
        searchParams?.search_key
      }
    />
  );
}
export default page;
