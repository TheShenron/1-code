import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Role } from '@/app/types/roles';

interface UserDetails {
    token: string,
    user: {
        name: string;
        email: string;
        _id: string;
        role: Role,
    }
}

interface GlobalState {
    userDetails: UserDetails | null;
    isLogined: boolean,
    token: string | null
}

const initialState: GlobalState = {
  userDetails: null,
  isLogined: false,
  token: null
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<UserDetails>) => {
      state.userDetails = action.payload;
      state.token = action.payload.token;
      state.isLogined = true;
    },
  },
});

export const {
  setUserDetails
} = loginSlice.actions;

export default loginSlice.reducer;
