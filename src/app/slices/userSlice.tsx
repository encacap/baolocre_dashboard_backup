import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserDataType } from '../types/user';

const initialState: UserDataType = {
  id: '',
  email: '',
  firstName: '',
  lastName: '',
  roles: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserDataType>) => {
      state = Object.assign(state, action.payload);
    },
  },
});

const { actions, reducer: userReducer } = userSlice;

export const { setUser } = actions;

export default userReducer;
