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



const CategoriesEdit = (props) => {
    const navigate = useNavigate()
    const params = useParams();
    const [data, setData] = useState(null);
    const classes = useStyles(props);
 
    const sendToPreviousURL = () => {
        navigate("/product_attribute")
    }

    useEffect(() => {
        (async () =>
            await $host.get(`dashboard/product-attribute/`)
                .then((res) => setData({ ...res.data.results.find(e => e.id === +params.id) }))
                .catch((error) => console.error(error))
        )();
    }, []);

    const handleChange = ({ name, value }) => {
        setData(prevData => ({ ...prevData, [name]: value }))
    }


    const handleEdit = async () => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        const res = await $host.patch(`/dashboard/product-attribute/${params?.id}/`, formData)
        res?.statusText ? navigate("/product_attribute") : alert("Nimadir hato ketdi");


    };



    return (
        <Container>
            <Backlink onClick={() => sendToPreviousURL()}>Аттрибуты</Backlink>
            <PageHeader title="Редактировать аттрибут" />
            <div>
                <Card>
                    <CardTitle title={"Основная информация"} />
                    <div className={classes.mainCardInfo}>
                        <TextField fullWidth placeholder={"Название аттрибута"} name="name" value={data?.name} onChange={(e) => handleChange(e.target)} />
                        <FormSpacer />
                        <TextField fullWidth label={"Описание"} name="description" value={data?.description} onChange={(e) => handleChange(e.target)} />
                    </div>
                </Card>
                <CardSpacer />
                <Button onClick={handleEdit}>Сохранить</Button>
            </div>
        </Container>
    );
}

export default CategoriesEdit;
