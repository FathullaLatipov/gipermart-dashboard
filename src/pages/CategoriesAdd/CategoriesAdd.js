import {
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
import { Autocomplete, Backlink } from "@saleor/macaw-ui";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CardSpacer from "../../components/CardSpacer";
import CardTitle from "../../components/CardTitle";
import Container from "../../components/Container";
import FormSpacer from "../../components/FormSpacer/FormSpacer";
import PageHeader from "../../components/PageHeader";
import $host from "../../http";

const useStyles = makeStyles((theme) => ({
  mainCardInfo: {
    paddingTop: 0,
    padding: `${theme.spacing(3)} ${theme.spacing(4)}`,
  },
}));

const CategoriesAdd = (props) => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const categories = useSelector((state) => state.categories);
  const classes = useStyles(props);

  const [newData, setNewData] = React.useState({
    name: "",
    slug: "",
    description: "",
    is_active: false,
    parent: null,
  });
  const handleChange = ({ name, value }) => {
    setNewData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    console.log(newData);
    const formData = new FormData();
    formData.append("name", newData.name);
    formData.append("slug", newData.slug);
    formData.append("description", newData.description);
    formData.append("is_active", newData.is_active);
    formData.append("parent", newData.parent);
    formData.append("background_image", file);
    const res = await $host.post(`/dashboard/categories/`, formData);
    res?.statusText ? navigate("/categories") : alert("Nimadir hato ketdi");
  };

  return (
    <Container>
      <Backlink onClick={() => navigate("/categories")}>Категории</Backlink>
      <PageHeader title="Создать новую Категории" />
      <div>
        <Card>
          <CardTitle title={"Основная информация"} />
          <div className={classes.mainCardInfo}>
            <TextField
              fullWidth
              label={"Название категории"}
              name="name"
              value={newData?.name}
              onChange={(e) => handleChange(e.target)}
            />
            <FormSpacer />
            <TextField
              fullWidth
              label={"slug категории"}
              name="slug"
              value={newData?.slug}
              onChange={(e) => handleChange(e.target)}
            />
            <FormSpacer />
            <TextField
              multiline
              fullWidth
              label="Описание категории"
              name="description"
              value={newData?.description}
              onChange={(e) => handleChange(e.target)}
            />
            <Checkbox
              checked={newData?.is_active}
              onChange={(e) =>
                setNewData((prev) => ({ ...prev, is_active: e.target.checked }))
              }
            />
            Активный <br />
            <Button variant="contained" component="label">
              Выберите изображение
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                multiple
                hidden
              />
            </Button>
            <span style={{ marginLeft: "10px" }}>{file ? file.name : ""}</span>
          </div>
        </Card>
        <CardSpacer />

        <Card>
          <CardTitle title={"Родительское категория"} />
          <div className={classes.mainCardInfo}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-gh-label">
                Родительское категория
              </InputLabel>
              <Select
                labelId="demo-simple-gh-label"
                id="demo-simple-select"
                value={newData.parent}
                onChange={(e) => {
                  setNewData((prev) => ({
                    ...prev,
                    parent: e.target.value,
                  }));
                }}
              >
                {categories?.map((e) => (
                  <MenuItem key={e.id} value={e.id}>
                    {e.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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

export default CategoriesAdd;
