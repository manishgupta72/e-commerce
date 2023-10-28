import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllProductByFilter,
  fetchAllProductById,
  fetchBrands,
  fetchCategory,
} from "./productApi";

const initialState = {
  products: [],
  brands: [],
  category: [],
  status: "idle",
  selectedProduct: null,
  totalItems: 0,
};

export const fetchAllProductAsync = createAsyncThunk(
  "product/fetchAllProductById",
  async (id) => {
    const response = await fetchAllProductById(id);

    return response.data;
  }
);
export const fetchAllProductByIdAsync = createAsyncThunk(
  "product/fetchAllProduct",
  async (id) => {
    const response = await fetchAllProductById(id);

    return response.data;
  }
);
export const fetchCategoryAsync = createAsyncThunk(
  "product/fetchCategory",
  async () => {
    const response = await fetchCategory();

    return response.data;
  }
);
export const fetchBrandsAsync = createAsyncThunk(
  "product/fetchBrands",
  async () => {
    const response = await fetchBrands();

    return response.data;
  }
);

export const fetchAllProductByFilterAsync = createAsyncThunk(
  "product/fetchAllProductByFilter",
  async ({ filter, sort, pagination }) => {
    const response = await fetchAllProductByFilter(filter, sort, pagination);
    console.log("in slice", sort);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchAllProductByFilterAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductByFilterAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })
      .addCase(fetchCategoryAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoryAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.category = action.payload;
      })
      .addCase(fetchAllProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
      });
  },
});

export const { increment } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectAllCategory = (state) => state.product.category;
export const selectAllBrands = (state) => state.product.brands;
export const selectProductById = (state) => state.product.selectedProduct;
export const selectTotalItems = (state) => state.product.totalItems;

export default productSlice.reducer;
