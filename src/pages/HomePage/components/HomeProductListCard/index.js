import { Card, CardContent, makeStyles, TableBody, TableCell, Typography } from "@material-ui/core";
import React  from "react";
import CardTitle from "../../../../components/CardTitle";
import ResponsiveTable from "../../../../components/ResponsiveTable/ResponsiveTable";
import TableRowLink from "../../../../components/TableRowLink/TableRowLink";
import $host from "../../../../http";

const useStyles = makeStyles(
    theme => ({
      avatarProps: {
        height: 64,
        width: 64,
      },
      colAvatar: {
        paddingBottom: theme.spacing(2),
        paddingRight: theme.spacing(),
        paddingTop: theme.spacing(2),
        width: 112,
      },
      colName: {
        width: "auto",
      },
      label: {
        paddingLeft: 0,
      },
      noProducts: {
        paddingBottom: 20,
        paddingTop: 20,
        paddingLeft: "0 !important",
      },
      tableRow: {
        cursor: "pointer",
      },
      cardContent: {
        padding: "0 !important",
      },
      cardTitle: {
        padding: 0,
      },
    }),
    { name: "HomeProductListCard" },
);

const HomeProductListCard = () => {
    const classes = useStyles();
    const [data, setData] = React.useState([]);
    console.log(data);
    const [reload, setReload] = React.useState(1);
    const [search, setSearch] = React.useState("");
    React.useEffect(() => {
      (async () => {
        try {
          const res = await $host.get(`dashboard/products/`);
          setData(res.data.results);
        } catch (error) {
          console.error(error);
        }
      })();
    }, [reload]);

    return (
        <Card>
            <CardTitle
                // className={classes.cardTitle}
                title={"Лучшие товары"}
            />
            <CardContent className={classes.cardContent}>
                <ResponsiveTable>
                    <TableBody>{data
            ?.filter((item) => {
              return search?.toLowerCase() === ""
                ? item
                : item.name?.toLowerCase().includes(search.toLowerCase()) ||
                String(item.id)
                  ?.toLowerCase()
                  .includes(search.toLowerCase());
            })
            .map(({ name }) =>  
                        <TableRowLink>
                            <TableCell colSpan={3} >
                                <Typography >
                                    {name}
                                </Typography>
                            </TableCell>
                        </TableRowLink>
                    )}
                    </TableBody>
                </ResponsiveTable>
            </CardContent>
        </Card>
    );
}

export default HomeProductListCard;