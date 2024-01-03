import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { cartItem } from "../feature/cart";

export type variationInfo = {
  VARIATION_ID: number;
  PRICE: number;
  UNIT: number;
  AMOUNT: number;
  product: {
    PRODUCT_LOGO_IMAGE: string;
    PRODUCT_NAME: string;
    PRODUCT_ID: number;
  };
};
export type variationCartInfo = {
  VARIATION_ID: number;
  PRICE: number;
  UNIT: number;
  MAX_AMOUNT: number;
  AMOUNT: number;
  product: {
    PRODUCT_LOGO_IMAGE: string;
    PRODUCT_NAME: string;
    PRODUCT_ID: number;
  };
};
export const cartApi = createApi({
  reducerPath: "userApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8081/",
  }),
  endpoints: (builder) => ({
    getInfoProductInCart: builder.query<variationInfo[], cartItem[]>({
      query: (cart) => ({
        url: "product/productCartInfo",
        method: "POST",
        body: JSON.stringify(cart),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useGetInfoProductInCartQuery } = cartApi;
