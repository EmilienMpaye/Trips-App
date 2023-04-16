import { createSlice } from '@reduxjs/toolkit';

// Define the initial state using that type
const initialState = {
  user: null,
  userLoading: false
};

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state, action) => {
      // Ensure the payload is serializable (e.g. a plain JavaScript object)
      const { payload } = action;
      if (typeof payload === 'object' && payload !== null) {
        // Update the user state with the serialized payload
        state.user = payload;
      }
    },
    setUserLoading: (state, action) => {
      // Update the userLoading state with the payload
      state.userLoading = action.payload;
    }
  }
});

export const { setUser, setUserLoading } = userSlice.actions;

export default userSlice.reducer;
