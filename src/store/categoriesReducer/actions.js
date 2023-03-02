import { FETCH_CATEGORIES } from "./types";


export function fetchCategoriesAction(data) {
    return {
        type: FETCH_CATEGORIES,
        payload: data
    }
}