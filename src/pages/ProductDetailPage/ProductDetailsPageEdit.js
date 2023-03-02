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

const ProductDetailsPageEdit = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const [newData, setNewData] = useState(null);
  console.log(newData);
  const [attributes, setAttribute] = useState(null);
  const [inventors, setInventors] = useState(null);
  const [isCategories, setIsCategories] = useState(newData?.category);
  const classes = useStyles(props);

  const handleSubmit = async () => {
    const res = await $host.put(
      `/dashboard/product-attribute-values/${params.id}/`,
      newData
    );
    res?.statusText
      ? navigate("/product-attribute-values")
      : alert("Nimadir hato ketdi");
  };

  useEffect(() => {
    $host
      .get("dashboard/product-attribute-value/")
      .then((res) => setAttribute(res.data.results))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    $host
      .get("dashboard/product-inventors/")
      .then((res) => setInventors(res.data.results))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Container>
      <Backlink onClick={() => navigate("/product-attribute-values")}>
        Атрибут продукта 2
      </Backlink>
      <PageHeader title="Создать новый атрибут продукта" />
      <div>
        <Card>
          <CardTitle title={"Основная информация"} />
          <div className={classes.mainCardInfo}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-gh-label">
                  Атрибут продукта
                </InputLabel>
                <Select
                  labelId="demo-simple-gh-label"
                  id="demo-simple-select"
                  value={isCategories}
                  onChange={(e) => {
                    setIsCategories(e.target.value);
                    setNewData((prev) => ({
                      ...prev,
                      productinventory: e.target.value,
                    }));
                  }}
                >
                  {inventors?.map(({ sku, id }) => (
                    <MenuItem key={id} value={id}>
                      {sku}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormSpacer />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-gh-label">Тип продукта</InputLabel>
                <Select
                  labelId="demo-simple-gh-label"
                  id="demo-simple-select"
                  value={isCategories}
                  onChange={(e) => {
                    setIsCategories(e.target.value);
                    setNewData((prev) => ({
                      ...prev,
                      attributevalues: e.target.value,
                    }));
                  }}
                >
                  {attributes?.map(({ attribute_value, id }) => (
                    <MenuItem key={id} value={id}>
                      {attribute_value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </div>
        </Card>
        <CardSpacer />
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

export default ProductDetailsPageEdit;
