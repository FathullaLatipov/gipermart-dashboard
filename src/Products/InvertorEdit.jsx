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
import CardSpacer from "../components/CardSpacer";
import Container from "../components/Container";
import PageHeader from "../components/PageHeader";
import $host from "../http";
import CardTitle from "../components/CardTitle";

const useStyles = makeStyles((theme) => ({
  mainCardInfo: {
    paddingTop: 0,
    padding: `${theme.spacing(3)} ${theme.spacing(4)}`,
  },
}));

const SliderAdd = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const [newData, setNewData] = useState({
    sku: "",
    upc: "",
    installment_plan: "",

    is_active: false,
    is_default: false,
    is_on_sale: false,

    price: null,
    sale_price: null,
    product_type: null,
  });
  console.log(newData);
  const [categories, setCategories] = useState(null);
  const [products, setProducts] = useState(null);
  const classes = useStyles(props);

  const handleSubmit = async () => {
    const res = await $host.put(`dashboard/product-inventors/${params.id}`, newData);
    res?.statusText
      ? navigate("/product-inventors")
      : alert("Nimadir hato ketdi");
  };

  useEffect(() => {
    $host
      .get("dashboard/product-type/")
      .then((res) => setCategories(res.data.results))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    $host
      .get("dashboard/products/")
      .then((res) => setProducts(res.data.results))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    $host
      .get(`/dashboard/product-inventors/${params.id}/`)
      .then((res) => setNewData(res.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Container>
      <Backlink onClick={() => navigate("/product-inventors")}>
        Инвертарь
      </Backlink>
      <PageHeader title="Создать новую Инвертарь" />
      <div>
        <Card>
          <CardTitle title={"Основная информация"} />
          <div className={classes.mainCardInfo}>
            <TextField
              type="text"
              fullWidth
              placeholder={"sku"}
              name="sku"
              value={newData?.sku}
              onChange={(e) =>
                setNewData((prev) => ({ ...prev, sku: e.target.value }))
              }
            />
            <CardSpacer />
            <TextField
              type="text"
              fullWidth
              placeholder={"upc"}
              name="upc"
              value={newData?.upc}
              onChange={(e) =>
                setNewData((prev) => ({ ...prev, upc: e.target.value }))
              }
            />
            <CardSpacer />
            <TextField
              type="text"
              fullWidth
              placeholder={"installment_plan"}
              name="installment_plan"
              value={newData?.installment_plan}
              onChange={(e) =>
                setNewData((prev) => ({
                  ...prev,
                  installment_plan: e.target.value,
                }))
              }
            />
            <CardSpacer />
            <TextField
              type="number"
              fullWidth
              placeholder={"price"}
              name="price"
              value={newData?.price}
              onChange={(e) =>
                setNewData((prev) => ({ ...prev, price: e.target.value }))
              }
            />
            <CardSpacer />
            <TextField
              type="number"
              fullWidth
              placeholder={"sale_price"}
              name="sale_price"
              value={newData?.sale_price}
              onChange={(e) =>
                setNewData((prev) => ({ ...prev, sale_price: e.target.value }))
              }
            />
            <CardSpacer />
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
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="product_type">product_type</InputLabel>
                <Select
                  labelId="product_type"
                  id="demo-simple-select"
                  value={newData.product_type}
                  onChange={(e) => {
                    setNewData((prev) => ({
                      ...prev,
                      product_type: e.target.value,
                    }));
                  }}
                >
                  {categories?.map(({ name, id }) => (
                    <MenuItem key={id} value={id}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <CardSpacer />

              <FormControl fullWidth>
                <InputLabel id="product">product</InputLabel>
                <Select
                  labelId="product"
                  id="demo-simple-select2"
                  value={+newData?.product}
                  onChange={(e) => {
                    setNewData((prev) => ({
                      ...prev,
                      product: e.target.value,
                    }));
                  }}
                >
                  {products?.map(({ name, id }) => (
                    <MenuItem key={id} value={id}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
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

export default SliderAdd;
