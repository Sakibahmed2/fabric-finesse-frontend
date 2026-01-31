import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type TCartItem = {
  _id: string;
  title: string;
  price: number;
  salePrice?: number | null;
  color?: string;
  size?: string;
  image: string;
  quantity: number;
};

type TInitialState = {
  carts: TCartItem[];
  appliedCoupon: {
    code: string;
    discount: number;
  } | null;
};

const initialState: TInitialState = {
  carts: [],
  appliedCoupon: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<
        Omit<TCartItem, "quantity"> & { quantity?: number }
      >,
    ) => {
      const { _id, color, size, quantity = 1 } = action.payload;

      // Check if item with same id, color, and size exists
      const existingItem = state.carts.find(
        (item) =>
          item._id === _id && item.color === color && item.size === size,
      );

      if (existingItem) {
        // Update quantity if item exists
        existingItem.quantity += quantity;
      } else {
        // Add new item with quantity
        state.carts.push({ ...action.payload, quantity });
      }
    },

    updateQuantity: (
      state,
      action: PayloadAction<{
        _id: string;
        color?: string;
        size?: string;
        quantity: number;
      }>,
    ) => {
      const { _id, color, size, quantity } = action.payload;
      const item = state.carts.find(
        (item) =>
          item._id === _id && item.color === color && item.size === size,
      );

      if (item) {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          state.carts = state.carts.filter(
            (cartItem) =>
              !(
                cartItem._id === _id &&
                cartItem.color === color &&
                cartItem.size === size
              ),
          );
        } else {
          item.quantity = quantity;
        }
      }
    },

    incrementQuantity: (
      state,
      action: PayloadAction<{ _id: string; color?: string; size?: string }>,
    ) => {
      const { _id, color, size } = action.payload;
      const item = state.carts.find(
        (item) =>
          item._id === _id && item.color === color && item.size === size,
      );
      if (item) {
        item.quantity += 1;
      }
    },

    decrementQuantity: (
      state,
      action: PayloadAction<{ _id: string; color?: string; size?: string }>,
    ) => {
      const { _id, color, size } = action.payload;
      const item = state.carts.find(
        (item) =>
          item._id === _id && item.color === color && item.size === size,
      );

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          // Remove item if quantity would become 0
          state.carts = state.carts.filter(
            (cartItem) =>
              !(
                cartItem._id === _id &&
                cartItem.color === color &&
                cartItem.size === size
              ),
          );
        }
      }
    },

    removeFromCart: (
      state,
      action: PayloadAction<{ _id: string; color?: string; size?: string }>,
    ) => {
      const { _id, color, size } = action.payload;
      state.carts = state.carts.filter(
        (item) =>
          !(item._id === _id && item.color === color && item.size === size),
      );
    },

    clearCart: (state) => {
      state.carts = [];
      state.appliedCoupon = null;
    },

    // Keep deleteCart as alias for clearCart for backward compatibility
    deleteCart: (state) => {
      state.carts = [];
      state.appliedCoupon = null;
    },

    applyCoupon: (
      state,
      action: PayloadAction<{ code: string; discount: number }>,
    ) => {
      state.appliedCoupon = action.payload;
    },

    removeCoupon: (state) => {
      state.appliedCoupon = null;
    },
  },
});

// Selectors
export const selectCartItems = (state: { cart: TInitialState }) =>
  state.cart.carts;
export const selectCartTotal = (state: { cart: TInitialState }) =>
  state.cart.carts.reduce((total, item) => {
    const price = item.salePrice ?? item.price;
    return total + price * item.quantity;
  }, 0);
export const selectCartItemsCount = (state: { cart: TInitialState }) =>
  state.cart.carts.reduce((count, item) => count + item.quantity, 0);

// Action creators are generated for each case reducer function
export const {
  addToCart,
  updateQuantity,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
  deleteCart,
  applyCoupon,
  removeCoupon,
} = cartSlice.actions;

export default cartSlice.reducer;
