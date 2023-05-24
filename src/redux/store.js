import { configureStore } from "@reduxjs/toolkit";
import{postSlise} from './slices/post'
const store = configureStore({
    reducer: {
        posts: postSlise.reducer
    }
});
export default store