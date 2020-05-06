import React from "react";
import './Qrcode.css'
import {getTypeTable, QRPointType} from "../utils/qrcodeHandler";
import {defaultRenderer, rand} from "../utils/util";

function listPoint(props) {
    if (!props.qrcode) return []

    const qrcode = props.qrcode;
    const nCount = qrcode.getModuleCount();
    const typeTable = getTypeTable(qrcode);
    const pointList = new Array(nCount);

    let type = props.params[0];
    let size = props.params[1] / 100;
    let opacity = props.params[2] / 100;
    let posType = props.params[3];
    let id = 0;

    const vw = [3, -3];
    const vh = [3, -3];

    if (size <= 0) size = 1.0

    for (let x = 0; x < nCount; x++) {
        for (let y = 0; y < nCount; y++) {
            if (qrcode.isDark(x, y) === false) continue;

            if (typeTable[x][y] === QRPointType.ALIGN_CENTER || typeTable[x][y] == QRPointType.ALIGN_OTHER || typeTable[x][y] == QRPointType.TIMING) {
                if (type == 0)
                    pointList.push(<rect opacity={opacity} width={size} height={size} key={id++} fill="black" x={x + (1 - size)/2} y={y + (1 - size)/2}/>)
                else if (type == 1)
                    pointList.push(<circle opacity={opacity} r={size / 2} key={id++} fill="black" cx={x + 0.5} cy={y + 0.5}/>)
                else if (type == 2)
                    pointList.push(<circle key={id++} opacity={opacity} fill="black" cx={x + 0.5} cy={y + 0.5} r={size / 2} />)
            }
            else if (typeTable[x][y] == QRPointType.POS_CENTER) {
                if (posType == 0) {
                    pointList.push(<rect width={1} height={1} key={id++} fill="black" x={x} y={y}/>);
                } else if (posType == 1) {
                    pointList.push(<circle key={id++} fill="black" cx={x + 0.5} cy={y + 0.5} r={1.5} />)
                    pointList.push(<circle key={id++} fill="none" strokeWidth="1" stroke="black"  cx={x + 0.5} cy={y + 0.5} r={3} />)
                } else if (posType == 2) {
                    pointList.push(<circle key={id++} fill="black" cx={x + 0.5} cy={y + 0.5} r={1.5} />)
                    pointList.push(<circle key={id++} fill="none" strokeWidth="0.15" strokeDasharray="0.5,0.5" stroke="black"  cx={x + 0.5} cy={y + 0.5} r={3} />)
                    for (let w = 0; w < vw.length; w++) {
                        pointList.push(<circle key={id++} fill="black" cx={x + vw[w] + 0.5} cy={y + 0.5} r={0.5} />)
                    }
                    for (let h = 0; h < vh.length; h++) {
                        pointList.push(<circle key={id++} fill="black" cx={x + 0.5} cy={y + vh[h] + 0.5} r={0.5} />)
                    }
                }
            }
            else if (typeTable[x][y] == QRPointType.POS_OTHER) {
                if (posType == 0) {
                    pointList.push(<rect width={1} height={1} key={id++} fill="black" x={x} y={y}/>);
                }
            }
            else {
                if (type == 0)
                    pointList.push(<rect opacity={opacity} width={size} height={size} key={id++} fill="black" x={x + (1 - size)/2} y={y + (1 - size)/2}/>)
                else if (type == 1)
                    pointList.push(<circle opacity={opacity} r={size / 2} key={id++} fill="black" cx={x + 0.5} cy={y + 0.5}/>)
                else if (type == 2)
                    pointList.push(<circle opacity={opacity}  key={id++} fill="black" cx={x + 0.5} cy={y + 0.5} r={0.5 * rand(0.33,1.0)} />)
            }
        }
    }

    return pointList;
}

export default class QrRendererRound extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.setParamInfo) {
            this.props.setParamInfo([
                    {
                        key: '信息点样式',
                        default: 1,
                        choices: [
                            "矩形",
                            "圆形",
                            "随机"
                        ]
                    },
                    {
                        key: '信息点缩放',
                        default: 50
                    },
                    {
                        key: '信息点不透明度',
                        default: 30,
                    },
                    {
                        key: '定位点样式',
                        default: 1,
                        choices: [
                            "矩形",
                            "圆形",
                            "行星",
                        ]
                    },
                ]
            );
        }
    }

    render() {
        return defaultRenderer(this.props.qrcode, listPoint(this.props));
    }
}

