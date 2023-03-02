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

const ChangePassword = (props) => {
  const classes = useStyles(props);
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const sendToPreviousURL = () => {
    navigate("/")
}

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!oldPassword || !newPassword || !confirmPassword) {
      setMessage("Please fill all fields");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm password fields do not match");
      return;
    }

    // Make PUT request to server
    const requestBody = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };
    
    const res = await $host.put("/dashboard/change-password/", requestBody);
    res?.statusText ? navigate("/") : alert("Nimadir hato ketdi");
      };

  return (
    <Container>
        <Backlink onClick={() => sendToPreviousURL()}>Главная</Backlink>
        <PageHeader title="Редактировать аккаунт" />
        <div>
            <Card>
                <CardTitle title={"Настройки аккаунта"} />
                <div className={classes.mainCardInfo}>
                <TextField type="password" fullWidth placeholder={"Старый пароль"} value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                <FormSpacer />
                <TextField type="password" fullWidth placeholder={"Новый пароль"} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                <FormSpacer />
                <TextField type="password" fullWidth placeholder={"Подтвердить пароль"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                {message && <p>{message}</p>}
                </Card>
                <CardSpacer />
                <Button type="submit" onClick={handleSubmit}>Сохранить</Button>
            </div>
        </Container>
    );
}

export default ChangePassword;
