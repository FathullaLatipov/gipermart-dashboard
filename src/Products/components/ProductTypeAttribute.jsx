import {
  Button,
  Card,
  Checkbox,
  Container,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@saleor/macaw-ui";
import React from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import $host from "../../http";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(4),
    borderBottom: "1px solid rgba(37, 41, 41, 0.1)",
  },
  headerTitle: {
    fontSize: "1.6rem",
    fontWeight: 500,
    margin: 0,
    padding: `0 ${theme.spacing(1)}`,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1.4),
    borderBottom: "2px solid #000",
  },
  headerSearch: {
    padding: `${theme.spacing(1)} ${theme.spacing(4)}`,
    display: "flex",
  },
  headerInput: {
    flex: 1,
  },
  headerInputField: {
    padding: "10.5px 12px",
  },
}));

const ProductTypeAttributes = (props) => {
  const classes = useStyles(props);
  const navigate = useNavigate();
  const [reload, setReload] = React.useState(1);
  const [data, setData] = React.useState([]);
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    (async () => {
      try {
        const res = await $host.get(`/dashboard/product-type-attribute/`);
        setData(res.data.results);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [reload]);

  const handleRemuve = async (id) => {
    try {
      await $host.delete(`dashboard/product-type-attribute/${id}/`);
      setReload((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <PageHeader title={"Типов атрибут продуктов"}>
        <Button
          variant="primary"
          color="primary"
          onClick={() => navigate("/product-type-attribute/add")}
          // href={href}
          style={{ width: "100%" }}
        >
          Создать типов атрибут продуктов
        </Button>
      </PageHeader>
      <Card>
        <div className={classes.headerBorder}>
          <div className={classes.header}>
            <h3 className={classes.headerTitle}>Все типов атрибут продуктов</h3>
          </div>
          <div className={classes.headerSearch}>
            <TextField
              className={classes.headerInput}
              inputProps={{ placeholder: "Поиск типов атрибут продуктов" }}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <TableContainer className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell style={{ width: "100%", textAlign: "center" }}>
                  Атрибут продукта
                </TableCell>
                <TableCell>Тип продукта</TableCell>
                <TableCell style={{ textAligin: "center" }}>Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                ?.filter((item) => {
                  return search?.toLowerCase() === ""
                    ? item
                    : item.product_attributes.name
                      ?.toLowerCase()
                      .includes(search.toLowerCase()) ||
                    item.product_types.name
                      ?.toLowerCase()
                      .includes(search.toLowerCase()) ||
                    String(item.id)
                      ?.toLowerCase()
                      .includes(search.toLowerCase());
                })
                .map(({ id, product_attributes, product_types }) => (
                  <TableRow key={id}>
                    <TableCell> {id} </TableCell>
                    <TableCell style={{ width: "100%", textAlign: "center", cursor: "pointer" }} 
                      onClick={() => navigate(`/product-type-attribute/edit/${id}`)}
                    >
                      {product_attributes.name}
                    </TableCell>
                    <TableCell>{product_types.name} </TableCell>
                    <TableCell
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        justifyContent: "center",
                      }}
                    >
                      <ion-icon
                        onClick={() => navigate(`/product-type-attribute/edit/${id}`)}
                        name="create-outline"
                      ></ion-icon>
                      <ion-icon
                        onClick={() => handleRemuve(id)}
                        name="trash-outline"
                      ></ion-icon>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </TableContainer>
        </div>
      </Card>
    </Container>
  );
};

export default ProductTypeAttributes;
