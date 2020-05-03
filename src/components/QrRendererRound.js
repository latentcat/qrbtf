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
                pointList.push(<use key={id++} fill="black" x={row} y={col} href="#simpleRound"/>)
        }
    }
    return pointList;
}

function calViewBox(props) {
    if (!props.qrcode) return '0 0 0 0';

    const nCount = props.qrcode.getModuleCount();
    return '0 0 ' + String(nCount) + ' ' + String(nCount);
}

class QrRendererRound extends React.Component {
    render() {
        return (
            <svg className="Qr-item-svg" width="100%" height="100%" viewBox={calViewBox(this.props)} fill="white"
                 xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <circle fill="black" r={0.6} id="simpleRound"/>
                {listPoint(this.props)}
            </svg>
        );
    }
}

export default QrRendererRound
