import { Button, Card, Checkbox, makeStyles, MenuItem, TextField } from "@material-ui/core";
import { Autocomplete, Backlink } from "@saleor/macaw-ui";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CardSpacer from "../../../components/CardSpacer";
import CardTitle from "../../../components/CardTitle";
import FormSpacer from "../../../components/FormSpacer/FormSpacer";
import Container from "../../../components/Container";
import PageHeader from "../../../components/PageHeader";
import $host from "../../../http";

const useStyles = makeStyles(
    theme => ({
        mainCardInfo: {
            paddingTop: 0,
            padding: `${theme.spacing(3)} ${theme.spacing(4)}`
        },
    })
);



const SiteEdit = (props) => {
    const navigate = useNavigate()
    const params = useParams();
    const [data, setData] = useState(null);
    const classes = useStyles(props);
 
    const sendToPreviousURL = () => {
        navigate("/site-settings")
    }

    useEffect(() => {
        (async () =>
            await $host.get(`dashboard/site-settings/`)
                .then((res) => setData({ ...res.data.results.find(e => e.id === +params.id) }))
                .catch((error) => console.error(error))
        )();
    }, []);

    const handleChange = ({ name, value }) => {
        setData(prevData => ({ ...prevData, [name]: value }))
    }


    const handleEdit = async () => {
        const formData = new FormData();
        formData.append('link', data.link);
        formData.append('description', data.description);
        formData.append('logo', data.logo);
        const res = await $host.patch(`/dashboard/site-settings/${params?.id}/`, formData)
        res?.statusText ? navigate("/site-settings") : alert("Nimadir hato ketdi");


    };



    return (
        <Container>
            <Backlink onClick={() => sendToPreviousURL()}>Номера</Backlink>
            <PageHeader title="Редактировать ссылку" />
            <div>
                <Card>
                    <CardTitle title={"Основная информация"} />
                    <div className={classes.mainCardInfo}>
                        <TextField fullWidth placeholder={"Ссылка"} name="link" value={data?.link} onChange={(e) => handleChange(e.target)} />
                        <FormSpacer />
                        <TextField fullWidth placeholder={"Описание"} name="description" value={data?.description} onChange={(e) => handleChange(e.target)} />
                        <CardSpacer />
                        <Button style={{ width: "20%" }} component="label">
              Upload File
              <input
                type="file"
                onChange={(e) =>
                  setData((prev) => ({
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
                <Button onClick={handleEdit}>Сохранить</Button>
            </div>
        </Container>
    );
}

export default SiteEdit;
