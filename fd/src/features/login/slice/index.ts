import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Role } from '@/app/types/roles';

interface UserDetails {
    _id: string;
    name: string;
    email: string;
    role: Role,
    token: string
}

interface GlobalState {
    userDetails: UserDetails | null;
    isLogined: Boolean,
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
            console.log()
            state.userDetails = action.payload;
            state.token = action.payload.token
            state.isLogined = true
        },
    },
});

export const {
    setUserDetails
} = loginSlice.actions;

export default loginSlice.reducer;
