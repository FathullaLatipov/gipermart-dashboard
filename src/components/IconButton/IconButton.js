import {
  IconButton as MacawIconButton,
  IconButtonProps,
} from "@saleor/macaw-ui";
import React from "react";
import { Link } from "react-router-dom";

export const isExternalURL = url => /^https?:\/\//.test(url);

const _IconButton = React.forwardRef(
  ({ href, ...props }, ref) => {
    if (href && !isExternalURL(href)) {
      return (
        <MacawIconButton {...props} to={href} component={Link} ref={ref} />
      );
    }

    return <MacawIconButton href={href} {...props} ref={ref} />;
  },
);

export const IconButton = _IconButton;