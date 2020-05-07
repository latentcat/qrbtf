import React from "react";
import {defaultViewBox} from "../../utils/util";

function listPoints(qrcode, params) {
    if (!qrcode) return[]
    return []
}

function getParamInfo() {
    return []
}

export default class RendererBlank extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <svg className="Qr-item-svg" width="100%" height="100%" viewBox={defaultViewBox(this.props.qrcode)} fill="white"
                 xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                {listPoints(this.props.qrcode, this.props.params)}
            </svg>
        )
    }
}

