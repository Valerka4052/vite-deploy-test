import { configureStore } from "@reduxjs/toolkit";
import{postSlise} from './slices/post'
import { authSlise } from "./slices/auth";
const store = configureStore({
    reducer: {
        posts: postSlise.reducer,
        auth:authSlise.reducer
    }
});
export default store;