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



const StocksEdit = (props) => {
    const navigate = useNavigate()
    const params = useParams();
    const [data, setData] = useState(null);
    const [file, setFile] = useState(null);
    const classes = useStyles(props);
 
    const sendToPreviousURL = () => {
        navigate("/stocks")
    }

    useEffect(() => {
        (async () =>
            await $host.get(`dashboard/stocks/`)
                .then((res) => setData({ ...res.data.results.find(e => e.id === +params.id) }))
                .catch((error) => console.error(error))
        )();
    }, []);

    const handleChange = ({ name, value }) => {
        setData(prevData => ({ ...prevData, [name]: value }))
    }

    const handleEdit = async () => {
        const formData = new FormData();
        formData.append('url', data.url);
        formData.append('images', file);
        const res = await $host.patch(`/dashboard/stocks/${params?.id}/`, formData)
        res?.statusText ? navigate("/stocks") : alert("Nimadir hato ketdi");


    };

    return (
        <Container>
            <Backlink onClick={() => sendToPreviousURL()}>Акции</Backlink>
            <PageHeader title="Редактировать акцию" />
            <div>
                <Card>
                    <CardTitle title={"Основная информация"} />
                    <div className={classes.mainCardInfo}>
                        <TextField fullWidth placeholder={"url акции"} name="url" value={data?.url} onChange={(e) => handleChange(e.target)} />
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
                <CardSpacer />
                <Button onClick={handleEdit}>Сохранить</Button>
            </div>
        </Container>
    );
}

export default StocksEdit;
