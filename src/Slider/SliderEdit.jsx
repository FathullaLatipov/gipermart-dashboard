import { Button, Card, makeStyles, TextField } from "@material-ui/core";
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
  const [file, setFile] = useState(null);
  const [parent, setParent] = React.useState("");

  const classes = useStyles(props);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("url", parent.url);
    file && formData.append("images", file);
    const res = await $host.put(`/dashboard/sliders/${params.id}/`, formData);
    res?.statusText ? navigate("/sliders") : alert("Nimadir hato ketdi");
  };

  useEffect(
    () =>
      $host
        .get("dashboard/sliders/")
        .then((res) =>
          setParent(res.data.results.find((e) => e.id === +params.id))
        )
        .catch((error) => console.error(error)),
    []
  );

  return (
    <Container>
      <Backlink onClick={() => navigate("/sliders")}>Слайдеры</Backlink>
      <PageHeader title="Создать новую Слайдеры" />
      <div>
        <Card>
          <CardTitle title={"Основная информация"} />
          <div className={classes.mainCardInfo}>
            <TextField
              type="url"
              fullWidth
              placeholder="Название Слайдеры"
              name="name"
              value={parent.url}
              onChange={(e) =>
                setParent((prev) => ({ ...prev, url: e.target.value }))
              }
            />
            <CardSpacer />
            <Button variant="contained" component="label">
              Upload File
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                multiple
                hidden
              />
            </Button>
            <span style={{ marginLeft: "10px" }}>
              {file ? (
                <>{file.name}</>
              ) : (
                <img
                  height={60}
                  style={{ marginBottom: "-20px" }}
                  src={parent.images}
                  alt="image"
                />
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
