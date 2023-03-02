import $host from ".";

export async function fetchDashboardProducts() {
    try {
        const { data } = await $host.get("dashboard/product-inventors/");
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function fetchProductById(productId) {
    try {
        const { data } = await $host.get(`dashboard/product-inventors/${productId}/`);
        return data;
    } catch(error) {
        console.error(error);
    }
}

export async function fetchCategories() {
    try {
        const { data } = await $host.get("dashboard/categories/");
        return data;
    } catch(error) {
        console.error(error);
    }
}