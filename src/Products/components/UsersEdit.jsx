import { Button, Card, Checkbox, makeStyles, MenuItem, TextField } from "@material-ui/core";
import { Autocomplete, Backlink } from "@saleor/macaw-ui";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CardSpacer from "../../components/CardSpacer";
import CardTitle from "../../components/CardTitle";
import FormSpacer from "../../components/FormSpacer/FormSpacer";
import Container from "../../components/Container";
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



const UsersEdit = (props) => {
    const navigate = useNavigate()
    const params = useParams();
    const [data, setData] = useState(null);
    const classes = useStyles(props);
 
    const sendToPreviousURL = () => {
        navigate("/users")
    }

    useEffect(() => {
        (async () =>
            await $host.get(`dashboard/users/`)
                .then((res) => setData({ ...res.data.results.find(e => e.id === +params.id) }))
                .catch((error) => console.error(error))
        )();
    }, []);

    const handleChange = ({ name, value }) => {
        setData(prevData => ({ ...prevData, [name]: value }))
    }


    const handleEdit = async () => {
        const formData = new FormData();
        formData.append('first_name', data.first_name);
        formData.append('phone_number', data.phone_number);
        formData.append("is_active", data.is_active);
        formData.append("is_staff", data.is_staff);
        const res = await $host.patch(`/dashboard/users/${params?.id}/`, formData)
        res?.statusText ? navigate("/users") : alert("Nimadir hato ketdi");


    };



    return (
        <Container>
            <Backlink onClick={() => sendToPreviousURL()}>Пользователи</Backlink>
            <PageHeader title="Редактировать пользователя" />
            <div>
                <Card>
                    <CardTitle title={"Основная информация"} />
                    <div className={classes.mainCardInfo}>
                        <TextField fullWidth placeholder={"Имя пользователя"} name="first_name" value={data?.first_name} onChange={(e) => handleChange(e.target)} />
                        <FormSpacer />
                        <TextField fullWidth label={"Номер телефона"} name="phone_number" value={data?.phone_number} onChange={(e) => handleChange(e.target)} />
                        <FormSpacer />
                        <Checkbox checked={data?.is_active ? true : false} onChange={e => setData(prev => ({ ...prev, is_active: e.target.checked }))} />is_active
                        <Checkbox checked={data?.is_staff ? true : false} onChange={e => setData(prev => ({ ...prev, is_staff: e.target.checked }))} />is_staff
                    </div>
                </Card>
                <CardSpacer />
                <Button onClick={handleEdit}>Сохранить</Button>
            </div>
        </Container>
    );
}

export default UsersEdit;
