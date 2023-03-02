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
import { useNavigate } from "react-router-dom";
import CardSpacer from "../../components/CardSpacer";
import Container from "../../components/Container";
import PageHeader from "../../components/PageHeader";
import $host from "../../http";
import CardTitle from "../../components/CardTitle";
import FormSpacer from "../../components/FormSpacer/FormSpacer";
import { formToJSON } from "axios";

const useStyles = makeStyles((theme) => ({
  mainCardInfo: {
    paddingTop: 0,
    padding: `${theme.spacing(3)} ${theme.spacing(4)}`,
  },
}));

const ProductTypeAdd = (props) => {
  const navigate = useNavigate();
  const [newData, setNewData] = useState({
    name: "",
    product_type_attribute: null,
  });
  console.log(newData);
  const [productsTypeAttribute, setProductsTypeAttribute] = useState(null);
  const [isProductsTypeAttribute, setIsProductsTypeAttribute] = useState(newData?.category);
  const classes = useStyles(props);

  const handleSubmit = async () => {
    const res = await $host.post(
      "dashboard/product-type/",
      //   {
      //     product_type_attributes: {
      //       name: newData.product_type_attribute,
      //     },
      //   }
      newData
    );
    res?.statusText ? navigate("/product-type") : alert("Nimadir hato ketdi");
  };

  useEffect(() => {
    $host
      .get("dashboard/product-type-attribute/")
      .then((res) => setProductsTypeAttribute(res.data.results))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Container>
      <Backlink onClick={() => navigate("/product-type")}>
        Тип продуктов
      </Backlink>
      <PageHeader title="Создать новый тип продукта" />
      <div>
        <Card>
          <CardTitle title={"Основная информация"} />
          <div className={classes.mainCardInfo}>
            <TextField
              fullWidth
              placeholder={"Название"}
              name="name"
              value={newData?.name}
              onChange={(e) =>
                setNewData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            <CardSpacer />
            <FormControl fullWidth>
                <InputLabel id="product_type_attribute">product_type</InputLabel>
                <Select
                  labelId="product_type_attribute"
                  id="demo-simple-select"
                  value={isProductsTypeAttribute}
                  onChange={(e) => {
                    setIsProductsTypeAttribute(e.target.value);
                    setNewData((prev) => ({
                      ...prev,
                      product_type_attribute: e.target.value,
                    }));
                  }}
                >
                  {productsTypeAttribute?.map(({ id }) => (
                    <MenuItem key={id} value={id}>
                      {id}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            <FormSpacer />
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

export default ProductTypeAdd;
