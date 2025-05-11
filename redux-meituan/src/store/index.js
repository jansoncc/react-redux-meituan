import { configureStore } from "@reduxjs/toolkit";
import foodsReducer from "./modules/takeaway";
const store = configureStore({
  reducer: {
    foods: foodsReducer,
  },
});
export default store;
