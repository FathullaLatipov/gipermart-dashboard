import { HIDE_APP_LOADER, HIDE_LOADER, SHOW_APP_LOADER, SHOW_LOADER } from "./types"

export const hideLoader = () => {
    return {
        type: HIDE_LOADER,
    }
}

export const showLoader = () => {
    return {
        type: SHOW_LOADER
    }
}

export const showAppLoader = () => {
    return {
        type: SHOW_APP_LOADER
    }
}

export const hideAppLoader = () => {
    return {
        type: HIDE_APP_LOADER
    }
}