import React from "react";
import { Helmet } from "react-helmet";


const WindowTitle = ({ title }) => {
    

    return (
        <Helmet title={title}/>
    );
}

export default WindowTitle