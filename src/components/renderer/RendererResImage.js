import React, {useEffect, useState} from "react";
import {getGrayPointList, rand} from "../../utils/util";
import {ParamTypes} from "../../constant/ParamTypes";
import {getTypeTable, QRPointType} from "../../utils/qrcodeHandler";

function listPoints(qrcode, params) {
    if (!qrcode) return []

    const nCount = qrcode.getModuleCount();
    const typeTable = getTypeTable(qrcode);
    const pointList = new Array(nCount);

    let id = 0;
    for (let x = 0; x < nCount; x++) {
        for (let y = 0; y < nCount; y++) {
            const posX = 3 * x + 1, posY = 3 * y + 1;
            if (typeTable[x][y] == QRPointType.ALIGN_CENTER || typeTable[x][y] == QRPointType.ALIGN_OTHER || typeTable[x][y] == QRPointType.TIMING) {
                if (qrcode.isDark(x, y)) {
                    pointList.push(<use key={id++} xlinkHref="#B-black" x={posX} y={posY}/>)
                } else {
                    pointList.push(<use key={id++} xlinkHref="#B-white" x={posX} y={posY}/>)
                }
            } else if (typeTable[x][y] == QRPointType.POS_CENTER) {
                if (qrcode.isDark(x, y)) {
                    pointList.push(<use key={id++} xlinkHref="#B-black" x={posX} y={posY}/>)
                }
            } else if (typeTable[x][y] == QRPointType.POS_OTHER) {
                if (qrcode.isDark(x, y)) {
                    pointList.push(<use key={id++} xlinkHref="#B-black" x={posX} y={posY}/>)
                } else {
                    pointList.push(<use key={id++} xlinkHref="#B-white" x={posX} y={posY}/>)
                }
            } else {
                if (qrcode.isDark(x, y)) {
                    pointList.push(<use key={id++} xlinkHref="#S-black" x={posX} y={posY}/>)
                } else {
                    pointList.push(<use key={id++} xlinkHref="#S-white" x={posX} y={posY}/>)
                }
            }
        }
    }

    return pointList;
}

function getParamInfo() {
    return [
        {
            type: ParamTypes.UPLOAD_BUTTON,
            key: '背景图片',
            default: 0,
        }
    ];
}

export function getViewBox(qrcode) {
    if (!qrcode) return '0 0 0 0';

    const nCount = qrcode.getModuleCount() * 3;
    return String(-nCount / 5) + ' ' + String(-nCount / 5) + ' ' + String(nCount + nCount / 5 * 2) + ' ' + String(nCount + nCount / 5 * 2);
}

const RendererResImage = ({qrcode, params, setParamInfo}) => {
    useEffect(() => {
        setParamInfo(getParamInfo());
    }, [setParamInfo]);

    const [gpl, setGPL] = useState([]);
    useEffect(() => {
        getGrayPointList(params[0], qrcode.getModuleCount(), "#B-black", "#B-white").then(res => setGPL(res));
    }, [params[0]])

    return (
        <svg className="Qr-item-svg" width="100%" height="100%" viewBox={getViewBox(qrcode)} fill="white"
             xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <defs>
                <rect id="B-black" fill="black" width={3} height={3}/>
                <rect id="B-white" fill="white" width={3} height={3}/>
                <rect id="S-black" fill="black" width={1} height={1}/>
                <rect id="S-white" fill="white" width={1} height={1}/>
            </defs>

            {gpl.concat(listPoints(qrcode, params))}
        </svg>
    )
}

export default RendererResImage
