import { Box, Button, Card, Checkbox, FormControl, InputLabel, makeStyles, MenuItem, Select, TextField } from "@material-ui/core";
import { Backlink } from "@saleor/macaw-ui";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardSpacer from "../../components/CardSpacer";
import Container from "../../components/Container";
import PageHeader from "../../components/PageHeader";
import $host from "../../http";
import CardTitle from "../../components/CardTitle";

const useStyles = makeStyles((theme) => ({
  mainCardInfo: {
    paddingTop: 0,
    padding: `${theme.spacing(3)} ${theme.spacing(4)}`,
  },
}));


const ProductMediaEdit = (props) => {
  const params = useParams()
  const navigate = useNavigate();
  const [newData, setNewData] = useState(null);
  console.log(newData);
  const [products, setProducts] = useState(null);
  const [isProducts, SetIsProducts] = useState(newData?.product_inventory);
  const classes = useStyles(props);

  const handleSubmit = async () => {
    const formData = new FormData();
          formData.append("alt_text", newData.alt_text);
          formData.append("is_feature", newData.is_feature);
          formData.append("product_inventory", newData.product_inventory);
          formData.append("img_url", newData.img_url);
    const res = await $host.put(`/dashboard/product-media/${params.id}/`, formData);
    res?.statusText ? navigate("/product-media") : alert("Nimadir hato ketdi");
  };

  useEffect(() =>
    $host.get(`/dashboard/product-media/${params.id}/`)
      .then((res) => setNewData(res.data))
      .catch((error) => console.error(error))
    , []);

  useEffect(() => {
    $host.get("dashboard/product-inventors/")
      .then((res) => setProducts(res.data.results))
      .catch((error) => console.error(error))
  }, []);

  return (
    <Container>
      <Backlink onClick={() => navigate("/product-media")}>Медиа</Backlink>
      <PageHeader title="Редактировать медиа" />
      <div>
        <Card>
          <CardTitle title={"Основная информация"} />
          <div className={classes.mainCardInfo}>
          <TextField
              fullWidth
              placeholder={"alt_text"}
              name="alt_text"
              value={newData?.alt_text}
              onChange={(e) => setNewData((prev) => ({ ...prev, alt_text: e.target.value }))}
            />
            <Checkbox
              checked={newData?.is_feature ? true : false}
              onChange={(e) =>
                setNewData((prev) => ({ ...prev, is_feature: e.target.checked }))
              }
            />
            is_feature <br />
            <Button variant="contained" component="label">
              Upload File
              <input
                type="file"
                onChange={(e) => setNewData(prev => ({...prev, img_url: e.target.files[0]}))}
                multiple
                hidden
              />
            </Button>
            <span style={{ marginLeft: "10px" }}>
              {newData?.img_url && "Выберите изображение"}
            </span>
          </div>
        </Card>
        <CardSpacer />
        <FormControl fullWidth>
                <InputLabel id="demo-simple-gh-label">Products</InputLabel>
                <Select
                  labelId="demo-simple-gh-label"
                  id="demo-simple-select"
                  value={isProducts}
                  onChange={(e) => {
                    SetIsProducts(newData?.product_inventory);
                    setNewData(prev => ({ 
                      ...prev, product_inventory: e.target.value }))}}
                >
                  {
                    products?.map((item) => (
                      <MenuItem 
                        key={item.id} 
                        value={item.id}>
                          {item.products.name}
                        </MenuItem>
                    ))
                  }

                </Select>
              </FormControl>
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

export default ProductMediaEdit;
