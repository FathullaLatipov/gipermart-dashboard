import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { Backlink } from "@saleor/macaw-ui";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardSpacer from "../../components/CardSpacer";
import Container from "../../components/Container";
import PageHeader from "../../components/PageHeader";
import $host from "../../http";
import CardTitle from "../../components/CardTitle";
import FormSpacer from "../../components/FormSpacer/FormSpacer";

const useStyles = makeStyles((theme) => ({
  mainCardInfo: {
    paddingTop: 0,
    padding: `${theme.spacing(3)} ${theme.spacing(4)}`,
  },
}));

const CheckoutAdd = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const [newData, setNewData] = useState({
    full_name: "",
    phone_number: "",
    region: "",
    town: "",
    address: "",
    comment: "",
    cart: [
      0,
    ],
    user: null,
    PAY_STATUS: true,
    NAXT_STATUS: true,
    total_price: "",
  });
  console.log(newData);
  const [users, setUsers] = useState(null);
  const [isUsers, setIsUsers] = useState(newData?.category);
  const classes = useStyles(props);

  const handleSubmit = async () => {
    const res = await $host.post(`dashboard/checkout/`, newData);
    res?.statusText
      ? navigate("/checkout")
      : alert("Nimadir hato ketdi");
  };

  useEffect(() => {
    $host
      .get("dashboard/users/")
      .then((res) => setUsers(res.data.results))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Container>
      <Backlink onClick={() => navigate("/checkout")}>
        Инвертарь
      </Backlink>
      <PageHeader title="Создать новую Инвертарь" />
      <div>
        <Card>
          <CardTitle title={"Основная информация"} />
          <div className={classes.mainCardInfo}>
            <TextField
              fullWidth
              placeholder={"full_name"}
              name="full_name"
              value={newData?.full_name}
              onChange={(e) =>
                setNewData((prev) => ({ ...prev, full_name: e.target.value }))
              }
            />
            <CardSpacer />
            <TextField
              fullWidth
              placeholder={"phone_number"}
              name="phone_number"
              value={newData?.phone_number}
              onChange={(e) =>
                setNewData((prev) => ({ ...prev, phone_number: e.target.value }))
              }
            />
            <CardSpacer />
            <TextField
              fullWidth
              placeholder={"region"}
              name="region"
              value={newData?.region}
              onChange={(e) =>
                setNewData((prev) => ({
                  ...prev,
                  region: e.target.value,
                }))
              }
            />
            <CardSpacer />
            <TextField
              fullWidth
              placeholder={"town"}
              name="town"
              value={newData?.town}
              onChange={(e) =>
                setNewData((prev) => ({ ...prev, town: e.target.value }))
              }
            />
            <CardSpacer />
            <TextField
              fullWidth
              placeholder={"address"}
              name="address"
              value={newData?.address}
              onChange={(e) =>
                setNewData((prev) => ({ ...prev, address: e.target.value }))
              }
            />
            <CardSpacer />
            <TextField
              fullWidth
              placeholder={"comment"}
              name="comment"
              value={newData?.comment}
              onChange={(e) =>
                setNewData((prev) => ({ ...prev, comment: e.target.value }))
              }
            />
            <CardSpacer />
            <TextField
              type="number"
              fullWidth
              placeholder={"comment"}
              name="comment"
              value={newData?.comment}
              onChange={(e) =>
                setNewData((prev) => ({ ...prev, comment: e.target.value }))
              }
            />
            <CardSpacer />
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="product_type">user</InputLabel>
                <Select
                  labelId="product_type"
                  id="demo-simple-select"
                  value={isUsers}
                  onChange={(e) => {
                    setIsUsers(e.target.value);
                    setNewData((prev) => ({
                      ...prev,
                      users: e.target.value,
                    }));
                  }}
                >
                  {users?.map(({ name, id }) => (
                    <MenuItem key={id} value={id}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormSpacer />
            </Box>
            <Checkbox
              checked={newData?.is_active ? true : false}
              onChange={(e) =>
                setNewData((prev) => ({ ...prev, is_active: e.target.checked }))
              }
            />
            is_active
            <Checkbox
              checked={newData?.is_default ? true : false}
              onChange={(e) =>
                setNewData((prev) => ({
                  ...prev,
                  is_default: e.target.checked,
                }))
              }
            />
            is_default
            <Checkbox
              checked={newData?.is_on_sale ? true : false}
              onChange={(e) =>
                setNewData((prev) => ({
                  ...prev,
                  is_on_sale: e.target.checked,
                }))
              }
            />
            is_on_sale
            <br />
          </div>
        </Card>

        <Button
          style={{ float: "right", marginTop: "10px", padding: "10px 70px" }}
          variant="contained"
          onClick={handleSubmit}
        >
          Сохранить
        </Button>
      </div>
    </Container>
  );
};

export default CheckoutAdd;
