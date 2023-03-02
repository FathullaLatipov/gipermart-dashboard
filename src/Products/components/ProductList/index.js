import { IconButton, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { DeleteIcon, makeStyles } from "@saleor/macaw-ui";
import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Checkbox from "../../../components/Checkbox/Checkbox";
import ResponsiveTable from "../../../components/ResponsiveTable/ResponsiveTable";
import { fetchDashboardProducts } from "../../../http/productApi";
import { hideAppLoader, showAppLoader } from "../../../store/appReducer/actions";

const useStyles = makeStyles(
    theme => ({
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
            textOverflow: "ellipsis"
        }
    }),
    { name: "ProductList" },
);

const ProductList = (props) => {
    const classes = useStyles(props);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [selected, setSelected] = useState([]);
    const navigate = useNavigate();
    console.log(products)

    const fetchProducts = async () => {
        dispatch(showAppLoader());
        const data = await fetchDashboardProducts()
        setLoading(false);
        setProducts(data.results)
        dispatch(hideAppLoader());
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const isRowSelected = (id) => !!selected.find((selected) => selected === id);

    const toggleRow = (id) => {
        if (isRowSelected(id)) {
            setSelected(selected.filter((row) => row !== id));
        } else {
            setSelected([...selected, id]);
        }
    };

    const toggleAll = () => {
        if (products.length === selected.length) {
            setSelected([]);
        } else {
            setSelected(products.map((row) => row.id));
        }
    };


    return (
        <div className={classes.tableContainer}>
            <ResponsiveTable className={classes.table}>
                <TableHead>
                    {selected.length > 0 ? (
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={selected.length === products.length}
                                    indeterminate={selected.length !== products.length}
                                    onChange={toggleAll}
                                />
                            </TableCell>
                            <TableCell colSpan={3}>{`Выбранные ${selected.length} предметов`}</TableCell>
                            <TableCell align="right" adding="checkbox">
                                <IconButton variant="secondary" hoverOutline>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ) : (
                        <TableRow>
                            <TableCell
                                padding="checkbox"
                            // className={clsx(classes.cell, {
                            //     [classes.dragRows]: dragRows,
                            // })}
                            >
                                <Checkbox
                                    indeterminate={products && products.length > selected.length && selected.length > 0}
                                    // onChange={() => toggleAll(items, selected)}
                                    checked={selected.length === products.length}
                                    onChange={toggleAll}
                                />
                            </TableCell>
                            <TableCell style={{ minWidth: 300 }}>Название</TableCell>
                            <TableCell>Тип</TableCell>
                            <TableCell>Доступность</TableCell>
                            <TableCell>Последнее обновление</TableCell>
                            <TableCell align="right">Цена</TableCell>
                        </TableRow>
                    )}
                </TableHead>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell padding="checkbox" />
                            <TableCell>
                                <SkeletonTheme baseColor="#ccc" highlightColor="#fff">
                                    <Skeleton />
                                </SkeletonTheme>
                            </TableCell>
                            <TableCell>
                                <SkeletonTheme baseColor="#ccc" highlightColor="#fff">
                                    <Skeleton />
                                </SkeletonTheme>
                            </TableCell>
                            <TableCell>
                                <SkeletonTheme baseColor="#ccc" highlightColor="#fff">
                                    <Skeleton />
                                </SkeletonTheme>
                            </TableCell>
                            <TableCell>
                                <SkeletonTheme baseColor="#ccc" highlightColor="#fff">
                                    <Skeleton />
                                </SkeletonTheme>
                            </TableCell>
                        </TableRow>
                    ) : (
                        products.map((product) => (
                            <TableRow hover selected={isRowSelected(product.id)} key={product.id}>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={isRowSelected(product.id)}
                                        onChange={() => toggleRow(product.id)}
                                    // checked={isRowSelected(dataRow.name)}
                                    // onChange={() => toggleRow(dataRow.name)}
                                    />
                                </TableCell>
                                <TableCell
                                    onClick={() => navigate(`/products/${product.id}`)}
                                    className={classes.productName}
                                    data-test-id="product-type"
                                >
                                    {product.product?.name}
                                </TableCell>
                                <TableCell>
                                    Телефоны и Ноутбуки
                                </TableCell>
                                <TableCell>
                                    {product.is_active ? "Активный" : "Не активный"}
                                </TableCell>
                                <TableCell>
                                    {moment(product.updated_at).from(Date.now())}
                                </TableCell>
                                <TableCell align="right">
                                    {product.sale_price}
                                </TableCell>
                            </TableRow>
                        )))}
                </TableBody>
            </ResponsiveTable>
        </div>
    );
}

export default ProductList;