"use client";

import { memo, useEffect, useState } from "react";

function ProductVariationPrice({
  variation,
}: {
  variation: [
    {
      VARIATION_ID: number;
      PRICE: number;
      UNIT: number;
      AMOUNT: number;
    }
  ];
}) {
  const [amount, setAmount] = useState("1");
  let priceUnit = variation;
  const [variationState, setVariationState] = useState(priceUnit[0]);
  const [totalPrice, setTotalPrice] = useState(variationState.PRICE);
  useEffect(() => {
    document
      .getElementById("horizontal-list-radio-license0")
      ?.setAttribute("checked", "checked");
  }, []);
  const decrement = (e: any) => {
    let value = Number(amount);
    if (value - 1 >= 1 && !Number.isNaN(value)) {
      setAmount((value - 1).toString());
      setTotalPrice(Number(value - 1) * variationState.PRICE);
    }
  };
  const increment = (e: any) => {
    let value = Number(amount);
    if (value + 1 <= variationState.AMOUNT && !Number.isNaN(value)) {
      setAmount((value + 1).toString());
      setTotalPrice(Number(value + 1) * variationState.PRICE);
    }
  };
  const checkValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = Number(e.target.value);
    if (val <= variationState.AMOUNT && val >= 1 && !Number.isNaN(val)) {
      setAmount(val.toString());
      setTotalPrice(val * variationState.PRICE);
    } else if (e.target.value == "") {
      setAmount("");
    }
  };
  return (
    <>
      <h5 className="py-2 font-medium text-base">Loai hang</h5>
      <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white flex flex-wrap">
        {/* img         */}
        {variation.map((item, index) => {
          return (
            <li
              className="w-full md:w-1/2 lg:w-1/3 mb-2"
              key={item.VARIATION_ID}
            >
              <div
                className="flex items-center ps-1 border rounded mx-1 md:my-0 my-2 "
                onClick={() => {
                  setVariationState((pre) => item);
                  setTotalPrice((pre) => item.PRICE * Number(amount));
                }}
              >
                <input
                  id={"horizontal-list-radio-license" + index}
                  type="radio"
                  value={item.VARIATION_ID}
                  name="list-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-900"
                  style={{ boxShadow: "none" }}
                />

                <label
                  htmlFor={"horizontal-list-radio-license" + index}
                  className="w-full py-3 ms-1 me-1 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  {item.UNIT}
                </label>
              </div>
            </li>
          );
        })}
      </ul>
      <h4 className="font-semibold">
        Gia: {/* img         */}
        <span className="font-bold text-red-700 text-lg">{totalPrice}</span>
      </h4>
      <div className=" flex flex-wrap justify-evenly mt-2">
        <div className="flex flex-row h-full w-full max-h-10 md:w-3/12 rounded-2xl relative bg-transparent mb-2 md:mb-0">
          <button
            data-action="decrement"
            onClick={decrement}
            className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
          >
            <span className="m-auto text-2xl font-thin">−</span>
          </button>
          {/* img         */}
          <input
            type="number"
            className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  border-none"
            value={amount}
            onChange={(e) => {
              checkValue(e);
            }}
          ></input>
          <button
            data-action="increment"
            onClick={increment}
            className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
          >
            <span className="m-auto text-2xl font-thin">+</span>
          </button>
        </div>
        <button
          type="button"
          className="w-6/12 md:w-4/12 p-2  font-medium text-sm text-white bg-orange-400 me-1 rounded-md"
        >
          Them vao gio hang
        </button>
        <button
          type="button"
          className="w-5/12 md:w-4/12 p-2 text-sm font-medium text-white bg-red-600 rounded-md"
        >
          Mua ngay
        </button>
      </div>
    </>
  );
}
export default memo(ProductVariationPrice);
