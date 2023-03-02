import {
  ButtonGroup,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@material-ui/core";
import { ArrowDropDown as ArrowDropDownIcon } from "@material-ui/icons";
import React from "react";
import { Button } from "../../../components/Button";

import { useStyles } from "./styles";

export const ButtonWithSelect = ({
  options,
  children,
  href,
  onClick,
  ...props
}) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const classes = useStyles();

  const handleMenuItemClick = (event, onClick,) => {
    onClick(event);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = (event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target)
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <ButtonGroup ref={anchorRef} {...props}>
        <Button
          variant="primary"
          color="primary"
          onClick={onClick}
          href={href}
          style={{ width: "100%" }}
        >
          {children}
        </Button>
        {/* {options.length > 0 && (
          <Button
            variant="primary"
            color="primary"
            aria-controls={open ? "button-with-select-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-label="select different option"
            aria-haspopup="menu"
            onClick={handleToggle}
          >
            <ArrowDropDownIcon className={classes.buttonIcon} />
          </Button>
        )} */}
      </ButtonGroup>
      {/* <Popper
        open={open}
        anchorEl={anchorRef.current}
        transition
        disablePortal
        placement="bottom-end"
        className={classes.popper}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper className={classes.paper}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="button-with-select-menu">
                  {options.map((option, i) => (
                    <MenuItem
                      key={option.label + i}
                      disabled={option.disabled}
                      onClick={e => handleMenuItemClick(e, option.onSelect)}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper> */}
    </>
  );
};