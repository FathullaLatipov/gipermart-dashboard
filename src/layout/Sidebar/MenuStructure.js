import homeIcon from "../../assets/images/menu-home-icon.svg";
import catalogIcon from "../../assets/images/menu-catalog-icon.svg";
import ordersIcon from "../../assets/images/menu-orders-icon.svg";
import customerIcon from "../../assets/images/menu-customers-icon.svg";
import discountsIcon from "../../assets/images/menu-discounts-icon.svg";

const MenuStructure = () => {

    return [
        {
            ariaLabel: "home",
            iconSrc: homeIcon,
            label: "Главная",
            id: "home",
            url: "/"
        },
        {
            ariaLabel: "catolog",
            iconSrc: catalogIcon,
            label: "Каталог",
            id: "catalog",
            children: [

                {
                    ariaLabel: "categories",
                    label: "Категории",
                    url: "/categories",
                    id: "categories"
                },
                {
                    ariaLabel: "Слайдеры",
                    label: "Слайдеры",
                    url: "/sliders",
                    id: "sliders"
                },
                {
                    ariaLabel: "Бренды",
                    label: "Бренды",
                    url: "/brands",
                    id: "brands"
                },
                // {
                //     ariaLabel: "stocks",
                //     label: "stocks",
                //     url: "/stocks",
                //     id: "stocks"
                // },

            ]
        },
        {
            ariaLabel: "orders",
            label: "Товары",
            id: "orders",
            iconSrc: ordersIcon,
            children: [
                {
                    ariaLabel: "products",
                    label: "Товары",
                    id: "products",
                    url: "/products",
                },
                {
                    ariaLabel: "orders",
                    label: "Атрибут продукта",
                    id: "orders",
                    url: "/product_attribute",
                },
                {
                    ariaLabel: "Атрибут продукта 2",
                    label: "Атрибут продукта 2",
                    id: "Атрибут продукта 2",
                    url: "/product-attribute-values",
                },
                {
                    ariaLabel: "Атрибут продуктов",
                    label: "Атрибут продуктов",
                    id: "product-inventors",
                    url: "/product-inventors"
                },











                {
                    ariaLabel: "Медиа",
                    label: "Медиа",
                    id: "product-media",
                    url: "/product-media"
                },
                {
                    ariaLabel: "Тип атрибутов продукта",
                    label: "Тип атрибутов продукта",
                    id: "product-type-attribute",
                    url: "/product-type-attribute"
                },
                {
                    ariaLabel: "Тип продуктов",
                    label: "Тип продуктов",
                    id: "product-type",
                    url: "/product-type"
                },
                // {
                //     ariaLabel: "product-stocks",
                //     label: "product-stocks",
                //     id: "product-stocks",
                //     url: "/product-stocks"
                // },

            ]
        },
        {
            ariaLabel: "users",
            label: "Пользователи",
            id: "users",
            iconSrc: customerIcon,
            children: [
                {
                    ariaLabel: "Пользователи",
                    label: "Пользователи",
                    id: "Пользователи",
                    url: "/users",
                },
                {
                    ariaLabel: "Заказы",
                    label: "Заказы",
                    id: "Заказы",
                    url: "/checkout",
                },
                {
                    ariaLabel: "Номера",
                    label: "Номера",
                    id: "Номера",
                    url: "/phone-site-settings",
                },
                {
                    ariaLabel: "Ссылки",
                    label: "Ссылки",
                    id: "Ссылки",
                    url: "/site-settings",
                },
            ]
        },
        {
            ariaLabel: "Акции",
            label: "Акции",
            id: "aksiya",
            url: "/stocks",
            iconSrc: discountsIcon
        }
    ]
}

export default MenuStructure()
    ;