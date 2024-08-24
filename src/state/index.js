import { createSlice } from '@reduxjs/toolkit';
import authService from '@/services/authService';

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
      authService.logout();
    },
    setGems: (state, action) => {
      state.gems = action.payload;
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
    updateGemComment(state, action) {
      const foundedGem = state.gems.find(
        (gem) => gem._id === action.payload.gemId,
      );
      const updatedComments = foundedGem.comments.map((comment) =>
        comment._id === action.payload._id ? action.payload : comment,
      );
      foundedGem.comments = updatedComments;
      const updatedGems = state.gems.map((gem) =>
        gem._id === action.payload.gemId ? foundedGem : gem,
      );
      state.gems = updatedGems;
    },
    deleteComment(state, action) {
      const updatedGem = {
        ...state.gems.find((gem) => gem._id === action.payload.gemId),
      };
      const updatedComments = updatedGem.comments.filter(
        (comment) => comment._id !== action.payload.commentId,
      );
      updatedGem.comments = updatedComments;
      const updatedGems = state.gems.map((gem) =>
        gem._id === action.payload.gemId ? updatedGem : gem,
      );
      state.gems = updatedGems;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setGems,
  setGem,
  updateGem,
  deleteGem,
  updateGemComment,
  deleteComment,
} = authSlice.actions;
export default authSlice.reducer;
