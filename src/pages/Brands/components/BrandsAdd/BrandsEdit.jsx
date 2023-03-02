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
import CardSpacer from "../../../../components/CardSpacer";
import Container from "../../../../components/Container";
import PageHeader from "../../../../components/PageHeader";
import $host from "../../../../http";
import CardTitle from "../../../../components/CardTitle";

const useStyles = makeStyles((theme) => ({
  mainCardInfo: {
    paddingTop: 0,
    padding: `${theme.spacing(3)} ${theme.spacing(4)}`,
  },
}));

const BrandsEdit = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const [newData, setNewData] = useState(null);
  console.log(newData);
  const [categories, setCategories] = useState(null);
  const [products, setProducts] = useState(null);
  const classes = useStyles(props);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("url", newData.url);
    formData.append("category", newData.category ? newData.category : "");
    formData.append("product", newData.product ? newData.product : "");
    formData.append("images", newData.images);

    const res = await $host.put(`/dashboard/brands/${params.id}/`, formData);
    res?.statusText ? navigate("/brands") : alert("Nimadir hato ketdi");
  };

  useEffect(
    () =>
      $host
        .get(`/dashboard/brands/${params.id}/`)
        .then((res) => setNewData(res.data))
        .catch((error) => console.error(error)),
    []
  );

  useEffect(() => {
    $host
      .get("dashboard/categories/")
      .then((res) => setCategories(res.data.results))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    $host
      .get("dashboard/products/")
      .then((res) => setProducts(res.data.results))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Container>
      <Backlink onClick={() => navigate("/brands")}>Бренды</Backlink>
      <PageHeader title="Создать новый бренд" />
      <div>
        <Card>
          <CardTitle title={"Основная информация"} />
          <div className={classes.mainCardInfo}>
            <TextField
              fullWidth
              placeholder={"url бренда"}
              name="url"
              value={newData?.url}
              onChange={(e) =>
                setNewData((prev) => ({ ...prev, url: e.target.value }))
              }
            />
            <CardSpacer />
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Категория бренда
                </InputLabel>
                <Select
                  labelId="demo-simple-gh-label"
                  id="demo-simple-select"
                  value={+newData?.category}
                  onChange={(e) => {
                    setNewData((prev) => ({
                      ...prev,
                      category: e.target.value,
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
                <InputLabel id="demo-simple-gh-label">
                  Продукт бренда
                </InputLabel>
                <Select
                  labelId="demo-simple-gh-label"
                  id="demo-simple-select"
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
                <CardSpacer />
                <Button style={{ width: "20%" }} component="label">
                  Upload File
                  <input
                    type="file"
                    onChange={(e) =>
                      setNewData((prev) => ({
                        ...prev,
                        images: e.target.files[0],
                      }))
                    }
                    multiple
                    hidden
                  />
                </Button>
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

export default BrandsEdit;
