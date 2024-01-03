"use client";
import { addProductToCart, deleteProductFromCart } from "@/redux/feature/cart";
import {
  useGetInfoProductInCartQuery,
  variationCartInfo,
  variationInfo,
} from "@/redux/services/cartApi";
import { AppDispatch, AppUseSelector } from "@/redux/store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { adminRole } from "../storemanage/login/roles.enum";

export default function Cart() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: session } = useSession();
  const cartData = AppUseSelector((state) => state.CartReducer.value.cart);
  const [isFetching, setIsFetching] = useState<Boolean>(true);
  const [isError, setIsError] = useState<Boolean>(false);
  const [data, setData] = useState<variationCartInfo[]>([]);
  const [isHandlingCheckOut, setIsHandlingCheckOut] = useState<Boolean>(false);
  const router = useRouter();
  const handleDeleteProductInCart = (VARIATION_ID: Number) => {
    setData(data?.filter((item) => item.VARIATION_ID != VARIATION_ID));
    dispatch(deleteProductFromCart(VARIATION_ID));
  };
  const fetchData = async () => {
    if (cartData.length == 0) {
      setIsError(false);
      setIsFetching(false);
      return;
    }
    let res: Response = await fetch(
      "http://localhost:8081/product/productCartInfo",
      {
        method: "POST",
        body: JSON.stringify(cartData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setIsFetching(false);
    if (res.ok) {
      let tmp: variationInfo[] = await res.json();
      tmp.length != 0 &&
        tmp.reduce((pre: number, cur) => {
          return pre + cur.AMOUNT * cur.PRICE;
        }, 0);
      setData(
        tmp.map((item) => {
          return {
            ...item,
            MAX_AMOUNT: item.AMOUNT,
            AMOUNT:
              cartData.find((variation) => variation.vid == item.VARIATION_ID)
                ?.amount || 0,
          };
        })
      );
    } else {
      setIsError(true);
    }
  };
  const incrementVariationInCart = (vid: number) => {
    let index = data.findIndex((item) => item.VARIATION_ID == vid);
    if (index == -1) return;
    let tmp = [...data];
    dispatch(addProductToCart({ vid: vid, amount: tmp[index].AMOUNT + 1 }));

    if (tmp[index].AMOUNT + 1 <= tmp[index].MAX_AMOUNT) tmp[index].AMOUNT++;
    setData(tmp);
  };
  const decrementVariationInCart = (vid: number) => {
    let index = data.findIndex((item) => item.VARIATION_ID == vid);
    if (index == -1) return;
    let tmp = [...data];
    dispatch(addProductToCart({ vid: vid, amount: tmp[index].AMOUNT - 1 }));
    if (tmp[index].AMOUNT - 1 > 0) tmp[index].AMOUNT--;
    setData(tmp);
  };
  const handleChangeAmountVariationInCart = (val: string, vid: number) => {
    let index = data.findIndex((item) => item.VARIATION_ID == vid);
    if (index == -1) return;
    let tmp = [...data];
    if (val.length == 0) tmp[index].AMOUNT = 0;
    else if (!isNaN(Number(val))) {
      let newAmount = Number(val);
      if (newAmount > 0 && newAmount <= tmp[index].MAX_AMOUNT)
        tmp[index].AMOUNT = parseInt(val, 10);
    }
    setData(tmp);
  };

  const handleCheckout = () => {
    if (
      session?.user?.value.ROLE == adminRole ||
      !session ||
      !session.user?.access_token
    ) {
      router.push("/login");
      toast.warning("Vui lòng đăng nhập !", { autoClose: 800 });
    } else {
      setIsHandlingCheckOut(true);
    }
  };
  useEffect(() => {
    fetchData();
  }, [cartData]);
  return (
    <>
      {(isHandlingCheckOut && <div> Check out</div>) ||
        (isFetching ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Something wrong ...</p>
        ) : data && data.length != 0 ? (
          <div className=" bg-gray-100 pt-20">
            <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
            <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
              <div className="rounded-lg md:w-2/3">
                {data.map((item) => {
                  return (
                    <div
                      key={item.VARIATION_ID}
                      className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                    >
                      <a
                        href={
                          "/production?productId=" + item.product.PRODUCT_ID
                        }
                      >
                        <img
                          src={item.product.PRODUCT_LOGO_IMAGE}
                          alt="product-image"
                          className="w-full rounded-lg sm:w-40"
                        />
                      </a>
                      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                        <div className="mt-5 sm:mt-0">
                          <h2 className="text-lg font-bold text-gray-900">
                            {item.product.PRODUCT_NAME}
                          </h2>
                          <p className="mt-1 text-xs text-gray-700">
                            {item.UNIT}
                          </p>
                        </div>
                        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                          <div className="flex items-center border-gray-100">
                            <span
                              className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                              onClick={() =>
                                decrementVariationInCart(item.VARIATION_ID)
                              }
                            >
                              {" "}
                              -{" "}
                            </span>
                            <input
                              className="h-8 w-10 border bg-white text-center text-xs outline-none p-0 "
                              type="number"
                              value={item.AMOUNT == 0 ? "" : item.AMOUNT}
                              onKeyDown={(event) => {
                                if (event.keyCode === 69) {
                                  event.preventDefault();
                                }
                              }}
                              onChange={(e) => {
                                handleChangeAmountVariationInCart(
                                  e.target.value,
                                  item.VARIATION_ID
                                );
                              }}
                            />
                            <span
                              className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                              onClick={() =>
                                incrementVariationInCart(item.VARIATION_ID)
                              }
                            >
                              {" "}
                              +{" "}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <p className="text-sm">{item.PRICE}</p>
                            <button
                              type="button"
                              onClick={() =>
                                handleDeleteProductInCart(item.VARIATION_ID)
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Sub total */}
              <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                <hr className="my-4" />
                <div className="flex justify-between">
                  <p className="text-lg font-bold">Total</p>
                  <div className="">
                    <p className="mb-1 text-lg font-bold">
                      {data.reduce((pre: number, cur) => {
                        return pre + cur.AMOUNT * cur.PRICE;
                      }, 0)}
                    </p>
                  </div>
                </div>
                <button
                  className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
                  onClick={handleCheckout}
                >
                  Check out
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center">Không có sản phẩm trong giỏ hàng</p>
        ))}
    </>
  );
}
