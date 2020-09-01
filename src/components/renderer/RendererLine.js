import React  from "react";
import {ParamTypes} from "../../constant/ParamTypes";
import {getTypeTable, QRPointType} from "../../utils/qrcodeHandler";
import {createRenderer} from "../style/Renderer";
import {rand} from "../../utils/util";

function listPoints({ qrcode, params, icon }) {
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

    const sq25 = "M32.048565,-1.29480038e-15 L67.951435,1.29480038e-15 C79.0954192,-7.52316311e-16 83.1364972,1.16032014 87.2105713,3.3391588 C91.2846454,5.51799746 94.4820025,8.71535463 96.6608412,12.7894287 C98.8396799,16.8635028 100,20.9045808 100,32.048565 L100,67.951435 C100,79.0954192 98.8396799,83.1364972 96.6608412,87.2105713 C94.4820025,91.2846454 91.2846454,94.4820025 87.2105713,96.6608412 C83.1364972,98.8396799 79.0954192,100 67.951435,100 L32.048565,100 C20.9045808,100 16.8635028,98.8396799 12.7894287,96.6608412 C8.71535463,94.4820025 5.51799746,91.2846454 3.3391588,87.2105713 C1.16032014,83.1364972 5.01544207e-16,79.0954192 -8.63200256e-16,67.951435 L8.63200256e-16,32.048565 C-5.01544207e-16,20.9045808 1.16032014,16.8635028 3.3391588,12.7894287 C5.51799746,8.71535463 8.71535463,5.51799746 12.7894287,3.3391588 C16.8635028,1.16032014 20.9045808,7.52316311e-16 32.048565,-1.29480038e-15 Z";

    if (size <= 0) size = 1.0

    let available = [];
    let ava2 = [];
    for (let x = 0; x < nCount; x++) {
        available[x] = [];
        ava2[x] = [];
        for (let y = 0; y < nCount; y++) {
            available[x][y] = true;
            ava2[x][y] = true;
        }
    }

    for (let x = 0; x < nCount; x++) {
        for (let y = 0; y < nCount; y++) {
            if (qrcode.isDark(x, y) === false) continue;

            if (typeTable[x][y] === QRPointType.POS_CENTER) {
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
                    if (x === 0 || (x > 0 && (!qrcode.isDark(x - 1, y) || !ava2[x - 1][y]))) {
                        let start = 0;
                        let end = 0;
                        let ctn = true;
                        while (ctn && x + end < nCount) {
                            if (qrcode.isDark(x + end, y) && ava2[x + end][y]) {
                                end++;
                            } else {
                                ctn = false;
                            }
                        }
                        if (end - start > 1) {
                            for (let i = start; i < end; i++) {
                                ava2[x + i][y] = false;
                                available[x + i][y] = false;
                            }
                            pointList.push(<line opacity={opacity} x1={x + 0.5} y1={y + 0.5} x2={x + end - start - 0.5} y2={y + 0.5} strokeWidth={size} stroke={otherColor} strokeLinecap="round" key={id++}/>)
                        }
                    }
                    if (available[x][y]) {
                        pointList.push(<circle opacity={opacity} r={size / 2} key={id++} fill={otherColor} cx={x + 0.5} cy={y + 0.5}/>)
                    }
                }

                if (type === 1) {
                    if (y === 0 || (y > 0 && (!qrcode.isDark(x, y - 1) || !ava2[x][y - 1]))) {
                        let start = 0;
                        let end = 0;
                        let ctn = true;
                        while (ctn && y + end < nCount) {
                            if (qrcode.isDark(x, y + end) && ava2[x][y + end]) {
                                end++;
                            } else {
                                ctn = false;
                            }
                        }
                        if (end - start > 1) {
                            for (let i = start; i < end; i++) {
                                ava2[x][y + i] = false;
                                available[x][y + i] = false;
                            }
                            pointList.push(<line opacity={opacity} x1={x + 0.5} y1={y + 0.5} x2={x + 0.5} y2={y + end - start - 1 + 0.5} strokeWidth={size} stroke={otherColor} strokeLinecap="round" key={id++}/>)
                        }
                    }
                    if (available[x][y]) {
                        pointList.push(<circle opacity={opacity} r={size / 2} key={id++} fill={otherColor} cx={x + 0.5} cy={y + 0.5}/>)
                    }
                }
                if (type === 2) {
                    if (y === 0 || (y > 0 && (!qrcode.isDark(x, y - 1) || !ava2[x][y - 1]))) {
                        let start = 0;
                        let end = 0;
                        let ctn = true;
                        while (ctn && y + end < nCount) {
                            if (qrcode.isDark(x, y + end) && ava2[x][y + end] && end - start <=3) {
                                end++;
                            } else {
                                ctn = false;
                            }
                        }
                        if (end - start > 1) {
                            for (let i = start; i < end; i++) {
                                ava2[x][y + i] = false;
                                available[x][y + i] = false;
                            }
                            pointList.push(<line opacity={opacity} x1={x + 0.5} y1={y + 0.5} x2={x + 0.5} y2={y + end - start - 1 + 0.5} strokeWidth={size} stroke={otherColor} strokeLinecap="round" key={id++}/>)
                        }
                    }
                    if (x === 0 || (x > 0 && (!qrcode.isDark(x - 1, y) || !ava2[x - 1][y]))) {
                        let start = 0;
                        let end = 0;
                        let ctn = true;
                        while (ctn && x + end < nCount) {
                            if (qrcode.isDark(x + end, y) && ava2[x + end][y] && end - start <=3) {
                                end++;
                            } else {
                                ctn = false;
                            }
                        }
                        if (end - start > 1) {
                            for (let i = start; i < end; i++) {
                                ava2[x + i][y] = false;
                                available[x + i][y] = false;
                            }
                            pointList.push(<line opacity={opacity} x1={x + 0.5} y1={y + 0.5} x2={x + end - start - 0.5} y2={y + 0.5} strokeWidth={size} stroke={otherColor} strokeLinecap="round" key={id++}/>)
                        }
                    }
                    if (available[x][y]) {
                        pointList.push(<circle opacity={opacity} r={size / 2} key={id++} fill={otherColor} cx={x + 0.5} cy={y + 0.5}/>)
                    }
                }

                if (type === 3) {
                    if (x > y ^ x + y < nCount) {
                        if (y === 0 || (y > 0 && (!qrcode.isDark(x, y - 1) || !ava2[x][y - 1]))) {
                            let start = 0;
                            let end = 0;
                            let ctn = true;
                            while (ctn && y + end < nCount) {
                                if (qrcode.isDark(x, y + end) && ava2[x][y + end] && end - start <=3) {
                                    end++;
                                } else {
                                    ctn = false;
                                }
                            }
                            if (end - start > 1) {
                                for (let i = start; i < end; i++) {
                                    ava2[x][y + i] = false;
                                    available[x][y + i] = false;
                                }
                                pointList.push(<line opacity={opacity} x1={x + 0.5} y1={y + 0.5} x2={x + 0.5} y2={y + end - start - 1 + 0.5} strokeWidth={size} stroke={otherColor} strokeLinecap="round" key={id++}/>)
                            }
                        }
                    } else {
                        if (x === 0 || (x > 0 && (!qrcode.isDark(x - 1, y) || !ava2[x - 1][y]))) {
                            let start = 0;
                            let end = 0;
                            let ctn = true;
                            while (ctn && x + end < nCount) {
                                if (qrcode.isDark(x + end, y) && ava2[x + end][y] && end - start <=3) {
                                    end++;
                                } else {
                                    ctn = false;
                                }
                            }
                            if (end - start > 1) {
                                for (let i = start; i < end; i++) {
                                    ava2[x + i][y] = false;
                                    available[x + i][y] = false;
                                }
                                pointList.push(<line opacity={opacity} x1={x + 0.5} y1={y + 0.5} x2={x + end - start - 0.5} y2={y + 0.5} strokeWidth={size} stroke={otherColor} strokeLinecap="round" key={id++}/>)
                            }
                        }
                    }
                    if (available[x][y]) {
                        pointList.push(<circle opacity={opacity} r={size / 2} key={id++} fill={otherColor} cx={x + 0.5} cy={y + 0.5}/>)
                    }
                }
                if (type === 4) {
                    if (y === 0 || x === 0 || ((y > 0 && x > 0) && (!qrcode.isDark(x - 1, y - 1) || !ava2[x - 1][y - 1]))) {
                        let start = 0;
                        let end = 0;
                        let ctn = true;
                        while (ctn && y + end < nCount && x + end < nCount) {
                            if (qrcode.isDark(x + end, y + end) && ava2[x + end][y + end]) {
                                end++;
                            } else {
                                ctn = false;
                            }
                        }
                        if (end - start > 1) {
                            for (let i = start; i < end; i++) {
                                ava2[x + i][y + i] = false;
                                available[x + i][y + i] = false;
                            }
                            pointList.push(<line opacity={opacity} x1={x + 0.5} y1={y + 0.5} x2={x + end - start - 1 + 0.5} y2={y + end - start - 1 + 0.5} strokeWidth={size} stroke={otherColor} strokeLinecap="round" key={id++}/>)
                        }
                    }
                    if (available[x][y]) {
                        pointList.push(<circle opacity={opacity} r={size / 2} key={id++} fill={otherColor} cx={x + 0.5} cy={y + 0.5}/>)
                    }
                }
                if (type === 5) {
                    if (x === 0 || y === nCount - 1 || ((x > 0 && y < nCount - 1) && (!qrcode.isDark(x - 1, y + 1) || !ava2[x - 1][y + 1]))) {
                        let start = 0;
                        let end = 0;
                        let ctn = true;
                        while (ctn && x + end < nCount  && y - end >= 0) {
                            if (qrcode.isDark(x + end, y - end) && available[x + end][y - end]) {
                                end++;
                            } else {
                                ctn = false;
                            }
                        }
                        if (end - start > 1) {
                            for (let i = start; i < end; i++) {
                                ava2[x + i][y - i] = false;
                                available[x + i][y - i] = false;
                            }
                            pointList.push(<line opacity={opacity} x1={x + 0.5} y1={y + 0.5} x2={x + (end - start - 1) + 0.5} y2={y - (end - start - 1) + 0.5} strokeWidth={size} stroke={otherColor} strokeLinecap="round" key={id++}/>)
                        }
                    }
                    if (available[x][y]) {
                        pointList.push(<circle opacity={opacity} r={size / 2} key={id++} fill={otherColor} cx={x + 0.5} cy={y + 0.5}/>)
                    }
                }
                if (type === 6) {
                    if (x === 0 || y === nCount - 1 || ((x > 0 && y < nCount - 1) && (!qrcode.isDark(x - 1, y + 1) || !ava2[x - 1][y + 1]))) {
                        let start = 0;
                        let end = 0;
                        let ctn = true;
                        while (ctn && x + end < nCount  && y - end >= 0) {
                            if (qrcode.isDark(x + end, y - end) && ava2[x + end][y - end]) {
                                end++;
                            } else {
                                ctn = false;
                            }
                        }
                        if (end - start > 1) {
                            for (let i = start; i < end; i++) {
                                ava2[x + i][y - i] = false;
                            }
                            pointList.push(<line opacity={opacity} x1={x + 0.5} y1={y + 0.5} x2={x + (end - start - 1) + 0.5} y2={y - (end - start - 1) + 0.5} strokeWidth={size / 2 * rand(0.3,1)} stroke={otherColor} strokeLinecap="round" key={id++}/>)
                        }
                    }
                    if (y === 0 || x === 0 || ((y > 0 && x > 0) && (!qrcode.isDark(x - 1, y - 1) || !available[x - 1][y - 1]))) {
                        let start = 0;
                        let end = 0;
                        let ctn = true;
                        while (ctn && y + end < nCount && x + end < nCount) {
                            if (qrcode.isDark(x + end, y + end) && available[x + end][y + end]) {
                                end++;
                            } else {
                                ctn = false;
                            }
                        }
                        if (end - start > 1) {
                            for (let i = start; i < end; i++) {
                                available[x + i][y + i] = false;
                            }
                            pointList.push(<line opacity={opacity} x1={x + 0.5} y1={y + 0.5} x2={x + end - start - 1 + 0.5} y2={y + end - start - 1 + 0.5} strokeWidth={size / 2 * rand(0.3,1)} stroke={otherColor} strokeLinecap="round" key={id++}/>)
                        }
                    }
                    pointList.push(<circle opacity={opacity} r={0.5 * rand(0.33,0.9)} key={id++} fill={otherColor} cx={x + 0.5} cy={y + 0.5}/>)
                }
            }
        }
    }

    return pointList;
}

function getParamInfoLine() {
    return [
        {
            type: ParamTypes.SELECTOR,
            key: '连线方向',
            default: 2,
            choices: [
                "左右",
                "上下",
                "纵横",
                "回环",
                "左上 — 右下",
                "右上 — 左下",
                "交叉"
            ]
        },
        {
            type: ParamTypes.TEXT_EDITOR,
            key: '连线粗细',
            default: 50
        },
        {
            type: ParamTypes.TEXT_EDITOR,
            key: '连线不透明度',
            default: 100,
        },
        {
            type: ParamTypes.SELECTOR,
            key: '定位点样式',
            default: 3,
            choices: [
                "矩形",
                "圆形",
                "行星",
                "圆角矩形",
            ]
        },
        {
            type: ParamTypes.COLOR_EDITOR,
            key: '连线颜色',
            default: '#000000'
        },
        {
            type: ParamTypes.COLOR_EDITOR,
            key: '定位点颜色',
            default: '#000000'
        }
    ];
}

function getParamInfoLine2() {
    return [
        {
            type: ParamTypes.SELECTOR,
            key: '连线方向',
            default: 6,
            choices: [
                "左右",
                "上下",
                "纵横",
                "回环",
                "左上 — 右下",
                "右上 — 左下",
                "交叉"
            ]
        },
        {
            type: ParamTypes.TEXT_EDITOR,
            key: '连线粗细',
            default: 50
        },
        {
            type: ParamTypes.TEXT_EDITOR,
            key: '连线不透明度',
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
            key: '连线颜色',
            default: '#000000'
        },
        {
            type: ParamTypes.COLOR_EDITOR,
            key: '定位点颜色',
            default: '#000000'
        }
    ];
}

export const RendererLine= createRenderer({
    listPoints: listPoints,
    getParamInfo: getParamInfoLine,
});

export const RendererLine2= createRenderer({
    listPoints: listPoints,
    getParamInfo: getParamInfoLine2,
});

RendererLine.detail = (
    <div>连连看，可选方向</div>
);

RendererLine2.detail = (
    <div>交错相连</div>
);
