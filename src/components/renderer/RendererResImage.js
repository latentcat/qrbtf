import React, {useEffect, useMemo, useState} from "react";
import {gamma} from "../../utils/util";
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
            const posX = 3 * x, posY = 3 * y;
            if (typeTable[x][y] == QRPointType.ALIGN_CENTER || typeTable[x][y] == QRPointType.ALIGN_OTHER || typeTable[x][y] == QRPointType.TIMING) {
                if (qrcode.isDark(x, y)) {
                    pointList.push(<use key={id++} xlinkHref="#S-black" x={posX + 1} y={posY + 1}/>)
                } else {
                    pointList.push(<use key={id++} xlinkHref="#S-white" x={posX + 1} y={posY + 1}/>)
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
                    pointList.push(<use key={id++} xlinkHref="#S-black" x={posX + 1} y={posY + 1}/>)
                } else {
                    pointList.push(<use key={id++} xlinkHref="#S-white" x={posX + 1} y={posY + 1}/>)
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

function getGrayPointList(imgBase64, size, black, white) {
    console.log(1)

    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    let img = document.createElement('img');
    let gpl = [];
    canvas.style.imageRendering = 'pixelated';
    size *= 3;

    img.src = imgBase64;
    return new Promise(resolve => {
        img.onload = () => {
            canvas.width = size;
            canvas.height = size;
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(img, 0, 0, size, size);

            for (let x = 0; x < canvas.width; x++) {
                for (let y = 0; y < canvas.height; y++) {
                    let imageData = ctx.getImageData(x, y, 1, 1);
                    let data = imageData.data;
                    let gray = gamma(data[0], data[1], data[2]);
                    if (Math.random() > gray / 255) gpl.push(<use key={"g_" + x + "_" + y} x={x} y={y} xlinkHref={black} />);
                }
            }
            resolve(gpl);
        }
    })
}

const RendererResImage = ({qrcode, params, setParamInfo}) => {
    useEffect(() => {
        setParamInfo(getParamInfo());
    }, [setParamInfo]);

    const [gpl, setGPL] = useState([]);
    useMemo(() => {
        getGrayPointList(params[0], qrcode.getModuleCount(), "#S-black", "#S-white").then(res => setGPL(res));
    }, [setGPL, params[0], qrcode])

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
