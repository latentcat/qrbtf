import React  from "react";
import {ParamTypes} from "../../constant/ParamTypes";
import {getTypeTable, QRPointType} from "../../utils/qrcodeHandler";
import {createRenderer} from "../style/Renderer";
import {rand} from "../../utils/util";

function listPoints(qrcode, params) {
    if (!qrcode) return []

    const nCount = qrcode.getModuleCount();
    const typeTable = getTypeTable(qrcode);
    const pointList = new Array(nCount);

    let type = params[0];
    let size = params[1] / 100;
    let opacity = params[2] / 100;
    let posType = params[3];
    let id = 0;
    let otherColor = params[4];
    let posColor = params[5];

    const vw = [3, -3];
    const vh = [3, -3];

    if (size <= 0) size = 1.0

    for (let x = 0; x < nCount; x++) {
        for (let y = 0; y < nCount; y++) {
            if (qrcode.isDark(x, y) == false) continue;

            if (typeTable[x][y] == QRPointType.ALIGN_CENTER || typeTable[x][y] == QRPointType.ALIGN_OTHER || typeTable[x][y] == QRPointType.TIMING) {
                if (type == 0)
                    pointList.push(<rect opacity={opacity} width={size} height={size} key={id++} fill={otherColor} x={x + (1 - size)/2} y={y + (1 - size)/2}/>)
                else if (type == 1)
                    pointList.push(<circle opacity={opacity} r={size / 2} key={id++} fill={otherColor} cx={x + 0.5} cy={y + 0.5}/>)
                else if (type == 2)
                    pointList.push(<circle key={id++} opacity={opacity} fill={otherColor} cx={x + 0.5} cy={y + 0.5} r={size / 2} />)
            }
            else if (typeTable[x][y] == QRPointType.POS_CENTER) {
                if (posType == 0) {
                    pointList.push(<rect width={1} height={1} key={id++} fill={posColor} x={x} y={y}/>);
                } else if (posType == 1) {
                    pointList.push(<circle key={id++} fill={posColor} cx={x + 0.5} cy={y + 0.5} r={1.5} />)
                    pointList.push(<circle key={id++} fill="none" strokeWidth="1" stroke={posColor}  cx={x + 0.5} cy={y + 0.5} r={3} />)
                } else if (posType == 2) {
                    pointList.push(<circle key={id++} fill={posColor} cx={x + 0.5} cy={y + 0.5} r={1.5} />)
                    pointList.push(<circle key={id++} fill="none" strokeWidth="0.15" strokeDasharray="0.5,0.5" stroke={posColor}  cx={x + 0.5} cy={y + 0.5} r={3} />)
                    for (let w = 0; w < vw.length; w++) {
                        pointList.push(<circle key={id++} fill={posColor} cx={x + vw[w] + 0.5} cy={y + 0.5} r={0.5} />)
                    }
                    for (let h = 0; h < vh.length; h++) {
                        pointList.push(<circle key={id++} fill={posColor} cx={x + 0.5} cy={y + vh[h] + 0.5} r={0.5} />)
                    }
                }
            }
            else if (typeTable[x][y] == QRPointType.POS_OTHER) {
                if (posType == 0) {
                    pointList.push(<rect width={1} height={1} key={id++} fill={posColor} x={x} y={y}/>);
                }
            }
            else {
                if (type == 0)
                    pointList.push(<rect opacity={opacity} width={size} height={size} key={id++} fill={otherColor} x={x + (1 - size)/2} y={y + (1 - size)/2}/>)
                else if (type == 1)
                    pointList.push(<circle opacity={opacity} r={size / 2} key={id++} fill={otherColor} cx={x + 0.5} cy={y + 0.5}/>)
                else if (type == 2)
                    pointList.push(<circle opacity={opacity}  key={id++} fill={otherColor} cx={x + 0.5} cy={y + 0.5} r={0.5 * rand(0.33,1.0)} />)
            }
        }
    }

    return pointList;
}

function getParamInfoRect() {
    return [
        {
            type: ParamTypes.SELECTOR,
            key: '信息点样式',
            default: 0,
            choices: [
                "矩形",
                "圆形",
                "随机"
            ]
        },
        {
            type: ParamTypes.TEXT_EDITOR,
            key: '信息点缩放',
            default: 100
        },
        {
            type: ParamTypes.TEXT_EDITOR,
            key: '信息点不透明度',
            default: 100,
        },
        {
            type: ParamTypes.SELECTOR,
            key: '定位点样式',
            default: 0,
            choices: [
                "矩形",
                "圆形",
                "行星",
            ]
        },
        {
            type: ParamTypes.COLOR_EDITOR,
            key: '信息点颜色',
            default: '#000000'
        },
        {
            type: ParamTypes.COLOR_EDITOR,
            key: '定位点点颜色',
            default: '#000000'
        }
    ];
}

function getParamInfoRound() {
    return [
        {
            type: ParamTypes.SELECTOR,
            key: '信息点样式',
            default: 1,
            choices: [
                "矩形",
                "圆形",
                "随机"
            ]
        },
        {
            type: ParamTypes.TEXT_EDITOR,
            key: '信息点缩放',
            default: 50
        },
        {
            type: ParamTypes.TEXT_EDITOR,
            key: '信息点不透明度',
            default: 30,
        },
        {
            type: ParamTypes.SELECTOR,
            key: '定位点样式',
            default: 1,
            choices: [
                "矩形",
                "圆形",
                "行星",
            ]
        },
        {
            type: ParamTypes.COLOR_EDITOR,
            key: '信息点颜色',
            default: '#000000'
        },
        {
            type: ParamTypes.COLOR_EDITOR,
            key: '定位点点颜色',
            default: '#000000'
        }
    ];
}

function getParamInfoRandRound() {
    return [
        {
            type: ParamTypes.SELECTOR,
            key: '信息点样式',
            default: 2,
            choices: [
                "矩形",
                "圆形",
                "随机"
            ]
        },
        {
            type: ParamTypes.TEXT_EDITOR,
            key: '信息点缩放',
            default: 80
        },
        {
            type: ParamTypes.TEXT_EDITOR,
            key: '信息点不透明度',
            default: 100,
        },
        {
            type: ParamTypes.SELECTOR,
            key: '定位点样式',
            default: 2,
            choices: [
                "矩形",
                "圆形",
                "行星",
            ]
        },
        {
            type: ParamTypes.COLOR_EDITOR,
            key: '信息点颜色',
            default: '#000000'
        },
        {
            type: ParamTypes.COLOR_EDITOR,
            key: '定位点点颜色',
            default: '#000000'
        }
    ];
}

export const RendererRect= createRenderer({
    listPoints: listPoints,
    getParamInfo: getParamInfoRect,
});

export const RendererRound = createRenderer({
    listPoints: listPoints,
    getParamInfo: getParamInfoRound,
});

export const RendererRandRound = createRenderer({
    listPoints: listPoints,
    getParamInfo: getParamInfoRandRound,
});
