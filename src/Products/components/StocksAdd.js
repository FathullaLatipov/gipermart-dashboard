import {
    Button,
    Card,
    Checkbox,
    makeStyles,
    MenuItem,
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
  
  const StocksAdd = (props) => {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const categories = useSelector((state) => state.categories);
    const classes = useStyles(props);
  
    const [newData, setNewData] = React.useState({
      url: "",
    });
    const handleChange = ({ name, value }) => {
      setNewData(prevData => ({ ...prevData, [name]: value }));
    };
  
    const handleSubmit = async () => {
      const formData = new FormData();
      formData.append("url", newData.url);
      formData.append("images", file);
      const res = await $host.post(`/dashboard/stocks/`, formData);
      res?.statusText ? navigate("/stocks") : alert("Nimadir hato ketdi");
    };
  
    return (
      <Container>
        <Backlink onClick={() => navigate("/stocks")}>Акции</Backlink>
        <PageHeader title="Создать новую акцию" />
        <div>
          <Card>
            <CardTitle title={"Основная информация"} />
            <div className={classes.mainCardInfo}>
              <TextField
                fullWidth
                label={"url акции"}
                name="url"
                value={newData?.url}
                onChange={(e) => handleChange(e.target)}
              />
              <FormSpacer />
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
                {file ? file.name : "Выберите изображение"}
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
  
  export default StocksAdd;
  