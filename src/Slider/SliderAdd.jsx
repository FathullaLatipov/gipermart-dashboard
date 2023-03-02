import { Button, Card, makeStyles, TextField } from "@material-ui/core";
import { Backlink } from "@saleor/macaw-ui";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [url, setUrl] = React.useState("");

  const classes = useStyles(props);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("url", url);
    formData.append("images", file);
    const res = await $host.post(`/dashboard/sliders/`, formData);
    res?.statusText ? navigate("/sliders") : alert("Nimadir hato ketdi");
  };

  return (
    <Container>
      <Backlink onClick={() => navigate("/sliders")}>Слайдеры</Backlink>
      <PageHeader title="Создать новую Слайдеры" />
      <div>
        <Card>
          <CardTitle title={"Ссылка на слайдер"} />
          <div className={classes.mainCardInfo}>
            <TextField
              type="url"
              fullWidth
              label={"Ссылка на слайдер"}
              name="name"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <CardSpacer />
            <Button variant="contained" component="label">
              Upload File{" "}
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                multiple
                hidden
              />
            </Button>
            <span style={{ marginLeft: "10px" }}>
              {file ? (
                <>
                  {file.name}
                  <ion-icon name="checkbox-outline"></ion-icon>
                </>
              ) : (
                "Выберите изображение"
              )}
            </span>
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
