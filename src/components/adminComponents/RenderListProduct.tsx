"use client";
import ImageFallback from "../generalComponents/FallbackNextImage";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Modal from "../generalComponents/modal";
import { handleDeleteProduct } from "./handleDeleteProduct";
import { useDebounce } from "@/customHooks/useDebounce";
import { toast } from "react-toastify";
export default function RenderProductList({
  listProduct,
}: {
  listProduct: productGeneral[];
}) {
  const [showModal, setShowModal] = useState<Boolean>(false);
  const [deleteId, setDeleteId] = useState<number>(-1);
  const [searchKey, setSearchKey] = useState<string>("");
  const debounced = useDebounce(searchKey, 1000);
  const [lstProduct, setLstProduct] = useState<productGeneral[]>(listProduct);
  const ref = useRef(false);
  const updateListProduct = async () => {
    if (searchKey == "") {
      let res: Response = await fetch(
        "http://localhost:8081/product/productlist"
      );
      if (res.ok) {
        let result: productGeneral[] | errRequest = await res.json();
        if ("message" in result) {
          toast.error("Something wrong", { autoClose: 1000 });
          return;
        }
        setLstProduct(result);
      } else {
        toast.error("Something wrong", { autoClose: 1000 });
      }
    } else {
      let res: Response = await fetch(
        "http://localhost:8081/product/find?search_key=" + searchKey
      );
      if (res.ok) {
        let result: productGeneral[] | errRequest = await res.json();
        if ("message" in result) {
          toast.error("Something wrong", { autoClose: 1000 });
          return;
        }
        setLstProduct(result);
      } else {
        toast.error("Something wrong", { autoClose: 1000 });
      }
    }
  };
  useEffect(() => {
    if (!ref.current) ref.current = true;
    else {
      updateListProduct();
    }
  }, [debounced]);
  return (
    <div className="products">
      {showModal && (
        <Modal
          handle={() => handleDeleteProduct(deleteId)}
          hide={() => setShowModal(false)}
          title="Xóa sản phẩm này ?"
          content={"Xóa sản phẩm có id là" + deleteId}
          action="Xóa"
        />
      )}
      <div className="flex justify-evenly mt-4 ms-2">
        <form action="#" method="GET" className=" inline-block">
          <label htmlFor="topbar-search" className="sr-only">
            Search
          </label>
          <div className="mt-1 relative lg:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              name="email"
              id="topbar-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full pl-10 p-2.5"
              placeholder="Search"
              value={searchKey}
              onChange={(e) => setSearchKey((pre) => e.target.value)}
            />
          </div>
        </form>
        <Link
          className="p-3 bg-green-400 rounded text-base text-white font-medium flex items-center"
          href="/storemanage/production/addnew"
        >
          <svg
            className="w-[20px] h-[20px] text-white inline-block me-1 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
          Thêm sản phẩm
        </Link>
      </div>
      <h2 className="font-bold text-lg my-3 text-slate-600 ms-2">
        Danh sách sản phẩm :{" "}
      </h2>
      <ul id="list-product" className="flex flex-row flex-wrap">
        {Array.isArray(lstProduct) &&
          lstProduct.length != 0 &&
          lstProduct?.map((item, index) => {
            return (
              <li
                key={item.PRODUCT_ID}
                className="w-2/4 md:w-1/3 lg:w-1/4 flex ps-1"
              >
                <div className="flex flex-col w-11/12 bg-white border p-2 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700  my-2 ">
                  <div className="min-h-[300px] flex items-center">
                    {" "}
                    <Link
                      href={
                        "/storemanage/production?productId=" + item.PRODUCT_ID
                      }
                    >
                      <ImageFallback
                        src={item.PRODUCT_LOGO_IMAGE}
                        fallbackSrc={undefined}
                        className="rounded-t-lg w-fit h-auto "
                        alt=" "
                      />
                    </Link>
                  </div>
                  <div className="p-5 h-max flex-1">
                    <Link
                      href={
                        "/storemanage/production?productId=" + item.PRODUCT_ID
                      }
                    >
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-base text-center">
                        {item.PRODUCT_NAME}
                      </h5>
                    </Link>
                  </div>
                  <div className="p-2 flex flex-row justify-evenly">
                    <Link
                      className=" rounded  bg-[#32cd32]  p-3"
                      href={
                        "/storemanage/production?productId=" + item.PRODUCT_ID
                      }
                    >
                      <i className="fa-regular fa-pen-to-square text-white  text-[30px]"></i>
                    </Link>
                    <button
                      className=" rounded  bg-red-600 p-3"
                      onClick={() => {
                        setDeleteId(item.PRODUCT_ID);
                        setShowModal(true);
                      }}
                    >
                      <svg
                        className="w-[30px] h-[30px] text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
