import { TextField } from "@material-ui/core";
import { makeStyles } from "@saleor/macaw-ui";
import React from "react";

const useStyles = makeStyles((theme) => ({
    header: {
        display: "flex",
        alignItems: "center",
        paddingLeft: theme.spacing(4),
        borderBottom: "1px solid rgba(37, 41, 41, 0.1)",
    },
    headerTitle: {
        fontSize: "1.6rem",
        fontWeight: 500,
        margin: 0,
        padding: `0 ${theme.spacing(1)}`,
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(1.4),
        borderBottom: "2px solid #000",
    },
    headerSearch: {
        padding: `${theme.spacing(1)} ${theme.spacing(4)}`,
        display: "flex",
    },
    headerInput: {
        flex: 1,
    },
    headerInputField: {
        padding: "10.5px 12px",
    },
}));

const BrandsHeader = (props) => {
    const classes = useStyles(props);

    return (
        <div className={classes.headerBorder}>
            <div className={classes.header}>
                <h3 className={classes.headerTitle}>Все Brands</h3>
            </div>
            <div className={classes.headerSearch}>
                <TextField
                    onChange={(e) => props.setSearch(e.target.value)}
                    // label={"Поиск товаров"}
                    className={classes.headerInput}
                    inputProps={{
                        className: classes.headerInputField,
                        placeholder: "Поиск brands",
                    }}
                // inputProps={{
                // value={search}
                // onChange={handleSearchChange}
                />
            </div>
        </div>
    );
};

export default BrandsHeader;
