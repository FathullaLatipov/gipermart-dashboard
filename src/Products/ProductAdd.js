import { Box, Button, Card, Checkbox, FormControl, InputLabel, makeStyles, MenuItem, Select, TextField } from "@material-ui/core";
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


const ProductAdd = (props) => {
    const params = useParams()
    const navigate = useNavigate();
    const [newData, setNewData] = useState({
        name: "",
        slug: "",
        description: "",
        is_active: true,
        is_recommended: true,
        USA_product: true,
        status: "",
        user: 1,
        category: 0,
    });
    console.log(newData);
    const [categories, setCategories] = useState(null);
    const [age, setAge] = React.useState(newData?.status);
    const [isCategories, setIsCategories] = useState(newData?.category);
    const classes = useStyles(props);

    const handleSubmit = async () => {
        const res = await $host.post(`/dashboard/products/`, newData);
        res?.statusText ? navigate("/products") : alert("Nimadir hato ketdi");
    };

    useEffect(() => {
        $host.get("dashboard/categories/")
            .then((res) => setCategories(res.data.results))
            .catch((error) => console.error(error))
    }, []);
    return (
        <Container>
            <Backlink onClick={() => navigate("/products")}>Товары</Backlink>
            <PageHeader title="Создать новый товар" />
            <div>
                <Card>
                    <CardTitle title={"Основная информация"} />
                    <div className={classes.mainCardInfo}>
                        <TextField
                            fullWidth
                            placeholder={"Название товара"}
                            name="name"
                            value={newData?.name}
                            onChange={(e) => setNewData(prev => ({ ...prev, name: e.target.value }))} />
                        <CardSpacer />
                        <TextField fullWidth placeholder={"slug товара"} name="slug" value={newData?.slug} onChange={(e) => setNewData(prev => ({ ...prev, slug: e.target.value }))} />
                        <CardSpacer />
                        <TextField multiline fullWidth placeholder={"Описание товара"} name="description" value={newData?.description} onChange={(e) => setNewData(prev => ({ ...prev, description: e.target.value }))} />
                        <CardSpacer />
                        <Checkbox
                            checked={newData?.is_active ? true : false}
                            onChange={e =>
                                setNewData(prev => ({ ...prev, is_active: e.target.checked }))} />Актив
                        <Checkbox checked={newData?.USA_product ? true : false} onChange={e => setNewData(prev => ({ ...prev, USA_product: e.target.checked }))} />Продукт из США
                        <Checkbox checked={newData?.is_recommended ? true : false} onChange={e => setNewData(prev => ({ ...prev, is_recommended: e.target.checked }))} />Рекомендация
                        <br />
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Статус товара</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={age}
                                    onChange={e => {
                                        setAge(e.target.value);
                                        setNewData(prev => ({ ...prev, status: e.target.value }))
                                    }}
                                >
                                    {
                                        ["process", "success", "failed", "deleted"].map((e, i) => (
                                            <MenuItem key={i} value={e}>{e}</MenuItem>
                                        ))
                                    }

                                </Select>
                            </FormControl>
                            <CardSpacer />
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-gh-label">Категория</InputLabel>
                                <Select
                                    labelId="demo-simple-gh-label"
                                    id="demo-simple-select"
                                    value={isCategories}
                                    onChange={e => {
                                        setIsCategories(e.target.value);
                                        setNewData(prev => ({
                                            ...prev, category
                                                : e.target.value
                                        }))
                                    }}
                                >
                                    {
                                        categories?.map(({ name, id }) => (<MenuItem key={id} value={id}>{name}</MenuItem>))
                                    }

                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                </Card>

                <Button
                    style={{ float: "right", marginTop: "10px", padding: "10px 70px" }}
                    variant="contained"
                    onClick={handleSubmit}
                >
                    Сохранить
                </Button>
            </div>
        </Container>
    );
};

export default ProductAdd;
