import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'light',
  user: null,
  token: null,
  gems: [],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setGems: (state, action) => {
      state.gems = action.payload;
    },
    setGem: (state, action) => {
      const updatedGems = [action.payload, ...state.gems];
      state.gems = updatedGems;
    },
    deleteGem(state, action) {
      const updatedGems = state.gems.filter(
        (gem) => gem._id !== action.payload,
      );
      state.gems = updatedGems;
    },
  },
});

export const { setMode, setLogin, setLogout, setGems, setGem, deleteGem } =
  authSlice.actions;
export default authSlice.reducer;
