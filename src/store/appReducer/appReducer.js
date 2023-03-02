import { HIDE_APP_LOADER, HIDE_LOADER, SHOW_APP_LOADER, SHOW_LOADER } from "./types"


const initialState = {
    isLoading: true,
    isAppLoading: false
}

export const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case SHOW_LOADER:
            return { ...state, isLoading: true };
        case HIDE_LOADER:
            return { ...state, isLoading: false };
        case SHOW_APP_LOADER:
            return { ...state, isAppLoading: true };
        case HIDE_APP_LOADER:
            return { ...state, isAppLoading: false };
        default:
            return state;
    }
}