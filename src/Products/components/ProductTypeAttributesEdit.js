import {
  Button,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import { Backlink } from "@saleor/macaw-ui";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "../../components/Container";
import PageHeader from "../../components/PageHeader";
import $host from "../../http";
import FormSpacer from "../../components/FormSpacer/FormSpacer";

const useStyles = makeStyles((theme) => ({
  mainCardInfo: {
    paddingTop: 0,
    padding: `${theme.spacing(3)} ${theme.spacing(4)}`,
  },
}));

const ProductAttributesEdit = (props) => {
    const params = useParams();
  const navigate = useNavigate();
  const [newData, setNewData] = useState({
    product_attributes: {
      name: "",
      description: "",
    },
    product_types: {
      name: "",
    },
    product_attribute: 0,
    product_type: 0,
  });
  console.log(newData);
  const [productsType, setProductsType] = useState(null);
  const [productsAttribute, setProductsAttribute] = useState(null);
  const classes = useStyles(props);

  const handleSubmit = async () => {
    const res = await $host.post(`/dashboard/product-type-attribute/`, newData);
    res?.statusText
      ? navigate("/product-type-attribute")
      : alert("Nimadir hato ketdi");
  };

  useEffect(() => {
    $host
      .get("dashboard/product-type/")
      .then((res) => setProductsType(res.data.results))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    $host
      .get("dashboard/product-attribute/")
      .then((res) => setProductsAttribute(res.data.results))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    $host
      .get(`/dashboard/product-type-attribute/${params.id}/`)
      .then((res) => setNewData(res.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Container>
      <Backlink onClick={() => navigate("/product-type-attribute")}>
        Тип аттрибутов продукта
      </Backlink>
      <PageHeader title="Редактировать тип аттрибутов продукта" />
      <div>
        <div className={classes.mainCardInfo}>
          <FormControl fullWidth>
            <InputLabel id="product_attribute">Атрибут продукта</InputLabel>
            <Select
              labelId="product_attribute"
              id="demo-simple-select"
              value={newData.product_attribute}
              onChange={(e) => {
                setNewData((prev) => ({
                  ...prev,
                  product_attribute: e.target.value,
                }));
              }}
            >
              {productsAttribute?.map((name) => (
                <MenuItem key={name.id} value={name.id}>
                  {name.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormSpacer />
          <FormControl fullWidth>
            <InputLabel id="product_type">Тип продуктов</InputLabel>
            <Select
              labelId="product_type"
              id="demo-simple-select"
              value={+newData?.product_type}
              onChange={(e) => {
                setNewData((prev) => ({
                  ...prev,
                  product_type: e.target.value,
                }));
              }}
            >
              {productsType?.map((e) => (
                <MenuItem key={e.id} value={e.id}>
                  {e.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
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

export default ProductAttributesEdit;
