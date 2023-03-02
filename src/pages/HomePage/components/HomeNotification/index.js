import { Card, CardContent, makeStyles, TableBody, TableCell, Typography } from "@material-ui/core";
import { KeyboardArrowRight } from "@material-ui/icons";
import React from "react";
import ResponsiveTable from "../../../../components/ResponsiveTable/ResponsiveTable";
import TableRowLink from "../../../../components/TableRowLink/TableRowLink";

const useStyles = makeStyles(
    () => ({
      arrowIcon: {
        textAlign: "right",
        width: 100,
      },
      tableCard: {
        overflow: "hidden",
      },
      tableRow: {
        cursor: "pointer",
      },
      cardContent: {
        padding: "0 !important",
      },
    }),
    { name: "HomeNotificationTable" },
);

const HomeNotification = () => {
    const classes = useStyles();

    return (
        <Card>
            <CardContent className={classes.cardContent}>
                <ResponsiveTable>
                    <TableBody>
                        <TableRowLink hover={true} href="/checkout">
                            <TableCell>
                                <Typography>
                                    <strong>2</strong> заказа готовы к выполнению
                                </Typography>
                            </TableCell>
                            <TableCell className={classes.arrowIcon}>
                                <KeyboardArrowRight />
                            </TableCell>
                        </TableRowLink>
                        <TableRowLink hover={true} href="/checkout">
                            <TableCell>
                                <Typography>
                                    <strong>2</strong> заказа в обработке
                                </Typography>
                            </TableCell>
                            <TableCell className={classes.arrowIcon}>
                                <KeyboardArrowRight />
                            </TableCell>
                        </TableRowLink>
                        <TableRowLink hover={true} href="/products">
                            <TableCell>
                                <Typography>                
                                    Товара нет в наличии
                                </Typography>
                            </TableCell>
                            <TableCell className={classes.arrowIcon}>
                                <KeyboardArrowRight />
                            </TableCell>
                        </TableRowLink>
                    </TableBody>
                </ResponsiveTable>
            </CardContent>
        </Card>
    );
}

export default HomeNotification;