import React from "react";
import { FormControlLabel, Switch } from "@material-ui/core";
import { UserChipMenu, UserChipMenuItem } from "@saleor/macaw-ui";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../../helper/tokenHelper";
import { useSelector } from "react-redux";


const UserCard = ({
  isDarkThemeEnabled,
  onThemeToggle,
}) => {
  const user = useSelector((state) => state.user?.user);
  const navigate = useNavigate();
  const onLogout = () => {
    logout();
    navigate("/auth/login/");
  }

  return (
    <UserChipMenu
      initials={"+9"}
      name={user.phone_number}
      avatar={null}
    >
      <UserChipMenuItem>
        <Link to="/change-password">
          Настройки аккаунта
        </Link>
      </UserChipMenuItem>
      <UserChipMenuItem onClick={onLogout}>
        Выйти
      </UserChipMenuItem>
      <UserChipMenuItem
        leaveOpen
      >
        <FormControlLabel
          control={<Switch checked={isDarkThemeEnabled} disableRipple />}
          label={"Включить темную тему"}
          onChange={onThemeToggle}
        />
      </UserChipMenuItem>
    </UserChipMenu>
  );
};

export default UserCard;