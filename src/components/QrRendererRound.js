import React from "react";
import {srand, rand} from "../utils/util";
import './Qrcode.css'
import {getTypeTable, QRPointType} from "../utils/qrcodeHandler";

function listPoint(props) {
    if (!props.qrcode) return []

    const qrcode = props.qrcode;
    const nCount = qrcode.getModuleCount();
    const typeTable = getTypeTable(qrcode);
    const pointList = [];
    const vw = [3, -3];
    const vh = [3, -3];

    let id = 0;
    for (let x = 0; x < nCount; x++) {
        for (let y = 0; y < nCount; y++) {
            if (qrcode.isDark(x, y) == false) continue;

            if (typeTable[x][y] == QRPointType.ALIGN_CENTER || typeTable[x][y] == QRPointType.ALIGN_OTHER || typeTable[x][y] == QRPointType.TIMING) {
                pointList.push(<circle key={id++} fill="black" cx={x + 0.5} cy={y + 0.5} r={0.4} />)
            }
            else if (typeTable[x][y] == QRPointType.POS_CENTER) {
                pointList.push(<circle key={id++} fill="black" cx={x + 0.5} cy={y + 0.5} r={1.5} />)
                pointList.push(<circle key={id++} fill="none" strokeWidth="0.15" strokeDasharray="0.5,0.5" stroke="black"  cx={x + 0.5} cy={y + 0.5} r={3} />)
                for (let w = 0; w < vw.length; w++) {
                    pointList.push(<circle key={id++} fill="black" cx={x + vw[w] + 0.5} cy={y + 0.5} r={0.5} />)
                }
                for (let h = 0; h < vh.length; h++) {
                    pointList.push(<circle key={id++} fill="black" cx={x + 0.5} cy={y + vh[h] + 0.5} r={0.5} />)
                }
            }
            else if (typeTable[x][y] != QRPointType.POS_OTHER) {
                pointList.push(<circle key={id++} fill="black" cx={x + 0.5} cy={y + 0.5} r={0.5 * rand(0.33,1.0)} />)
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

class QrRendererRound extends React.Component {
    constructor(props) {
        super(props);
        this.props.setParamInfo([
                {
                    key: '没有choices的文本框1',
                    default: 1
                },
                {
                    key: '没有choices的文本框2',
                    default: 100
                },
                {
                    key: '有choices的选择框',
                    default: 0,
                    choices: [
                        "option1",
                        "option2"
                    ]
                }
            ]
        );
    }

    render() {
        return (
            <svg className="Qr-item-svg" width="100%" height="100%" viewBox={calViewBox(this.props)} enableBackground={calViewBox(this.props)} fill="white"
                 xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                {listPoint(this.props)}
            </svg>
        );
    }
}

export default QrRendererRound
