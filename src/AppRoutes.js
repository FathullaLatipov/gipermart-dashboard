import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Auth from "./Auth";
import LoginPage from "./Auth/LoginPage/LoginPage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import AppSidebar from "./layout/Sidebar";
import BrandsPage from "./pages/Brands/BrandsPage";
import BrandsAdd from "./pages/Brands/components/BrandsAdd/BrandsAdd";
import CategoriesAdd from "./pages/CategoriesAdd/CategoriesAdd";
import CategoriesEdit from "./pages/CategoriesAdd/CategoriesEdit";
import CategoriesPage from "./pages/CategoriesPage";
import CategoriesUpdatePage from "./pages/CategoriesUpdatePage";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";
import ProductDetailsPageAdd from "./pages/ProductDetailPage/ProductDetailsPageAdd";
import ProductDetailsPageEdit from "./pages/ProductDetailPage/ProductDetailsPageEdit";
import Products from "./Products";
import ProductAdd from "./Products/ProductAdd";
import SliderList from "./Slider/Slider";
import ProductAttribute from "./Products/components/ProductAttribute";
import ProductAttributeEdit from "./Products/components/ProductAttributeEdit";
import ProductAttributeAdd from "./Products/components/ProductAttributeAdd";
import AttributeValue from "./Products/components/AtributeValue";
import Attribute from "./Products/components/Atribute";
import Brand from "./Products/components/Brand";
import ProductInventors from "./Products/components/ProductInventors";
import ProductMedia from "./Products/components/ProductMedia";
import ProductStocks from "./Products/components/ProductStocks";
import ProductTypeAttribute from "./Products/components/ProductTypeAttribute";
import ProductTypeAttributeAdd from "./Products/components/ProductTypeAttributeAdd";
import ProductTypeAttributeEdit from "./Products/components/ProductTypeAttributesEdit"
import ProductType from "./Products/components/ProductType";
import ProductTypeAdd from "./Products/components/ProductTypeAdd";
import ProductTypeEdit from "./Products/components/ProductTypeEdit";
import Stocks from "./Products/components/Stocks";
import StocksAdd from "./Products/components/StocksAdd";
import StocksEdit from "./Products/components/StocksEdit";
import Users from "./Products/components/Users";
import UsersAdd from "./Products/components/UsersAdd";
import UsersEdit from "./Products/components/UsersEdit";
import Checkout from "./Products/components/Checkout";
import Phone from "./Products/components/Phone/Phone";
import PhoneAdd from "./Products/components/Phone/PhoneAdd";
import PhoneEdit from "./Products/components/Phone/PhoneEdit";
import Site from "./Products/components/Site/Site";
import SiteAdd from "./Products/components/Site/SiteAdd";
import SiteEdit from "./Products/components/Site/SiteEdit";
import HomePage from "./pages/HomePage";
import SliderAdd from "./Slider/SliderAdd";
import SliderEdit from "./Slider/SliderEdit";
import ChangePassword from "./Auth/ChangePassword/ChangePassword";

import ProductEdit from "./Products/ProductEdit";
import InvetorAdd from "./Products/InvetorAdd";
import InvetorEdit from "./Products/InvertorEdit";
import BrandsEdit from "./pages/Brands/components/BrandsAdd/BrandsEdit";
import ProductMediaEdit from "./Products/components/ProductMediaEdit";
import ProductMediaAdd from "./Products/components/ProductMediaAdd";

const AppRoutes = () => {
  const isAuth = useSelector((state) => state.user.isAuth);

  return (
    <Routes>
      <Route element={<PrivateRoute isAuth={isAuth} />}>
        <Route path="/" element={<AppSidebar />}>
          <Route index element={<HomePage />} />

          <Route path="attribute-values" element={<AttributeValue />} />
          <Route path="attribute" element={<Attribute />} />
          <Route path="stocks" element={<Stocks />} />

          <Route path="users" element={<Users />} />
          <Route path="users/add" element={<UsersAdd />} />
          <Route path="users/edit/:id" element={<UsersEdit />} />

          <Route path="checkout" element={<Checkout />} />

          <Route path="phone-site-settings" element={<Phone />} />
          <Route path="phone-site-settings/add" element={<PhoneAdd />} />
          <Route path="phone-site-settings/edit/:id" element={<PhoneEdit />} />

          <Route path="site-settings" element={<Site />} />
          <Route path="site-settings/add" element={<SiteAdd />} />
          <Route path="site-settings/edit/:id" element={<SiteEdit />} />

          <Route path="products" element={<Products />} />
          <Route path="products/add" element={<ProductAdd />} />
          <Route path="products/edit/:id" element={<ProductEdit />} />

          <Route path="product-brand" element={<Brand />} />

          <Route path="product-inventors" element={<ProductInventors />} />
          <Route path="product-inventors/add" element={<InvetorAdd />} />
          <Route path="product-inventors/edit/:id" element={<InvetorEdit />} />

          <Route path="product-media" element={<ProductMedia />} />
          <Route path="product-media/add" element={<ProductMediaAdd />} />
          <Route path="product-media/edit/:id" element={<ProductMediaEdit />} />

          <Route path="product-stocks" element={<ProductStocks />} />

          <Route
            path="product-type-attribute"
            element={<ProductTypeAttribute />}
          />
          <Route
            path="product-type-attribute/add"
            element={<ProductTypeAttributeAdd />}
          />
          <Route
            path="product-type-attribute/edit/:id"
            element={<ProductTypeAttributeEdit />}
          />

          <Route path="product-type" element={<ProductType />} />
          <Route path="product-type/add" element={<ProductTypeAdd />} />
          <Route path="product-type/edit/:id" element={<ProductTypeEdit />} />

          <Route
            path="product-attribute-values"
            element={<ProductDetailPage />}
          />
          <Route
            path="product-attribute-values/add"
            element={<ProductDetailsPageAdd />}
          />
          <Route
            path="product-attribute-values/edit/:id"
            element={<ProductDetailsPageEdit />}
          />

          <Route path="categories" element={<CategoriesPage />} />
          <Route path="category/:id" element={<CategoriesUpdatePage />} />
          <Route path="category/add" element={<CategoriesAdd />} />
          <Route path="category/edit/:id" element={<CategoriesEdit />} />

          <Route path="sliders" element={<SliderList />} />
          <Route path="sliders/add" element={<SliderAdd />} />
          <Route path="sliders/edit/:id" element={<SliderEdit />} />

          <Route path="brands" element={<BrandsPage />} />
          <Route path="brands/add" element={<BrandsAdd />} />
          <Route path="brands/edit/:id" element={<BrandsEdit />} />

          <Route path="stocks" element={<Stocks />} />
          <Route path="stocks/add" element={<StocksAdd />} />
          <Route path="stocks/edit/:id" element={<StocksEdit />} />

          <Route path="product_attribute" element={<ProductAttribute />} />
          <Route
            path="product-attribute/edit/:id"
            element={<ProductAttributeEdit />}
          />
          <Route
            path="product-attribute/add"
            element={<ProductAttributeAdd />}
          />

          <Route path="change-password" element={<ChangePassword />} />
        </Route>
      </Route>
      <Route path="/auth" element={<Auth />}>
        <Route path="login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
