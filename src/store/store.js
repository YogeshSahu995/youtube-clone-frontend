import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import authReducer from './authSlice'

export const store = configureStore({reducer: authReducer}, applyMiddleware(thunk))