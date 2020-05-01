import React from "react";
import './Qrcode.css'

function listPoint(props) {
    if (!props.qrcode) return []

    const qrcode = props.qrcode;
    const nCount = qrcode.getModuleCount();
    const pointList = new Array(nCount);
    let id = 0;
    for (let row = 0; row < nCount; row++) {
        for (let col = 0; col < nCount; col++) {
            if (qrcode.isDark(row, col))
                pointList.push(<use key={id++} fill="black" x={row} y={col} href="#simpleRect"/>)
        }
    }
    return pointList;
}

class QrRendererBase extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <svg>
                <rect fill="black" width={1} height={1} id="simpleRect"/>
                {listPoint(this.props)}
            </svg>
        );
    }
}

export default QrRendererBase
