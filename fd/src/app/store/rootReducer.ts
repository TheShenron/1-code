import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from '@/features/login/slice';

const rootReducer = combineReducers({
    login: loginReducer,
});

export default rootReducer;
