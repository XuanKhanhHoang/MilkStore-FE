import RenderMainNavbar from "./RenderMainNavbar";

export default async function Navbar() {
  let res: Response;
  res = await fetch("http://localhost:8081/product/categories");
  let data: categoriesDTO[] | [] = [];
  if (res.ok) {
    data = await res.json();
  }
  return <RenderMainNavbar data={data} />;
}
