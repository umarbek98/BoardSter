import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productData: [],
  userInfo: null,
};

export const shopsterSlice = createSlice({
  name: "shopster",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.productData.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.productData.push(action.payload);
      }
    },
    deleteFromCart: (state, action) => {
      state.productData = state.productData.filter(
        (item) => item._id !== action.payload
      );
    },
    resetCart: (state) => {
      state.productData = [];
    },
    incrementQuantity: (state, action) => {
      const item = state.productData.find((item) => {
        // console.log(JSON.stringify(item, null, 2));
        // console.log(action.payload);

        return item._id === action.payload;
      });
      // console.log(JSON.stringify(state, null, 2));

      if (item) {
        item.quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.productData.find((item) => {
        return item._id === action.payload;
      });

      // console.log(item);
      // console.log(JSON.stringify(state, null, 2));
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
  },
});

export const {
  addToCart,
  deleteFromCart,
  resetCart,
  incrementQuantity,
  decrementQuantity,
} = shopsterSlice.actions;
export default shopsterSlice.reducer;
