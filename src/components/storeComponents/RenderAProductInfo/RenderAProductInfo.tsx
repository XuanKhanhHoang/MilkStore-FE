import ImageFallback from "@/components/generalComponents/FallbackNextImage";
import ProductVariationPrice from "./ProductVariationPrice";

function RenderAProductInfo({ productInfo }: { productInfo: productInfo }) {
  if (productInfo == undefined) return <div>Something wrong</div>;
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className=" w-full flex justify-between flex-wrap">
        {/* img         */}
        <div className="w-full lg:w-4/12">
          <ImageFallback
            src={productInfo.PRODUCT_LOGO_IMAGE}
            fallbackSrc={undefined}
            className="mx-auto h-fit w-auto"
            alt=" "
          />
        </div>
        <div className="w-full lg:w-5/12 flex flex-col p-3">
          {/* img         */}
          <h3 className="font-semibold text-[#3d71e7] text-lg">
            {productInfo.PRODUCT_NAME}
          </h3>
          <hr className="my-2" />
          <ProductVariationPrice variation={productInfo.product_variation} />
          <hr className="my-3" />
          <div className="text-sm">
            <span> Thời gian đặt hàng và giao hàng </span>
            <ul>
              <li>- Đặt hàng trước 10h sáng: giao hàng trong ngày .</li>
              <li>- Đặt hàng sau 10h sáng: giao hàng trong ngày hôm sau </li>
              <li>
                - Đơn hàng đặt sau 10h sáng Thứ 7 cho đến hết Chủ nhật sẽ được
                xử lý vào Thứ 2 tuần kế tiếp{" "}
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full mx-3 lg:mx-0 lg:w-3/12 bg-gray-200 rounded-lg p-3 h-fit">
          <div className="flex ">
            <div className="inline-block my-auto">
              <i className="fa-solid fa-truck text-[#98b9f0] text-2xl p-3 h-full"></i>
            </div>
            <div className="inline-block my-auto h-full ">
              <span className="text-base text-blue-500 font-medium">
                MIỄN PHÍ GIAO HÀNG
              </span>
              <p className="text-sm">Đơn hàng 300.000 đ trở lên</p>
            </div>
          </div>
          <hr className="my-2 bg-slate-400 h-[2px]" />
          <div className="flex ">
            <div className="inline-block my-auto p-3">
              <svg
                className="w-6 h-6 text-pink-300 dark:text-pink-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 21 19"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 4C5.5-1.5-1.5 5.5 4 11l7 7 7-7c5.458-5.458-1.542-12.458-7-7Z"
                />
              </svg>
            </div>
            <div className="inline-block my-auto h-full ">
              <span className="text-base text-blue-500 font-medium">
                ĐẢM BẢO CHẤT LƯỢNG
              </span>
              <p className="text-sm">Sản phẩm đã được kiểm định</p>
            </div>
          </div>
          <hr className="my-2 bg-slate-400 h-[2px]" />
          <div className="flex ">
            <div className="inline-block my-auto p-3">
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 18"
                fill="currentColor"
              >
                <path
                  d="M18 4H16V9C16 10.0609 15.5786 11.0783 14.8284 11.8284C14.0783 12.5786 13.0609 13 12 13H9L6.846 14.615C7.17993 14.8628 7.58418 14.9977 8 15H11.667L15.4 17.8C15.5731 17.9298 15.7836 18 16 18C16.2652 18 16.5196 17.8946 16.7071 17.7071C16.8946 17.5196 17 17.2652 17 17V15H18C18.5304 15 19.0391 14.7893 19.4142 14.4142C19.7893 14.0391 20 13.5304 20 13V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4Z"
                  fill="currentColor"
                />
                <path
                  d="M12 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V9C0 9.53043 0.210714 10.0391 0.585786 10.4142C0.960859 10.7893 1.46957 11 2 11H3V13C3 13.1857 3.05171 13.3678 3.14935 13.5257C3.24698 13.6837 3.38668 13.8114 3.55279 13.8944C3.71889 13.9775 3.90484 14.0126 4.08981 13.996C4.27477 13.9793 4.45143 13.9114 4.6 13.8L8.333 11H12C12.5304 11 13.0391 10.7893 13.4142 10.4142C13.7893 10.0391 14 9.53043 14 9V2C14 1.46957 13.7893 0.960859 13.4142 0.585786C13.0391 0.210714 12.5304 0 12 0Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div className="inline-block my-auto h-full ">
              <span className="text-base text-blue-500 font-medium">
                HỖ TRỢ
              </span>
              <p className="text-sm">Hotline: 1900 **** ****</p>
            </div>
          </div>
        </div>
      </div>
      <div className="my-3 mt-4 w-full  flex flex-wrap">
        <div className="w-full md:w-4/6 ">
          <h5 className="text-blue-600  font-medium text-2xl underline-offset-4 underline mb-5 ms-2">
            Mô tả sản phẩm
          </h5>
          {/* img         */}
          <div
            className=" p-2"
            dangerouslySetInnerHTML={{
              __html: productInfo.PRODUCT_DESCRIPTION,
            }}
          ></div>
        </div>
        <div className="hidden md:block w-2/6 p-4 border-l-2 ">
          <h5 className="text-blue-600  font-medium text-xl  mb-5 ms-2">
            Sản phẩm liên quan
          </h5>
        </div>
      </div>
    </div>
  );
}

export default RenderAProductInfo;
