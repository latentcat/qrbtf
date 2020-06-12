import { qrcode as QRCodeEncoder } from "./qrcodeEncoder";
import jsQR from "jsqr";
import { extend } from "./util";

export var QRPointType = {
    DATA: 0,
    POS_CENTER: 1,
    POS_OTHER: 2,
    ALIGN_CENTER: 3,
    ALIGN_OTHER: 4,
    TIMING: 5,
    FORMAT: 6,
    VERSION: 7
}

export function encodeData(options) {
    if (!options.text || options.text.length <= 0) return null

    options = extend({
        render		: "canvas",
        width		: 256,
        height		: 256,
        typeNumber	: -1,
        correctLevel	: 1,
        background      : "#ffffff",
        foreground      : "#000000"
    }, options);

    let qrcode = new QRCodeEncoder(options.typeNumber, options.correctLevel)
    qrcode.addData(options.text)
    qrcode.make()

    return qrcode;
}

export function getTypeTable(qrcode) {
    const nCount = qrcode.getModuleCount();
    const position = qrcode.getPositionTable();
    const PD = [[3, 3], [3, nCount - 4], [nCount - 4, 3]];

    let typeTable = new Array(nCount);
    for (let i = 0; i < nCount; i++) typeTable[i] = new Array(nCount);

    for (let i = 8; i < nCount - 7; i++) {
        typeTable[i][6] = typeTable[6][i] = QRPointType.TIMING;
    }

    for (let i = 0; i < position.length; i++) {
        typeTable[position[i][0]][position[i][1]] = QRPointType.ALIGN_CENTER;
        for (let r = -2; r <= 2; r++) {
            for (let c = -2; c <= 2; c++) {
                if (!(r === 0 && c === 0))
                    typeTable[position[i][0] + r][position[i][1] + c] = QRPointType.ALIGN_OTHER;
            }
        }
    }

    for (let i = 0; i < PD.length; i++) {
        typeTable[PD[i][0]][PD[i][1]] = QRPointType.POS_CENTER
        for (let r = -4; r <= 4; r++) {
            for (let c = -4; c <= 4; c++) {
                if (PD[i][0] + r >= 0 && PD[i][0] + r < nCount && PD[i][1] + c >=0 && PD[i][1] + c < nCount)
                    if (!(r === 0 && c === 0))
                        typeTable[PD[i][0] + r][PD[i][1] + c] = QRPointType.POS_OTHER;
            }
        }
    }

    for (let i = 0; i <= 8; i++) {
        if (i !== 6) typeTable[i][8] = typeTable[8][i] = QRPointType.FORMAT;
        if (i < 7) typeTable[nCount - i - 1][8] = QRPointType.FORMAT;
        if (i < 8) typeTable[8][nCount - i - 1] = QRPointType.FORMAT;
    }

    for (let i = nCount - 11; i <= nCount - 9; i++) {
        for (let j = 0; j <= 5; j++) {
            typeTable[i][j] = typeTable[j][i] = QRPointType.VERSION;
        }
    }

    for (let i = 0; i < nCount; i++) {
        for (let j = 0; j < nCount; j++) {
            if (!typeTable[i][j]) typeTable[i][j] = QRPointType.DATA;
        }
    }
    return typeTable;
}

export function decodeData(file) {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    let img = document.createElement('img');
    const maxSize = 400;

    img.setAttribute('src', URL.createObjectURL(file));
    return new Promise((resolve) => {
        img.onload = () => {
            let rate = Math.min(img.width, img.height) / maxSize;

            canvas.width = img.width / rate;
            canvas.height = img.height / rate;

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            let result = jsQR(
                ctx.getImageData(0, 0, canvas.width, canvas.height).data, canvas.width, canvas.height);
            resolve(result);
        };
    })
}
