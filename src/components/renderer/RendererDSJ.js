import React from "react";
import {ParamTypes} from "../../constant/ParamTypes";
import {getTypeTable, QRPointType} from "../../utils/qrcodeHandler";
import {createRenderer} from "../style/Renderer";
import LinkTrace from "../link/LinkTrace";

function listPoints({ qrcode, params, icon }) {
    if (!qrcode) return []

    const nCount = qrcode.getModuleCount();
    const typeTable = getTypeTable(qrcode);
    const pointList = [];
    const g1 = [];
    const g2 = [];

    let width2 = params[0] / 100;
    let width1 = params[1] / 100;
    let width3 = params[2] / 100;
    let posType = params[3];
    let id = 0;

    if (width2 <= 0) width2 = 70;
    if (width1 <= 0) width1 = 70;

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

    for (let y = 0; y < nCount; y++) {
        for (let x = 0; x < nCount; x++) {
            if (qrcode.isDark(x, y) === false) continue;

            else if (typeTable[x][y] === QRPointType.POS_CENTER) {
                if (posType === 0) {
                    pointList.push(<rect width={1} height={1} key={id++} fill="#0B2D97" x={x} y={y}/>);
                } else if (posType === 1) {
                    pointList.push(<rect width={3 - (1 - width3)} height={3 - (1 - width3)} key={id++} fill="#0B2D97" x={x - 1 + (1 - width3)/2} y={y - 1 + (1 - width3)/2}/>);
                    pointList.push(<rect width={width3} height={3 - (1 - width3)} key={id++} fill="#0B2D97" x={x - 3 + (1 - width3)/2} y={y - 1 + (1 - width3)/2}/>);
                    pointList.push(<rect width={width3} height={3 - (1 - width3)} key={id++} fill="#0B2D97" x={x + 3 + (1 - width3)/2} y={y - 1 + (1 - width3)/2}/>);
                    pointList.push(<rect width={3 - (1 - width3)} height={width3} key={id++} fill="#0B2D97" x={x - 1 + (1 - width3)/2} y={y - 3 + (1 - width3)/2}/>);
                    pointList.push(<rect width={3 - (1 - width3)} height={width3} key={id++} fill="#0B2D97" x={x - 1 + (1 - width3)/2} y={y + 3 + (1 - width3)/2}/>);
                }
            }
            else if (typeTable[x][y] === QRPointType.POS_OTHER) {
                if (posType === 0) {
                    pointList.push(<rect width={1} height={1} key={id++} fill="#0B2D97" x={x} y={y}/>);
                }
            }
            else {
                if (available[x][y] && ava2[x][y]  && x < nCount - 2 && y < nCount - 2) {
                    let ctn = true;
                    for (let i = 0; i < 3; i++) {
                        for (let j = 0; j < 3; j++) {
                            if (ava2[x + i][y + j] === false) {
                                ctn = false;
                            }
                        }
                    }
                    if (ctn && qrcode.isDark(x + 2, y) && qrcode.isDark(x + 1, y + 1) && qrcode.isDark(x, y + 2) && qrcode.isDark(x + 2, y + 2)) {
                        g1.push(<line key={id++} x1={x + width1 / Math.sqrt(8)} y1={y + width1 / Math.sqrt(8)} x2={x + 3 - width1 / Math.sqrt(8)} y2={y + 3 - width1 / Math.sqrt(8)} fill="none" stroke="#0B2D97" strokeWidth={width1} />)
                        g1.push(<line key={id++} x1={x + 3 - width1 / Math.sqrt(8)} y1={y + width1 / Math.sqrt(8)} x2={x + width1 / Math.sqrt(8)} y2={y + 3 - width1 / Math.sqrt(8)} fill="none" stroke="#0B2D97" strokeWidth={width1} />)
                        available[x][y] = false;
                        available[x + 2][y] = false;
                        available[x][y + 2] = false;
                        available[x + 2][y + 2] = false;
                        available[x + 1][y + 1] = false;
                        for (let i = 0; i < 3; i++) {
                            for (let j = 0; j < 3; j++) {
                                ava2[x + i][y + j] = false;
                            }
                        }
                    }
                }
                if (available[x][y] && ava2[x][y] && x < nCount - 1 && y < nCount - 1) {
                    let ctn = true;
                    for (let i = 0; i < 2; i++) {
                        for (let j = 0; j < 2; j++) {
                            if (ava2[x + i][y + j] === false) {
                                ctn = false;
                            }
                        }
                    }
                    if (ctn && qrcode.isDark(x + 1, y) && qrcode.isDark(x, y + 1) && qrcode.isDark(x + 1, y + 1)) {
                        g1.push(<line key={id++} x1={x + width1 / Math.sqrt(8)} y1={y + width1 / Math.sqrt(8)} x2={x + 2 - width1 / Math.sqrt(8)} y2={y + 2 - width1 / Math.sqrt(8)} fill="none" stroke="#0B2D97" strokeWidth={width1} />)
                        g1.push(<line key={id++} x1={x + 2 - width1 / Math.sqrt(8)} y1={y + width1 / Math.sqrt(8)} x2={x + width1 / Math.sqrt(8)} y2={y + 2 - width1 / Math.sqrt(8)} fill="none" stroke="#0B2D97" strokeWidth={width1} />)
                        for (let i = 0; i < 2; i++) {
                            for (let j = 0; j < 2; j++) {
                                available[x + i][y + j] = false;
                                ava2[x + i][y + j] = false;
                            }
                        }
                    }
                }
                if (available[x][y] && ava2[x][y]) {
                    if (y === 0 || (y > 0 && (!qrcode.isDark(x, y - 1) || !ava2[x][y - 1]))) {
                        let start = y;
                        let end = y;
                        let ctn = true;
                        while (ctn && end < nCount) {
                            if (qrcode.isDark(x, end) && ava2[x][end]) {
                                end++;
                            } else {
                                ctn = false;
                            }
                        }
                        if (end - start > 2) {
                            for (let i = start; i < end; i++) {
                                ava2[x][i] = false;
                                available[x][i] = false;
                            }
                            g2.push(<rect width={width2} height={end - start - 1 - (1 - width2)} key={id++} fill="#E02020" x={x + (1 - width2)/2} y={y + (1 - width2)/2}/>)
                            g2.push(<rect width={width2} height={width2} key={id++} fill="#E02020" x={x + (1 - width2)/2} y={end - 1 + (1 - width2)/2}/>)
                        }
                    }
                }
                if (available[x][y] && ava2[x][y]) {
                    if (x === 0 || (x > 0 && (!qrcode.isDark(x - 1, y) || !ava2[x - 1][y]))) {
                        let start = x;
                        let end = x;
                        let ctn = true;
                        while (ctn && end < nCount) {
                            if (qrcode.isDark(end, y) && ava2[end][y]) {
                                end++;
                            } else {
                                ctn = false;
                            }
                        }
                        if (end - start > 1) {
                            for (let i = start; i < end; i++) {
                                ava2[i][y] = false;
                                available[i][y] = false;
                            }
                            g2.push(<rect width={end - start - (1 - width2)} height={width2} key={id++} fill="#F6B506" x={x + (1 - width2)/2} y={y + (1 - width2)/2}/>)
                        }
                    }
                }
                if (available[x][y]) {
                    pointList.push(<rect width={width2} height={width2} key={id++} fill="#F6B506" x={x + (1 - width2)/2} y={y + (1 - width2)/2}/>)
                }


            }
        }
    }

    for (let i = 0; i < g1.length; i++) {
        pointList.push(g1[i]);
    }
    for (let i = 0; i < g2.length; i++) {
        pointList.push(g2[i]);
    }

    return pointList;
}

function getParamInfo() {
    return [
        {
            type: ParamTypes.TEXT_EDITOR,
            key: '信息点缩放',
            default: 70,
        },
        {
            type: ParamTypes.TEXT_EDITOR,
            key: 'x 宽度',
            default: 70,
        },
        {
            type: ParamTypes.TEXT_EDITOR,
            key: '定位点宽度',
            default: 90,
        },
        {
            type: ParamTypes.SELECTOR,
            key: '定位点样式',
            default: 1,
            choices: [
                "矩形",
                "DSJ",
            ]
        },
    ]
}

const RenderDSJ = createRenderer({
    listPoints: listPoints,
    getParamInfo: getParamInfo,
})

RenderDSJ.detail = (
    <div>复刻了 DSJ 的 <LinkTrace href="https://qrbtf.com/img/dsj.jpg" rel="noopener noreferrer" target="_blank">手工作品</LinkTrace>，向时代致敬</div>
);

export default RenderDSJ
