import { Button as MacawButton } from "@saleor/macaw-ui";
import React from "react";
import { Link } from "react-router-dom";

const _Button = React.forwardRef(({ href, ...props }, ref) => {
  if (href && !/^https?:\/\//.test(href)) {
    return <MacawButton {...props} to={href} component={Link} ref={ref} />;
  }

  return <MacawButton href={href} {...props} ref={ref} />;
});

export const Button = _Button;