import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type initialState = {
  value: CartState;
};
type CartState = {
  cart: cartItem[];
  amount: number;
};
export type cartItem = {
  vid: Number;
  amount: number;
};
type cartSetAllPayload = {
  cart: cartItem[];
};
const initialState: initialState = {
  value: {
    cart: [],
    amount: 0,
  },
};
export const cart = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    refreshCart: (state) => {
      let cart = localStorage.getItem("cart");
      let cartArr: cartItem[] = cart ? JSON.parse(cart) : [];
      return {
        ...state,
        value: {
          ...state.value,
          cart: cartArr,
          amount: cartArr.length,
        },
      };
    },
    addProductToCart: (state, action: PayloadAction<cartItem>) => {
      // You can directly access and modify the state object
      // Immer will create a new state based on your changes
      const { cart } = state.value;
      const { payload } = action;
      // Find the index of the item with the same vid as the payload
      const index = cart.findIndex((item) => item.vid == payload.vid);
      if (index > -1) {
        // If the item exists, update its amount
        cart[index].amount = payload.amount;
      } else {
        // If the item does not exist, add it to the cart
        cart.push(payload);
      }
      // Update the amount property with the cart length
      state.value.amount = cart.length;
      // Save the cart to the local storage
      localStorage.setItem("cart", JSON.stringify(cart));
      // No need to return anything, Immer will handle it for you
    },
    deleteProductFromCart: (state, action: PayloadAction<Number>) => {
      const { cart } = state.value;
      const { payload } = action;
      const index = cart.findIndex((item) => item.vid == payload);
      if (index > -1) {
        // If the item exists, update its amount
        state.value.amount--;
        let tmpCart = cart.filter((item) => item.vid != action.payload);
        state.value.cart = tmpCart;
        localStorage.setItem("cart", JSON.stringify(tmpCart));
      }
    },
  },
});
export const { addProductToCart, deleteProductFromCart, refreshCart } =
  cart.actions;
export default cart.reducer;
