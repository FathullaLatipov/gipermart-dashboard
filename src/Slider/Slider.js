import {
  Button,
  Card,
  Container,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { makeStyles } from "@saleor/macaw-ui";
import React, { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import ResponsiveTable from "../components/ResponsiveTable/ResponsiveTable";
import $host from "../http";
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
  { name: "SliderList" }
);

const SliderList = memo(() => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [reload, setReload] = useState(1);
  const [sliders, setSliders] = useState([]);
  console.log(sliders);
  console.log(sliders);
  useEffect(
    () =>
      $host
        .get("dashboard/sliders/")
        .then((res) => setSliders(res.data.results))
        .catch((error) => console.error(error)),

    [reload]
  );

  const handleRemuve = (id) => {
    $host
      .delete(`dashboard/sliders/${id}/`)
      .then((res) => {
        setReload((prev) => prev + 1);
        console.log(res);
      })
      .catch((error) => console.error(error));
  };

  return (
    <Container>
      <PageHeader title={"Слайдеры"}>
        <Button
          variant="primary"
          color="primary"
          onClick={() => navigate("/sliders/add")}
          // href={href}
          style={{ width: "100%" }}
        >
          Создать слайдеры
        </Button>
      </PageHeader>
      <Card>
        <div className={classes.tableContainer}>
          <ResponsiveTable className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "20px" }}>Id</TableCell>
                <TableCell>Silka</TableCell>
                <TableCell>Изображения слайдера</TableCell>
                <TableCell>Время создания</TableCell>
                <TableCell style={{ width: "10%" }}>Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sliders.map((slider) => (
                <TableRow key={slider.id}>
                  <TableCell style={{ width: "20px" }}>{slider.id}</TableCell>
                  <TableCell>
                    <a href={slider.url}>{slider.url}</a>
                  </TableCell>
                  <a href={slider.url}>
                    <TableCell>
                      <img src={slider.images} alt={slider.slug} height={60} />
                    </TableCell>
                  </a>
                  <TableCell style={{ width: "50%" }}>
                    {new Date(slider?.created_at).toLocaleDateString("ru-RU", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell style={{ width: "10%" }}>
                    <ion-icon
                      style={{ marginLeft: "20px" }}
                      onClick={() => navigate(`/sliders/edit/${slider.id}`)}
                      name="create-outline"
                    ></ion-icon>
                    <ion-icon
                      onClick={() => handleRemuve(slider.id)}
                      name="trash-outline"
                    ></ion-icon>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </ResponsiveTable>
        </div>
      </Card>
    </Container>
  );
});

export default SliderList;
