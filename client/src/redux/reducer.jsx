import { combineReducers } from "@reduxjs/toolkit";

import userSlice from './userSlice'
import themeSlice from './theme'
import postSlice from './postSlice'


const roootReducer= combineReducers({
    user:userSlice,
    theme:themeSlice,
    posts: postSlice
});

export {roootReducer};