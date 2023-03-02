import React, { useEffect } from "react";
import Container from "../components/Container";
import PageHeader from "../components/PageHeader";
import { Button } from "../components/Button";
import { Card } from "@material-ui/core";
import ProductList from "./components/ProductList";
import FilterBar from "./components/ProductHeader";
import $host from "../http";
import { useNavigate } from "react-router-dom";

const Products = () => {
    useEffect(() => {
        document.title = "Товары";
    }, []);

    const navigate = useNavigate();

    return (
        <>
            <Container>
                <PageHeader
                    title={"Товары"}
                >
                    <Button
                        variant="primary"
                        color="primary"
                        onClick={() => navigate("/products/add")}
                        // href={href}
                        style={{ width: "100%" }}
                    >
                        Создать товар
                    </Button>
                </PageHeader>
                <Card>
                    <FilterBar />
                    {/* <ProductList/> */}
                </Card>
            </Container>
        </>
    );
}

export default Products;