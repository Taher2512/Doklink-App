/*eslint-disable*/
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  email: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    logout: state => {
      state.email = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setEmail, logout} = userSlice.actions;

export default userSlice.reducer;
