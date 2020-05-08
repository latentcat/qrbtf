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

    const X = [-Math.sqrt(3)/2, 1/2];
    const Y = [ Math.sqrt(3)/2, 1/2];
    const Z = [0, 0];

    const matrixString = 'matrix(' + String(X[0]) + ', ' + String(X[1]) + ', ' + String(Y[0]) + ', ' + String(Y[1]) + ', ' + String(Z[0]) + ', ' + String(Z[1]) + ')'


    if (size <= 0) size = 1.0

    for (let x = 0; x < nCount; x++) {
        for (let y = 0; y < nCount; y++) {
            if (qrcode.isDark(x, y) == false) continue;
            else if (typeTable[x][y] == QRPointType.POS_CENTER) {
                if (posType == 0) {
                    pointList.push(<rect width={1} height={1} key={id++} fill="rgb(0,0,0)" x={x} y={y} transform={matrixString}/>);
                    pointList.push(<rect opacity={opacity} width={size/2} height={size} key={id++} fill="rgb(225,225,225)" x={0} y={0} transform={matrixString+'translate('+String(x+1)+','+String(y)+') '+'skewY(45) '}/>);
                    pointList.push(<rect opacity={opacity} width={size} height={size/2} key={id++} fill="rgb(240,240,240)" x={0} y={0} transform={matrixString+'translate('+String(x)+','+String(y+1)+') '+'skewX(45) '}/>);
                }
            }
            else if (typeTable[x][y] == QRPointType.POS_OTHER) {
                if (posType == 0) {
                    pointList.push(<rect width={1} height={1} key={id++} fill="rgb(0,0,0)" x={x} y={y} transform={matrixString}/>);
                    pointList.push(<rect opacity={opacity} width={size/2} height={size} key={id++} fill="rgb(225,225,225)" x={0} y={0} transform={matrixString+'translate('+String(x+1)+','+String(y)+') '+'skewY(45) '}/>);
                    pointList.push(<rect opacity={opacity} width={size} height={size/2} key={id++} fill="rgb(240,240,240)" x={0} y={0} transform={matrixString+'translate('+String(x)+','+String(y+1)+') '+'skewX(45) '}/>);
                }
            }
            else {
                if (type == 0) {
                    pointList.push(<rect opacity={opacity} width={size} height={size} key={id++} fill="rgb(0,0,0)" x={x + (1 - size)/2} y={y + (1 - size)/2} transform={matrixString}/>);
                    pointList.push(<rect opacity={opacity} width={size/2} height={size} key={id++} fill="rgb(210,210,210)" x={0} y={0} transform={matrixString+'translate('+String(x+1)+','+String(y)+') '+'skewY(45) '}/>);
                    pointList.push(<rect opacity={opacity} width={size} height={size/2} key={id++} fill="rgb(235,235,235)" x={0} y={0} transform={matrixString+'translate('+String(x)+','+String(y+1)+') '+'skewX(45) '}/>);
                }
            }
        }
    }

    return pointList;
}

export default class QrRenderer25D extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.setParamInfo) {
            this.props.setParamInfo([
                {
                    key: '信息点样式',
                    default: 0,
                    choices: [
                        "矩形",
                        "圆形",
                        "随机"
                    ]
                },
                {
                    key: '信息点缩放',
                    default: 100
                },
                {
                    key: '信息点不透明度',
                    default: 100,
                },
                {
                    key: '定位点样式',
                    default: 0,
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

