import { fetchUserById } from "../../http/userApi"
import { hideLoader } from "../appReducer/actions";
import { DELETE_USER, FETCH_USER } from "./types";

export const createUser = (data) => {
    return { 
        type: FETCH_USER, 
        payload: data 
    };
}

export const deleteUser = () => {
    return {
        type: DELETE_USER
    }
}