import React from "react";
import './Qrcode.css'
import {defaultRenderer} from "../utils/util";

class QrRendererBlank extends React.Component {
    render() {
        return defaultRenderer(this.props.qrcode);
    }
}

export default QrRendererBlank
