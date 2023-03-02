import React from "react";
import { Link } from "react-router-dom";

export const SidebarLink = React.forwardRef(({ href, ...props }, ref) => 
    <Link to={href} {...props} ref={ref}/>);