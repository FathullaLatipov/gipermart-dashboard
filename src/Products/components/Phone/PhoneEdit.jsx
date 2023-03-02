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



const PhoneEdit = (props) => {
    const navigate = useNavigate()
    const params = useParams();
    const [data, setData] = useState(null);
    const classes = useStyles(props);
 
    const sendToPreviousURL = () => {
        navigate("/phone-site-settings")
    }

    useEffect(() => {
        (async () =>
            await $host.get(`dashboard/phone-site-settings/`)
                .then((res) => setData({ ...res.data.results.find(e => e.id === +params.id) }))
                .catch((error) => console.error(error))
        )();
    }, []);

    const handleChange = ({ name, value }) => {
        setData(prevData => ({ ...prevData, [name]: value }))
    }


    const handleEdit = async () => {
        const formData = new FormData();
        formData.append('phonenumbers', data.phonenumbers);
        formData.append('site_type', data.site_type);
        const res = await $host.patch(`/dashboard/phone-site-settings/${params?.id}/`, formData)
        res?.statusText ? navigate("/phone-site-settings") : alert("Nimadir hato ketdi");


    };

    return (
        <Container>
            <Backlink onClick={() => sendToPreviousURL()}>Номера</Backlink>
            <PageHeader title="Редактировать номер" />
            <div>
                <Card>
                    <CardTitle title={"Основная информация"} />
                    <div className={classes.mainCardInfo}>
                        <TextField fullWidth placeholder={"Номер телефона"} name="phonenumbers" value={data?.phonenumbers} onChange={(e) => handleChange(e.target)} />
                        <FormSpacer />
                        <TextField fullWidth placeholder={"Организация"} name="site_type" value={data?.site_type} onChange={(e) => handleChange(e.target)} />
                    </div>
                </Card>
                <CardSpacer />
                <Button onClick={handleEdit}>Сохранить</Button>
            </div>
        </Container>
    );
}

export default PhoneEdit;
