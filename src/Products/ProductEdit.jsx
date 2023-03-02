import { Box, Button, Card, Checkbox, FormControl, InputLabel, makeStyles, MenuItem, Select, TextField } from "@material-ui/core";
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


const ProductEdit = (props) => {
  const params = useParams()
  const navigate = useNavigate();
  const [newData, setNewData] = useState(null);
  console.log(newData);
  const [categories, setCategories] = useState(null);
  const [age, setAge] = React.useState(newData?.status);
  const [isCategories, setIsCategories] = useState(newData?.category);
  const classes = useStyles(props);

  const handleSubmit = async () => {
    const res = await $host.put(`/dashboard/products/${params.id}/`, newData);
    res?.statusText ? navigate("/products") : alert("Nimadir hato ketdi");
  };

  useEffect(() =>
    $host.get(`/dashboard/products/${params.id}/`)
      .then((res) => setNewData(res.data))
      .catch((error) => console.error(error))
    , []);

  useEffect(() => {
    $host.get("dashboard/categories/")
      .then((res) => setCategories(res.data.results))
      .catch((error) => console.error(error))
  }, []);

  return (
    <Container>
      <Backlink onClick={() => navigate("/products")}>Товары</Backlink>
      <PageHeader title="Редактировать товар" />
      <div>
        <Card>
          <CardTitle title={"Основная информация"} />
          <div className={classes.mainCardInfo}>
            <TextField type="url" fullWidth placeholder={"Название товара"} name="name" value={newData?.name} onChange={(e) => setNewData(prev => ({ ...prev, name: e.target.value }))} />
            <CardSpacer />
            <TextField type="url" fullWidth placeholder={"slug товара"} name="slug" value={newData?.slug} onChange={(e) => setNewData(prev => ({ ...prev, slug: e.target.value }))} />
            <CardSpacer />
            <TextField type="url" multiline fullWidth placeholder={"Описание товара"} name="description" value={newData?.description} onChange={(e) => setNewData(prev => ({ ...prev, description: e.target.value }))} />
            <CardSpacer />
            <Checkbox checked={newData?.is_active ? true : false} 
            onChange={e => setNewData(prev => ({ 
              ...prev, is_active: e.target.checked }))} />is_active
            <Checkbox checked={newData?.USA_product ? true : false} onChange={e => setNewData(prev => ({ ...prev, USA_product: e.target.checked }))} />USA_product
            <Checkbox checked={newData?.is_recommended ? true : false} onChange={e => setNewData(prev => ({ ...prev, is_recommended: e.target.checked }))} />is_recommended
            <br />
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Статус товара</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  onChange={e => {
                    setAge(e.target.value);
                    setNewData(prev => ({ ...prev, status: e.target.value }))
                  }}
                >
                  {
                    ["process", "success", "failed", "deleted"].map((e, i) => (
                      <MenuItem key={i} value={e}>{e}</MenuItem>
                    ))
                  }

                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-gh-label">Категория</InputLabel>
                <Select
                  labelId="demo-simple-gh-label"
                  id="demo-simple-select"
                  value={isCategories}
                  onChange={e => {
                    setIsCategories(e.target.value);
                    setNewData(prev => ({ ...prev, status: e.target.value }))
                  }}
                >
                  {
                    categories?.map(({ name, id }) => (<MenuItem key={id} value={name}>{name}</MenuItem>))
                  }

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

export default ProductEdit;
