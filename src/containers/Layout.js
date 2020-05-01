import React from "react";
import './Layout.css'

const Layout = (props) => {
    return (
        <div>
            {props.children}
        </div>
    );
}

export default Layout;