import { createWrapper } from "next-redux-wrapper";
import { store } from "./store";

const makeStore = () => store;

// Define wrapper options
const wrapperOptions = {
  debug: true, // Optionally enable debug mode
  makeStore,
};

export default createWrapper(wrapperOptions);
