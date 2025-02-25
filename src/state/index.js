import { createSlice } from '@reduxjs/toolkit';
import authService from '@/services/authService';

const initialState = {
  mode: 'light',
  language: 'en',
  user: null,
  resetToken: null,
  gems: [],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
    },
    setLogout: (state) => {
      state.user = null;
      state.gems = [];
      authService.logout();
    },
    setResetToken: (state, action) => {
      state.resetToken = action.payload;
    },
    setAllGems: (state, action) => {
      const newGems = action.payload.filter(
        (newGem) =>
          !state.gems.some((existingGem) => existingGem._id === newGem._id),
      );
      state.gems = [...state.gems, ...newGems];
    },
    setGem: (state, action) => {
      const updatedGems = [action.payload, ...state.gems];
      state.gems = updatedGems;
    },
    updateGem: (state, action) => {
      const updatedGems = state.gems.map((gem) =>
        gem._id === action.payload._id ? action.payload : gem,
      );
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

export const {
  setMode,
  setLanguage,
  setLogin,
  setLogout,
  setResetToken,
  setAllGems,
  setGem,
  updateGem,
  deleteGem,
} = authSlice.actions;
export default authSlice.reducer;
