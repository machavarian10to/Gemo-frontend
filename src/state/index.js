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
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error('User friends not exist :(');
      }
    },
    setGems: (state, action) => {
      state.gems = action.payload.gems;
    },
    setGem: (state, action) => {
      const updatedGems = state.gems.map((gem) => {
        if (gem.id === action.payload.gem._id) {
          return action.payload.gem;
        }
        return gem;
      });
      state.gems = updatedGems;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setGems, setGem } =
  authSlice.actions;
export default authSlice.reducer;
