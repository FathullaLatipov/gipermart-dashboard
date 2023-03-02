import jwtDecode from "jwt-decode";
import $host from ".";
import { store } from "..";
import { getCookie, setAccessToken } from "../helper/tokenHelper";
import { createUser } from "../store/userReducer/actions";

export async function userLogin(phone_number, password) {
    try {
        const user = await $host.post("user/login/", {
           phone_number,
           password 
        });
        return user.data;
    } catch(error) {
        console.error(error);
    }
}

export async function fetchUserById(userId) {
    try {
        const user = await $host.get(`user/api/v1/profile/${userId}/`);
        return user.data;
    } catch(error) {
        console.error(error);
    }
}

export async function checkAuth() {
    try {
        const refreshToken = getCookie("refreshToken");
        const user = await $host.post("user/api/v1/token/refresh/", { refresh: refreshToken });
        const userDecoded = jwtDecode(user.data?.access);
        setAccessToken(user.data?.access);
        const [ userData ] = await fetchUserById(userDecoded.user_id);
        store.dispatch(createUser(userData));
    } catch(error) {
        // deleteUser
        console.log(error);
    }
}