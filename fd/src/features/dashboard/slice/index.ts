import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../schema/users.schema';

interface UsersState {
    users: User[] | null;
    selectedUser: User | null;
}

const initialState: UsersState = {
    users: null,
    selectedUser: null,
};

const usersSlice = createSlice({
    name: 'all_users',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        },
        setSelectedUser: (state, action: PayloadAction<User>) => {
            state.selectedUser = action.payload;
        },
        clearSelectedUser: (state) => {
            state.selectedUser = null;
        }
    },
});

export const { setUsers, setSelectedUser, clearSelectedUser } = usersSlice.actions;

export default usersSlice.reducer;
