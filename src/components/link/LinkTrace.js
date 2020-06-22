import React from 'react';
import {handleLink} from "../../utils/gaHelper";

const LinkTrace = (props) => {
    return (
        <a onClick={(e) => handleLink(props.href)} {...props}>
            {props.children}
        </a>
    )
}

export default LinkTrace;
