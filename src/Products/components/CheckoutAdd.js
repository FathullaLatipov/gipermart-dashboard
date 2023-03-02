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
        // cart: null,
        user: null,
        PAY_STATUS: false,
        NAXT_STATUS: false,
        total_price: "",
    });
    console.log(newData);
    const [users, setUsers] = useState(null);
    const [carts, setCarts] = useState(null);
    console.log(carts);
    const [search, setSearch] = React.useState("");
    const [isUsers, setIsUsers] = useState(newData?.category);
    // const [isCarts, setIsCarts] = useState(newData?.cart);
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

    useEffect(() => {
        $host
          .get("cart/all-carts")
        //   .then(res => res.json())
          .then((res) => setCarts(res.data.results))
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
                multiline
                fullWidth
                placeholder={"comment"}
                name="comment"
                value={newData?.comment}
                onChange={(e) =>
                  setNewData((prev) => ({ ...prev, comment: e.target.value }))
                }
              />
              <CardSpacer />
              {/* {carts
                        ?.filter((item) => {
                            return search?.toLowerCase() === ""
                                ? item
                                : item.name?.toLowerCase().includes(search.toLowerCase()) ||
                                String(item.id)
                                    ?.toLowerCase()
                                    .includes(search.toLowerCase());
                        })
                        .map(({ id, name}) =>
              <TextField
                type="text"
                multiline
                fullWidth
                placeholder={"cart"}
                name="cart"
                value={newData?.name}
                onChange={(e) =>
                  setNewData((prev) => ({ ...prev, name: e.target.value }))
                }
              />)} */}
              <CardSpacer />
              <Box sx={{ minWidth: 120 }}>
              {/* <FormControl fullWidth>
                  <InputLabel id="product_type">product</InputLabel>
                  <Select
                    labelId="product_type"
                    id="demo-simple-select"
                    value={isCarts}
                    onChange={(e) => {
                      setIsCarts(e.target.value);
                      setNewData((prev) => ({
                        ...prev,
                        cart: e.target.value,
                      }));
                    }}
                  >
                    {carts?.map(({ product, id }) => (
                      <MenuItem key={id} value={id}>
                        {product.product.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormSpacer /> */}

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
                        user: e.target.value,
                      }));
                    }}
                  >
                    {users?.map(({ first_name, id }) => (
                      <MenuItem key={id} value={id}>
                        {first_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormSpacer />
              </Box>
              <Checkbox
                checked={newData?.PAY_STATUS ? true : false}
                onChange={(e) =>
                  setNewData((prev) => ({ ...prev, PAY_STATUS: e.target.checked }))
                }
              />
              PAY_STATUS
              <Checkbox
                checked={newData?.NAXT_STATUS ? true : false}
                onChange={(e) =>
                  setNewData((prev) => ({
                    ...prev,
                    NAXT_STATUS: e.target.checked,
                  }))
                }
              />
              NAXT_STATUS
              <br />
              <TextField
                fullWidth
                placeholder={"total_price"}
                name="total_price"
                value={newData?.total_price}
                onChange={(e) =>
                  setNewData((prev) => ({ ...prev, total_price: e.target.value }))
                }
              />
              <CardSpacer />
            </div>
          </Card>
  
          <Button
            style={{ float: "right", marginTop: "10px", padding: "10px 70px" }}
            variant="contained"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </div>
      </Container>
    );
  };
  
  export default CheckoutAdd;
  