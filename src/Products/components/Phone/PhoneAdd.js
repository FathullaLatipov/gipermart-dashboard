import { Button, Card, Checkbox, makeStyles, MenuItem, TextField } from "@material-ui/core";
import { Autocomplete, Backlink } from "@saleor/macaw-ui";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CardSpacer from "../../../components/CardSpacer";
import CardTitle from "../../../components/CardTitle";
import Container from "../../../components/Container";
import FormSpacer from "../../../components/FormSpacer/FormSpacer";
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



const PhoneAdd = (props) => {
    const navigate = useNavigate()
    const classes = useStyles(props);

    const sendToPreviousURL = () => {
        navigate("/phone-site-settings")
    }


    const [newData, setNewData] = React.useState({
        phonemubers: "",
        site_type: ""
    });
    const handleChange = ({ name, value }) => {
        setNewData(prevData => ({ ...prevData, [name]: value }))
    }

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('phonenumbers', newData.phonenumbers);
        formData.append('site_type', newData.site_type);
        const res = await $host.post(`/dashboard/phone-site-settings/`, formData)
        res?.statusText ? navigate("/phone-site-settings") : alert("Nimadir hato ketdi");
    }

    return (
        <Container>
            <Backlink onClick={() => sendToPreviousURL()}>Номера</Backlink>
            <PageHeader title="Создать новый номер" />
            <div>
                <Card>
                    <CardTitle title={"Основная информация"} />
                    <div className={classes.mainCardInfo}>
                        <TextField type="string" fullWidth placeholder={"Номер телефона"} name="phonenumbers" value={newData?.phonenumbers} onChange={(e) => handleChange(e.target)} />
                        <CardSpacer />
                        <TextField type="string" fullWidth placeholder={"Организация"} name="site_type" value={newData?.site_type} onChange={(e) => handleChange(e.target)} />
                    </div>
                </Card>
                <CardSpacer />
                <Button onClick={handleSubmit}>Добавить</Button>
            </div>
        </Container>
    );
}

export default PhoneAdd;
