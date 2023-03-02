import { Card, TableBody, TableCell, TableHead, TableRow, TextField } from "@material-ui/core";
import { Backlink, makeStyles } from "@saleor/macaw-ui";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/Button";
import CardSpacer from "../../components/CardSpacer";
import CardTitle from "../../components/CardTitle";
import Checkbox from "../../components/Checkbox/Checkbox";
import Container from "../../components/Container";
import FormSpacer from "../../components/FormSpacer/FormSpacer";
import MediaTile from "../../components/MediaTile";
import PageHeader from "../../components/PageHeader";
import ResponsiveTable from "../../components/ResponsiveTable/ResponsiveTable";

const useStyles = makeStyles(
    theme => ({
        productGrid: {
            display: "grid",
            gridRowGap: theme.spacing(3),
            gridColumnGap: theme.spacing(3),
            gridTemplateColumns: "9fr 4fr"
        },
        mainCardInfoHeader: {
            display: "flex",
            alignItems: "center",
            padding: `${theme.spacing(3)} ${theme.spacing(4)}`
        },
        mainCardInfoHeaderTitle: {
            fontSize: "1.7rem",
            fontWeight: 600,
            lineHeight: 1.334,
            letterSpacing: "0.02rem"
        },
        mainCardInfo: {
            paddingTop: 0,
            padding: `${theme.spacing(3)} ${theme.spacing(4)}`
        },
        imageGridContainer: {
            position: "relative",
        },
    })
)

const CategoriesUpdatePage = () => {
    const { id } = useParams();
    const classes = useStyles();
    const navigate = useNavigate();
    const category = useSelector((state) => 
        state.categories?.find((category) => category.id == id));
    console.log(category);
    const [ mainInputValue, setMainInputValue ] = useState({
        nameCategory: category.name,
        descriptionCategory: category.description
    });

    const handleChange = (e) => {
        setMainInputValue(prev => ({...prev, [e.target.name]: e.target.value}));
    }
    
    return (
        <Container>
            <Backlink href={"/categories"}>Категории</Backlink>
            <PageHeader title={category?.name}/>
            <div>
                <Card>
                    <div className={classes.mainCardInfoHeader}>
                        <div>
                            <span className={classes.mainCardInfoHeaderTitle}>Основная информация</span>
                        </div>
                    </div>
                    <div className={classes.mainCardInfo}>
                        <TextField
                            fullWidth
                            label="Название категории"
                            value={mainInputValue.nameCategory}
                            name="nameCategory"
                            onChange={handleChange}
                        />
                        <FormSpacer/>
                        <TextField
                            multiline 
                            fullWidth
                            label="Описание категории"
                            name="descriptionCategory"
                            value={mainInputValue.descriptionCategory}
                            onChange={handleChange}
                        />
                    </div>
                </Card>
                <CardSpacer/>
                <Card>
                    <CardTitle
                        title={"Фоновое изображение (по желанию)"}
                        toolbar={
                            <>
                            <Button
                                variant="tertiary"
                            >
                                Загрузите изображение
                            </Button>
                            {/* <input
                                // className={classes.fileField}
                                id="fileUpload"
                                // onChange={event => handleImageUpload(event.target.files)}
                                multiple
                                type="file"
                                // ref={imagesUpload}
                                accept="image/*"
                            /> */}
                            </>
                        } 
                    />
                    <div className={classes.imageGridContainer}>
                        <div className={classes.mainCardInfo}>
                            <MediaTile 
                                media={{url: category.background_image}}
                                onDelete={() => {}}
                            />
                        </div>
                    </div>
                </Card>
                <CardSpacer/>
                <Card>
                    <div className="">
                    <CardTitle title="Все подкатегории"/>
                        <ResponsiveTable>
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        padding="checkbox"
                                        // className={clsx(classes.cell, {
                                        //     [classes.dragRows]: dragRows,
                                        // })}
                                    >
                                        <Checkbox
                                            // indeterminate={products && products.length > selected.length && selected.length > 0}
                                            // onChange={() => toggleAll(items, selected)}
                                            // checked={selected.length === products.length}
                                            // onChange={toggleAll}
                                        />
                                    </TableCell>
                                    <TableCell>Название категории</TableCell>
                                    <TableCell className={classes.width160}>Подкатегории</TableCell>
                                    <TableCell className={classes.width160}>Количество продуктов</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {category.children?.map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell padding="checkbox">
                                        <Checkbox/>
                                    </TableCell>
                                    <TableCell onClick={() => navigate(`/category/${category.id}`)}>
                                        {category.name}
                                    </TableCell>
                                    <TableCell>
                                        {category.children.length}
                                    </TableCell>
                                    <TableCell>
                                        
                                    </TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </ResponsiveTable>
                    </div>
                </Card>
            </div>
        </Container>
    );
}

export default CategoriesUpdatePage;