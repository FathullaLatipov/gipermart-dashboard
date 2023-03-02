import { TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { makeStyles } from "@saleor/macaw-ui";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Checkbox from "../../../../components/Checkbox/Checkbox";
import ResponsiveTable from "../../../../components/ResponsiveTable/ResponsiveTable";
import { fetchCategories } from "../../../../http/productApi";
import {
  hideAppLoader,
  showAppLoader,
} from "../../../../store/appReducer/actions";
import $host from "../../../../http";
const useStyles = makeStyles(
  (theme) => ({
    [theme.breakpoints.up("md")]: {
      colName: {
        minWidth: 300,
      },
      colPrice: {
        width: 300,
      },
      colPublished: {
        width: 200,
      },
      colType: {
        width: 300,
      },
      colDate: {
        width: 200,
      },
    },
    colAttribute: {
      width: 200,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    colFill: {
      padding: 0,
      width: "100%",
    },
    colName: {
      wordBreak: "break-all",
      "&$colNameFixed": {
        width: 300,
      },
    },
    colAvatar: {
      wordBreak: "break-all",
    },
    colNameFixed: {},
    colNameHeader: {
      // marginLeft: AVATAR_MARGIN,
    },
    colNameWrapper: {
      display: "block",
    },
    colPrice: {
      textAlign: "right",
    },
    colPublished: {},
    colType: {
      minWidth: "300px",
      wordBreak: "break-all",
    },
    link: {
      cursor: "pointer",
    },
    table: {
      tableLayout: "fixed",
    },
    tableContainer: {
      overflowX: "scroll",
    },
    textLeft: {
      textAlign: "left",
    },
    textRight: {
      textAlign: "right",
    },
    productName: {
      cursor: "pointer",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
    width160: {
      width: "160px",
    },
  }),
  { name: "ProductList" }
);

const CategoriesList = memo(({ search }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  // const categories = useSelector((state) => state.categories);
  const [categories, setCategories] = useState([]);
  const [reload, setReload] = useState(1);
  console.log(categories);

  useEffect(() => {
    $host
      .get("dashboard/categories/")
      .then((res) => setCategories(res.data.results))
      .catch((error) => console.error(error));
  }, [reload]);

  const handleRemuve = (id) => {
    $host
      .delete(`dashboard/categories/${id}/`)
      .then((res) => {
        setReload((prev) => prev + 1);
        console.log(res);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className={classes.tableContainer}>
      <ResponsiveTable className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell style={{ width: "30px" }}>Ид</TableCell>
            <TableCell>Tип</TableCell>
            <TableCell>Название</TableCell>
            <TableCell>Oписание</TableCell>
            <TableCell>Pодитель</TableCell>
            <TableCell style={{ textAlign: "center" }}>Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories
            ?.filter((item) =>
              search?.toLowerCase() === ""
                ? item
                : item.name?.toLowerCase().includes(search?.toLowerCase()) ||
                  String(item.id)?.toLowerCase().includes(search.toLowerCase())
            )
            .map(
              (category, i) =>
                // <h1>{category.name}</h1>
                category.is_active && (
                  <TableRow key={category.id}>
                    <TableCell style={{ width: "30px" }}>{i + 1}</TableCell>
                    <TableCell
                      onClick={() => navigate(`/category/${category.id}`)}
                    >
                      {category.name}
                    </TableCell>
                    <TableCell>{category.slug}</TableCell>
                    <TableCell>
                      {category.description.length > 23
                        ? category.description.charAt()
                        : category.description}
                    </TableCell>
                    <TableCell>
                      {category.parent ? category.name : "-"}
                    </TableCell>
                    <TableCell
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        justifyContent: "center",
                      }}
                    >
                      <ion-icon
                        onClick={() =>
                          navigate(`/category/edit/${category.id}`)
                        }
                        name="create-outline"
                      ></ion-icon>
                      <ion-icon
                        onClick={() => handleRemuve(category.id)}
                        name="trash-outline"
                      ></ion-icon>
                    </TableCell>
                  </TableRow>
                )
            )}
        </TableBody>
      </ResponsiveTable>
    </div>
  );
});

export default CategoriesList;
