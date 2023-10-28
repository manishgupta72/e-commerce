import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkUser, createUser } from './authAPi';

const initialState = {
  loggedInUser: null,
  status: 'idle',
  error:null
};

export const createUserAsync = createAsyncThunk(
    'user/createUser',
    async (userData) => {
      const response = await createUser(userData);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );
  export const checkUserAsync = createAsyncThunk(
    'user/checkUser',
    async (loginInfo) => {
      const response = await checkUser(loginInfo);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );

export const authSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: { },
 
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser= action.payload;
        
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser= action.payload;
        
      }).addCase(checkUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error= action.error;
        
      })
  },
});



export const SelectLoggedInUser = (state) => state.auth.loggedInUser;
export const SelectError = (state) => state.auth.error;



export default authSlice.reducer;