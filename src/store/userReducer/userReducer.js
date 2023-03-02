import { DELETE_USER, FETCH_USER } from "./types";

const initialState = {isAuth: false};

export const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_USER:
            return { user: action.payload, isAuth: true };
        case DELETE_USER:
            return { isAuth: false };
        default:
            return state;
    }
}