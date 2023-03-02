import { store } from "..";
import { deleteUser } from "../store/userReducer/actions";

export function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

export function hasAccessToken() {
  return !!window.localStorage.getItem("accessToken");
}

export function setRefreshToken(refreshToken) {
  return setCookie("refreshToken", refreshToken, 7);
}

export function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function setAccessToken(token) {
  return localStorage.setItem("accessToken", token);
}

export function clearRefreshToken() {
  return setCookie("refreshToken", "", 0);
}

export function setTokens(token) {
  setAccessToken(token.access);
  setRefreshToken(token.refresh);
}

export function logout() {
  window.localStorage.removeItem("accessToken");
  clearRefreshToken();
  store.dispatch(deleteUser());
}