import RenderProductList from "@/components/storeComponents/RenderListProduct";

export default function Home() {
  return (
    <main className="max-w-screen-xl px-2">
      <RenderProductList url="http://localhost:8081/product/productlist" />
    </main>
  );
}
