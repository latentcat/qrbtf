import QRCode from "./qrcode";

function extend(target, options) {
    for (let name in options) {
        target[name] = options[name]
    }
    return target
}

export function getQrcodeData(options) {
    if (!options.text || options.text.length <= 0) return null

    options = extend({
        render		: "canvas",
        width		: 256,
        height		: 256,
        typeNumber	: -1,
        correctLevel	: 0,
        background      : "#ffffff",
        foreground      : "#000000"
    }, options);

    let qrcode = new QRCode(options.typeNumber, options.correctLevel)
    qrcode.addData(options.text)
    qrcode.make()

    return qrcode;
}

