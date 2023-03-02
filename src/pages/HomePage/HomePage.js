import { Card, makeStyles, Typography } from "@material-ui/core";
import { toggle } from "@saleor/macaw-ui";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import CardSpacer from "../../components/CardSpacer";
import CardTitle from "../../components/CardTitle";
import Container from "../../components/Container";
import FormSpacer from "../../components/FormSpacer/FormSpacer";
import HomeActivityCard from "./components/HomeActivityCard";
import HomeNotification from "./components/HomeNotification";
import HomeProductListCard from "./components/HomeProductListCard";

const useStyles = makeStyles(
  (theme) => ({
    title: {
      [theme.breakpoints.down("sm")]: {
        fontSize: 20,
        padding: 0,
      },
      flex: 1,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    titleDescription: {
      fontWeight: 400,
      fontSize: theme.spacing(2),
    },
    root: {
      display: "grid",
      gridRowGap: theme.spacing(3),
      gridColumnGap: theme.spacing(3),
      gridTemplateColumns: "9fr 4fr",
    },
    mainCards: {
      display: "grid",
      gridColumnGap: theme.spacing(3),
      gridTemplateColumns: "1fr 1fr",
    },
    salesCard: {
      marginBottom: theme.spacing(3),
    },
    salesCardItem: {
      padding: `${theme.spacing(2)} ${theme.spacing(3)}`,
      display: "grid",
      gridColumnGap: theme.spacing(3),
      gridTemplateColumns: "1fr 64px",
    },
    salesCardItemHeader: {
      lineHeight: 1.75,
      fontSize: "20px",
      fontWeight: 500,
    },
    salesCardItemHeaderDescription: {
      height: "20px",
      fontSize: "12px",
      lineHeight: 0.9,
      color: "rgba(124, 127, 127, 1);",
    },
    salesCardItemInfo: {
      textAlign: "right",
    },
    salesCardItemLogo: {
      color: "white",
      width: "100%",
      height: "100%",
      padding: "10px 5px 0px 5px",
      fontSize: "54px",
      borderRadius: "8px",
      backgroundColor: "#FAFBFA",
    },
  }),
  { name: "PageHeader" }
);

const HomePage = () => {
  const classes = useStyles();
  const {
    user: { user },
  } = useSelector((state) => state);
  const [orders, setOrders] = useState(0);
  return (
    <Container>
      <div>
        <Typography className={classes.title} variant="h4">
          Привет, {user?.first_name} {user?.last_name}
        </Typography>
        <span className={classes.titleDescription}>
          Вот некоторые сведения, которые мы собрали о вашем магазине
        </span>
      </div>
      <CardSpacer />
      <div className={classes.root}>
        <div>
          <div className={classes.mainCards}>
            <Card className={classes.salesCard}>
              <div className={classes.salesCardItem}>
                <div>
                  <Typography
                    variant="h3"
                    className={classes.salesCardItemHeader}
                  >
                    Продажи
                  </Typography>
                  <Typography
                    variant="div"
                    className={classes.salesCardItemHeaderDescription}
                  >
                    Сегодня
                  </Typography>
                  <Typography
                    variant="h4"
                    className={classes.salesCardItemInfo}
                  >
                    0,00Сум
                  </Typography>
                </div>
                <div className={classes.salesCardItemLogo}>
                  <svg
                    class="MuiSvgIcon-root jss290 MuiSvgIcon-fontSizeInherit"
                    focusable="false"
                    viewBox="0 0 64 64"
                    aria-hidden="true"
                  >
                    <path
                      style={{ fill: "#000" }}
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M40.1974 14H49.7682V22.7732L45.9287 19.2537L35.0969 30.0855L25.1555 28.0973L15.5364 39.6402L14 38.3598L24.3809 25.9027L34.4395 27.9145L44.453 17.901L40.1974 14ZM21.2682 44H17.2682V49H21.2682V44ZM15.2682 42V51H23.2682V42H15.2682ZM26.2682 34H30.2682V49H26.2682V34ZM24.2682 51V32H32.2682V51H24.2682ZM39.2682 37H35.2682V49H39.2682V37ZM33.2682 35V51H41.2682V35H33.2682ZM44.2682 28H48.2682V49H44.2682V28ZM42.2682 51V26H50.2682V51H42.2682Z"
                      fill="#06847B"
                    ></path>
                  </svg>
                </div>
              </div>
            </Card>
            <Card className={classes.salesCard}>
              <div className={classes.salesCardItem}>
                <div>
                  <Typography
                    variant="h3"
                    className={classes.salesCardItemHeader}
                  >
                    Заказы
                  </Typography>
                  <Typography
                    variant="div"
                    className={classes.salesCardItemHeaderDescription}
                  >
                    Сегодня
                  </Typography>
                  <Typography
                    variant="h4"
                    className={classes.salesCardItemInfo}
                  >
                    {orders}
                  </Typography>
                </div>
                <div className={classes.salesCardItemLogo}>
                  <svg
                    class="MuiSvgIcon-root jss290 MuiSvgIcon-fontSizeInherit"
                    focusable="false"
                    viewBox="0 0 64 64"
                    aria-hidden="true"
                  >
                    <path
                      style={{ fill: "#000" }}
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M43 13H16V51H43V45.5H41V49H18V15H41V33.5H43V13ZM40 43.9142L48.2071 35.7071L46.7928 34.2929L40 41.0858L36.7071 37.7929L35.2928 39.2071L40 43.9142ZM22 19H25V22H22V19ZM36 19H27V22H36V19ZM22 25H25V28H22V25ZM36 25H27V28H36V25ZM22 31H25V34H22V31ZM36 31H27V34H36V31Z"
                      fill="#06847B"
                    ></path>
                  </svg>
                </div>
              </div>
            </Card>
          </div>
          <div>
            <HomeNotification />
          </div>
          <CardSpacer />
          <div>
            <HomeProductListCard />
          </div>
        </div>
        <div>
          <HomeActivityCard setOrders={setOrders} />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
