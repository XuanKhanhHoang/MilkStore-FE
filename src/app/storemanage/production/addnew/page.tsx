// import "./page.scss";

import ProductDetail from "@/components/adminComponents/ProductDetail";

export default async function page() {
  let categoryList = await fetch("http://localhost:8081/product/categories", {
    next: { revalidate: 3600 },
  }).then((pr) => pr.json());
  return <ProductDetail productInfo={undefined} categoryList={categoryList} />;
}
