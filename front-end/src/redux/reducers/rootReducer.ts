import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import postReducer from './postSlice';

const reducers = combineReducers({
    auth: authReducer,
    post: postReducer,
});

export default reducers;