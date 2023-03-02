import React, { useEffect } from "react";
import { ThemeProvider, useTheme } from "@saleor/macaw-ui";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { useDispatch, useSelector } from "react-redux";
import { hasAccessToken } from "./helper/tokenHelper";
import { checkAuth } from "./http/userApi";
import { hideLoader } from "./store/appReducer/actions";
import { TailSpin } from "react-loader-spinner";
import { fetchCategories } from "./http/productApi";
import { fetchCategoriesAction } from "./store/categoriesReducer/actions";
import { categoriesAlgo } from "./helper/categoryHelper";

function App() {
  
  const isLoading = useSelector((state) => state.app.isLoading);
  const dispatch = useDispatch();
  const { themeType, setTheme } = useTheme();
  const isDarkTheme = themeType === "dark";

  const fetchData = async () => {
    if(hasAccessToken()) {
      await checkAuth()
      const data = await fetchCategories();
      const sortData = categoriesAlgo(data.results);
      dispatch(fetchCategoriesAction(sortData));
      return dispatch(hideLoader());
    }
    dispatch(hideLoader());
  }
  
  useEffect(() => {
    fetchData();
  }, []);

  if(isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh"
        }}
      >
        <TailSpin
          height="160"
          width="160"
          color={`${isDarkTheme ? "#fff" : "#000"}`}
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <AppRoutes/>
    </BrowserRouter>
  );
}

export default App;
