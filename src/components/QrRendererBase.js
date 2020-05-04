import React from "react";
import './Qrcode.css'

function listPoint(props) {
    if (!props.qrcode) return []

    const qrcode = props.qrcode;
    const nCount = qrcode.getModuleCount();
    const pointList = new Array(nCount);

    let type = props.params[1];
    let size = props.params[0] / 100;
    let id = 0;

    if (size <= 0) size = 1.0

    for (let row = 0; row < nCount; row++) {
        for (let col = 0; col < nCount; col++) {
            if (qrcode.isDark(row, col)) {
                if (type == 0)
                    pointList.push(<rect width={size} height={size} key={id++} fill="black" x={row} y={col}/>)
                else if (type == 1)
                    pointList.push(<circle r={size / 2} key={id++} fill="black" cx={row + 0.5} cy={col + 0.5}/>)
            }
        }
    }
    return pointList;
}

function calViewBox(props) {
    if (!props.qrcode) return '0 0 0 0';

    const nCount = props.qrcode.getModuleCount();
    return String(-nCount / 5) + ' ' + String(-nCount / 5) + ' ' + String(nCount + nCount / 5 * 2) + ' ' + String(nCount + nCount / 5 * 2);
}

class QrRendererBase extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.setParamInfo) {
            this.props.setParamInfo([
                    {
                        key: '大小',
                        default: 100
                    },
                    {
                        key: '定位点样式',
                        default: 0,
                        choices: [
                            "矩形",
                            "圆形"
                        ]
                    }
                ]
            );
        }
    }

    render() {
        return (
            <svg className="Qr-item-svg" width="100%" height="100%" viewBox={calViewBox(this.props)} fill="white"
                 xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                {listPoint(this.props)}
            </svg>
        );
    }
}

export default QrRendererBase
