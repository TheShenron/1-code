import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from '@/features/login/slice';
import usersReducer from '@/features/dashboard/slice';

const rootReducer = combineReducers({
  login: loginReducer,
  users: usersReducer
});

export default rootReducer;
