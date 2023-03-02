import { combineReducers } from "redux";
import { appReducer } from "./appReducer/appReducer";
import { categoriesReducer } from "./categoriesReducer/categoriesReducer";
import { userReducer } from "./userReducer/userReducer";


export const rootReducer = combineReducers({
    app: appReducer,
    user: userReducer,
    categories: categoriesReducer
});