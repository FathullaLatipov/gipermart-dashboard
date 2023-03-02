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



const ProductAttributeAdd = (props) => {
    const navigate = useNavigate()
    const [file, setFile] = useState(null)
    const classes = useStyles(props);

    const sendToPreviousURL = () => {
        navigate("/product_attribute")
    }


    const [newData, setNewData] = React.useState({
        name: "",
        slug: "",
        description: "",
        is_active: false,
    });
    const handleChange = ({ name, value }) => {
        setNewData(prevData => ({ ...prevData, [name]: value }))
    }

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('name', newData.name);
        formData.append('description', newData.description);
        const res = await $host.post(`/dashboard/product-attribute/`, formData)
        res?.statusText ? navigate("/product_attribute") : alert("Nimadir hato ketdi");
    }

    return (
        <Container>
            <Backlink onClick={() => sendToPreviousURL()}>Аттрибут</Backlink>
            <PageHeader title="Создать новый аттрибут" />
            <div>
                <Card>
                    <CardTitle title={"Основная информация"} />
                    <div className={classes.mainCardInfo}>
                        <TextField fullWidth label={"Название аттрибута"} name="name" value={newData?.name} onChange={(e) => handleChange(e.target)} />
                        <FormSpacer />
                        <TextField fullWidth label={"Описание"} name="description" value={newData?.description} onChange={(e) => handleChange(e.target)} />
                    </div>
                </Card>
                <CardSpacer />
                <Button onClick={handleSubmit}>Добавить</Button>
            </div>
        </Container>
    );
}

export default ProductAttributeAdd;
