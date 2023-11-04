import { configureStore } from "@reduxjs/toolkit";
import {roootReducer} from './reducer';


const store = configureStore({
    reducer:roootReducer,
});

const {dispatch} = store;

export {store , dispatch};