import fetchData from "@/util/fetchData";
import ImageFallback from "../generalComponents/FallbackNextImage";
import Link from "next/link";
export default async function RenderProductList({ url }: { url: string }) {
  let listProduct: productGeneral[] | [];
  listProduct = [];
  if (typeof window == "undefined") {
    await fetchData(url).then((dt) => {
      listProduct = dt;
    });
  }
  console.log(url);
  if (listProduct.length == 0) return <main>Không tìm thấy sản phẩm !</main>;

  return (
    <div className="products">
      <h2 className="font-bold text-lg my-3 text-slate-600">
        Danh sách sản phẩm :{" "}
      </h2>
      <ul id="list-product" className="flex flex-row flex-wrap">
        {Array.isArray(listProduct) &&
          listProduct.length != 0 &&
          listProduct?.map((item, index) => {
            return (
              <li
                key={item.PRODUCT_ID}
                className="w-2/4 md:w-1/3 lg:w-1/4 flex ps-1"
              >
                <div className="w-11/12 bg-white border p-2 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700  my-2 ">
                  <div className="h-[300px] flex items-center">
                    <Link href={"/production?productId=" + item.PRODUCT_ID}>
                      <ImageFallback
                        src={item.PRODUCT_LOGO_IMAGE}
                        fallbackSrc={undefined}
                        className="rounded-t-lg w-fit h-auto "
                        alt=" "
                      />
                    </Link>
                  </div>

                  <div className="p-5">
                    <Link href={"/production?productId=" + item.PRODUCT_ID}>
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-base text-center">
                        {item.PRODUCT_NAME}
                      </h5>
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
