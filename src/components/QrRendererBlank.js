import React from "react";
import './Qrcode.css'
import {defaultRenderer} from "../utils/util";

export default class QrRendererBlank extends React.Component {
    render() {
        return defaultRenderer(this.props.qrcode);
    }
}

