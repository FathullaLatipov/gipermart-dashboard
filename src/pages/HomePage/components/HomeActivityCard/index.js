import { Card, CardContent, List, ListItem, ListItemText, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import CardTitle from "../../../../components/CardTitle";
import $host from "../../../../http";
const useStyles = makeStyles(
  {
    loadingProducts: {
      paddingBottom: "10px",
      paddingTop: "10px",
    },
    noProducts: {
      paddingBottom: "16px",
      paddingTop: "16px",
    },
    listItem: {
      paddingLeft: 0,
    },
  },
  { name: "HomeActivityCard" },
);



const HomeActivityCard = ({ setOrders }) => {
  const classes = useStyles();
  const [data, setData] = React.useState([]);
  const [reload, setReload] = React.useState(1);
  React.useEffect(() => {
    (async () => {
      try {
        const res = await $host.get(`checkout/checkout/all/`);
        setData(res.data.results);
        setOrders(res?.data?.results?.length);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [reload]);

  function timeSince(date) {
    const seconds = Math.floor(
      (new Date().getTime() - new Date(date).getTime()) / 1000
    );
    let interval;
    let unit;

    switch (true) {
      case seconds < 60:
        unit = "second";
        interval = seconds;
        break;
      case seconds < 3600:
        unit = "minute";
        interval = Math.floor(seconds / 60);
        break;
      case seconds < 86400:
        unit = "hour";
        interval = Math.floor(seconds / 3600);
        break;
      case seconds < 2592000:
        unit = "day";
        interval = Math.floor(seconds / 86400);
        break;
      case seconds < 31536000:
        unit = "month";
        interval = Math.floor(seconds / 2592000);
        break;
      default:
        unit = "year";
        interval = Math.floor(seconds / 31536000);
        break;
    }

    return `${interval} ${unit}${interval === 1 ? "" : "s"} ago`;
  }


  timeSince(new Date("2021-02-27T22:45:44.598472+05:00")) // Output: "2 years ago"

  return (
    <Card>
      <CardTitle
        title={"Активность"}
      />
      <CardContent>
        <List dense>
          {data?.map((e, i) => i <= 7 ? (
            <ListItem key={e.id} className={classes.listItem} style={{
              display: "flex",
              flexDirection: " column"
            }}>
              {e.cart.map((el, idx) => (
                <ListItemText
                  key={el.id}
                  primary={
                    <Typography variant="p">
                      Заказ № {el.id} был размещен
                    </Typography>
                  }
                  secondary={timeSince(new Date(el.created_at))}
                />
              ))}
            </ListItem>
          ) : null)}
        </List>
      </CardContent>
    </Card>
  );
}

export default HomeActivityCard;