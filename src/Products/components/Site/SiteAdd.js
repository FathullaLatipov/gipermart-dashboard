import { Button, Card, makeStyles, TextField } from "@material-ui/core";
import { Backlink } from "@saleor/macaw-ui";
import React from "react";
import { useNavigate } from "react-router-dom";
import CardSpacer from "../../../components/CardSpacer";
import CardTitle from "../../../components/CardTitle";
import Container from "../../../components/Container";
import PageHeader from "../../../components/PageHeader";
import $host from "../../../http";

const useStyles = makeStyles((theme) => ({
  mainCardInfo: {
    paddingTop: 0,
    padding: `${theme.spacing(3)} ${theme.spacing(4)}`,
  },
}));

const SiteAdd = (props) => {
  const navigate = useNavigate();
  const classes = useStyles(props);

  const sendToPreviousURL = () => {
    navigate("/site-settings");
  };

  const [newData, setNewData] = React.useState({
    description: "",
    link: "",
    logo: null,
  });
  const handleChange = ({ name, value }) => {
    setNewData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("link", newData.link);
    formData.append("description", newData.description);
    formData.append("logo", newData.logo);
    const res = await $host.post(`/dashboard/site-settings/`, formData);
    res?.statusText ? navigate("/site-settings") : alert("Nimadir hato ketdi");
  };

  return (
    <Container>
      <Backlink onClick={() => sendToPreviousURL()}>Ссылки</Backlink>
      <PageHeader title="Создать новую ссылку" />
      <div>
        <Card>
          <CardTitle title={"Основная информация"} />
          <div className={classes.mainCardInfo}>
            <TextField
              type="url"
              fullWidth
              placeholder={"Ссылка"}
              name="link"
              value={newData?.link}
              onChange={(e) => handleChange(e.target)}
            />
            <CardSpacer />
            <TextField
              type="string"
              fullWidth
              placeholder={"Описание"}
              name="description"
              value={newData?.description}
              onChange={(e) => handleChange(e.target)}
            />
            <CardSpacer />
            <Button style={{ width: "20%" }} component="label">
              Upload File
              <input
                type="file"
                onChange={(e) =>
                  setNewData((prev) => ({
                    ...prev,
                    logo: e.target.files[0],
                  }))
                }
                multiple
                hidden
              />
            </Button>
          </div>
        </Card>
        <CardSpacer />
        <Button onClick={handleSubmit}>Добавить</Button>
      </div>
    </Container>
  );
};

export default SiteAdd;
