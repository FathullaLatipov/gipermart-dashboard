import React, { useState } from "react";
import { IconButton, TextField, Typography } from "@material-ui/core";
import useStyles from "../styles";
import FormSpacer from "../../components/FormSpacer/FormSpacer";
import { EyeIcon } from "@saleor/macaw-ui";
import { Button } from "../../components/Button";
import { fetchUserById, userLogin } from "../../http/userApi";
import { setTokens } from "../../helper/tokenHelper";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../store/userReducer/actions";
import { hideAppLoader, showAppLoader } from "../../store/appReducer/actions";

const LoginPage = (props) => {
    const classes = useStyles(props);
    const [ number, setNumber ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ showPassword, setShowPassword ] = useState(false);
    const [ error, setError ] = useState('');
    const navigate = useNavigate();
    const user = useSelector((state) => state.user?.user);
    const dispatch = useDispatch();

    const setErrorMessage = (message) => {
        setError(message);
        setTimeout(() => setError(''), 2000);
    }

    const handleSubmmit = async (e) => {
        e.preventDefault();
        if(!number.trim().length || !password.trim().length) {
            return setErrorMessage("Email or password is empty!");
        }
        dispatch(showAppLoader());
        const data = await userLogin(number, password);
        if(data.error) return setErrorMessage(data.error);
        setTokens(data.token);
        const [ user ] = await fetchUserById(data.token.id);
        dispatch(createUser(user));
        navigate("/");
        dispatch(hideAppLoader());
    }

    return (
        <form action="" method="post" onSubmit={handleSubmmit}>
            <>
            <Typography variant="h3" className={classes.header}>
                Sign in
            </Typography>
            {error && (
                <div className={classes.panel}>
                    {error}
                </div>
            )}
            <TextField
                fullWidth
                autoComplete="username"
                label={'Номер телефона'}
                name="number"
                onChange={(e) => setNumber(e.target.value)}
                value={number}
            />
            <FormSpacer/>
            <div className={classes.passwordWrapper}>
                <TextField
                    fullWidth
                    autoComplete="password"
                    label={"Пароль"}
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    value={password}
                />
                <IconButton
                    className={classes.showPasswordBtn}
                    variant="ghost"
                    onClick={() => setShowPassword(prev => !prev)}
                >
                    <EyeIcon/>
                </IconButton>
            </div>
            {/* <Typography
                // component={Link}
                className={classes.link}
                // to={passwordResetUrl}
                variant="body2"
            >
                Забыли пароль!
            </Typography> */}
            <FormSpacer />
            <div className={classes.buttonContainer}>
                <Button
                    className={classes.loginButton}
                    variant="primary"
                    type="submit"
                >
                    Логин
                </Button>
            </div>
            </>
        </form>
    );
}

export default LoginPage;