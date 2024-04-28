import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type TCart = {
  _id: string | undefined;
  title: string;
  price: number;
  salePrice?: number | null;
};

type TInitialState = {
  carts: TCart[];
};

const initialState: TInitialState = {
  carts: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.carts.push({ ...action.payload });
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
