import QRCode from "./qrcode";

function extend(target, options) {
    for (let name in options) {
        target[name] = options[name]
    }
    return target
}

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

export function getQrcodeData(options) {
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

    let qrcode = new QRCode(options.typeNumber, options.correctLevel)
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
                if (!(r == 0 && c == 0))
                    typeTable[position[i][0] + r][position[i][1] + c] = QRPointType.ALIGN_OTHER;
            }
        }
    }

    for (let i = 0; i < PD.length; i++) {
        typeTable[PD[i][0]][PD[i][1]] = QRPointType.POS_CENTER
        for (let r = -3; r <= 3; r++) {
            for (let c = -3; c <= 3; c++) {
                if (!(r == 0 && c == 0))
                    typeTable[PD[i][0] + r][PD[i][1] + c] = QRPointType.POS_OTHER;
            }
        }
    }

    for (let i = 0; i <= 8; i++) {
        if (i != 6) typeTable[i][8] = typeTable[8][i] = QRPointType.FORMAT;
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
