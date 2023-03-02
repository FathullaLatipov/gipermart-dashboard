import { Button, Card, Checkbox, makeStyles, MenuItem, TextField } from "@material-ui/core";
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

const useStyles = makeStyles(
    theme => ({
        mainCardInfo: {
            paddingTop: 0,
            padding: `${theme.spacing(3)} ${theme.spacing(4)}`
        },
    })
);



const UsersAdd = (props) => {
    const navigate = useNavigate()
    const classes = useStyles(props);

    const sendToPreviousURL = () => {
        navigate("/users")
    }


    const [newData, setNewData] = React.useState({
        first_name: "",
        phone_number: "",
        is_active: true,
        is_staff: false
    });
    const handleChange = ({ name, value }) => {
        setNewData(prevData => ({ ...prevData, [name]: value }))
    }

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('first_name', newData.first_name);
        formData.append('phone_number', newData.phone_number);
        formData.append("is_active", newData.is_active);
        formData.append("is_staff", newData.is_staff);
        const res = await $host.post(`/dashboard/users/`, formData)
        res?.statusText ? navigate("/users") : alert("Nimadir hato ketdi");
    }

    return (
        <Container>
            <Backlink onClick={() => sendToPreviousURL()}>Пользователи</Backlink>
            <PageHeader title="Создать новый пользователь" />
            <div>
                <Card>
                    <CardTitle title={"Основная информация"} />
                    <div className={classes.mainCardInfo}>
                        <TextField type="text" fullWidth placeholder={"Имя пользователя"} name="first_name" value={newData?.first_name} onChange={(e) => handleChange(e.target)} />
                        <CardSpacer />
                        <TextField type="string" fullWidth placeholder={"Номер телефона"} name="phone_number" value={newData?.phone_number} onChange={(e) => handleChange(e.target)} />
                        <CardSpacer />
                        <Checkbox checked={newData?.is_active ? true : false} onChange={e => setNewData(prev => ({ ...prev, is_active: e.target.checked }))} />is_active
                        <Checkbox checked={newData?.is_staff ? true : false} onChange={e => setNewData(prev => ({ ...prev, is_staff: e.target.checked }))} />is_staff
                    </div>
                </Card>
                <CardSpacer />
                <Button onClick={handleSubmit}>Добавить</Button>
            </div>
        </Container>
    );
}

export default UsersAdd;
