import React  from "react";
import {ParamTypes} from "../../constant/ParamTypes";
import {getTypeTable, QRPointType} from "../../utils/qrcodeHandler";
import {createRenderer, defaultDrawIcon} from "../style/Renderer";
import {getExactValue, rand} from "../../utils/util";
import LinkTrace from "../link/LinkTrace";

function listPoints({ qrcode, params, icon }) {
    if (!qrcode) return []
    const nCount = qrcode.getModuleCount();

    const iconEnabled = getExactValue(icon.enabled, 0);

    const {src, scale} = icon;

    const iconSize = Number(nCount * (scale > .33 ? .33 : scale));
    const iconXY = (nCount - iconSize) / 2;

    function nearIcon(x, y) {
        return Math.pow((nCount - 1) / 2 - x, 2) + Math.pow((nCount - 1) / 2 - y, 2) < Math.pow(iconSize / 2, 2);
    }

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

    const sq25 = "M32.048565,-1.29480038e-15 L67.951435,1.29480038e-15 C79.0954192,-7.52316311e-16 83.1364972,1.16032014 87.2105713,3.3391588 C91.2846454,5.51799746 94.4820025,8.71535463 96.6608412,12.7894287 C98.8396799,16.8635028 100,20.9045808 100,32.048565 L100,67.951435 C100,79.0954192 98.8396799,83.1364972 96.6608412,87.2105713 C94.4820025,91.2846454 91.2846454,94.4820025 87.2105713,96.6608412 C83.1364972,98.8396799 79.0954192,100 67.951435,100 L32.048565,100 C20.9045808,100 16.8635028,98.8396799 12.7894287,96.6608412 C8.71535463,94.4820025 5.51799746,91.2846454 3.3391588,87.2105713 C1.16032014,83.1364972 5.01544207e-16,79.0954192 -8.63200256e-16,67.951435 L8.63200256e-16,32.048565 C-5.01544207e-16,20.9045808 1.16032014,16.8635028 3.3391588,12.7894287 C5.51799746,8.71535463 8.71535463,5.51799746 12.7894287,3.3391588 C16.8635028,1.16032014 20.9045808,7.52316311e-16 32.048565,-1.29480038e-15 Z";

    if (size <= 0) size = 1.0

    for (let x = 0; x < nCount; x++) {
        for (let y = 0; y < nCount; y++) {
            if (qrcode.isDark(x, y) === false) continue;

            if (typeTable[x][y] === QRPointType.ALIGN_CENTER || typeTable[x][y] === QRPointType.ALIGN_OTHER || typeTable[x][y] === QRPointType.TIMING) {
                if (type === 0)
                    pointList.push(<rect opacity={opacity} width={size} height={size} key={id++} fill={otherColor} x={x + (1 - size)/2} y={y + (1 - size)/2}/>)
                else if (type === 1)
                    pointList.push(<circle opacity={opacity} r={size / 2} key={id++} fill={otherColor} cx={x + 0.5} cy={y + 0.5}/>)
                else if (type === 2)
                    pointList.push(<circle key={id++} opacity={opacity} fill={otherColor} cx={x + 0.5} cy={y + 0.5} r={size / 2} />)
            }
            else if (typeTable[x][y] === QRPointType.POS_CENTER) {
                if (posType === 0) {
                    pointList.push(<rect width={1} height={1} key={id++} fill={posColor} x={x} y={y}/>);
                } else if (posType === 1) {
                    pointList.push(<circle key={id++} fill={posColor} cx={x + 0.5} cy={y + 0.5} r={1.5} />)
                    pointList.push(<circle key={id++} fill="none" strokeWidth="1" stroke={posColor}  cx={x + 0.5} cy={y + 0.5} r={3} />)
                } else if (posType === 2) {
                    pointList.push(<circle key={id++} fill={posColor} cx={x + 0.5} cy={y + 0.5} r={1.5} />)
                    pointList.push(<circle key={id++} fill="none" strokeWidth="0.15" strokeDasharray="0.5,0.5" stroke={posColor}  cx={x + 0.5} cy={y + 0.5} r={3} />)
                    for (let w = 0; w < vw.length; w++) {
                        pointList.push(<circle key={id++} fill={posColor} cx={x + vw[w] + 0.5} cy={y + 0.5} r={0.5} />)
                    }
                    for (let h = 0; h < vh.length; h++) {
                        pointList.push(<circle key={id++} fill={posColor} cx={x + 0.5} cy={y + vh[h] + 0.5} r={0.5} />)
                    }
                } else if (posType === 3) {
                    pointList.push(<circle key={id++} fill={posColor} cx={x + 0.5} cy={y + 0.5} r={1.5} />)
                    pointList.push(<path key={id++} d={sq25} stroke={posColor} strokeWidth={100/6 * (1 - (1 - size) * 0.75)} fill="none" transform={'translate('+String(x - 2.5)+','+String(y - 2.5)+') ' + 'scale(' + String(6/100) + ',' + String(6/100) + ')'} />)
                }
            }
            else if (typeTable[x][y] === QRPointType.POS_OTHER) {
                if (posType === 0) {
                    pointList.push(<rect width={1} height={1} key={id++} fill={posColor} x={x} y={y}/>);
                }
            }
            else {
                if (type === 0) {
                    pointList.push(<rect opacity={opacity} width={size} height={size} key={id++} fill={otherColor} x={x + (1 - size)/2} y={y + (1 - size)/2}/>)
                } else if (type === 1) {
                    if (!(iconEnabled && nearIcon(x, y))) {}
                    pointList.push(<circle opacity={opacity} r={size / 2} key={id++} fill={otherColor} cx={x + 0.5} cy={y + 0.5}/>)
                } else if (type === 2) {
                    pointList.push(<circle opacity={opacity}  key={id++} fill={otherColor} cx={x + 0.5} cy={y + 0.5} r={0.5 * rand(0.33,1.0)} />)
                }
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
                "圆角矩形",
            ]
        },
        {
            type: ParamTypes.COLOR_EDITOR,
            key: '信息点颜色',
            default: '#000000'
        },
        {
            type: ParamTypes.COLOR_EDITOR,
            key: '定位点颜色',
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
                "圆角矩形",
            ]
        },
        {
            type: ParamTypes.COLOR_EDITOR,
            key: '信息点颜色',
            default: '#000000'
        },
        {
            type: ParamTypes.COLOR_EDITOR,
            key: '定位点颜色',
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
                "圆角矩形",
            ]
        },
        {
            type: ParamTypes.COLOR_EDITOR,
            key: '信息点颜色',
            default: '#000000'
        },
        {
            type: ParamTypes.COLOR_EDITOR,
            key: '定位点颜色',
            default: '#000000'
        }
    ];
}

export const RendererRect = createRenderer({
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

RendererRect.detail = (
    <div>最基本的二维码，也有有趣的玩法</div>
);

RendererRound.detail = (
    <div>大厂喜欢的样式，非常适合在中间放置 Logo</div>
);

RendererRandRound.detail = (
    <div>随机圆点，混乱与秩序。源于 <LinkTrace href="https://ncf.cz-studio.cn/" rel="noopener noreferrer" target="_blank">NCFZ</LinkTrace></div>
);
