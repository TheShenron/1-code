import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Role } from '@/app/types/roles';

interface UserDetails {
    id: string;
    name: string;
    email: string;
    subscriptionStatus: Boolean;
    role: Role
}

interface GlobalState {
    userDetails: UserDetails | null;
}

const initialState: GlobalState = {
    userDetails: null,
};

const coreSlice = createSlice({
    name: 'core',
    initialState,
    reducers: {
        setUserDetails: (state, action: PayloadAction<UserDetails>) => {
            state.userDetails = action.payload;
        },
    },
});

export const {
    setUserDetails
} = coreSlice.actions;

export default coreSlice.reducer;
