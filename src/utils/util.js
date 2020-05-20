import {ParamTypes} from "../constant/ParamTypes";
let seed = 0;

const fileTypes =[
    'image/jpeg',
    'image/pjpeg',
    'image/png'
]

export function isPicture(file) {
    return fileTypes.includes(file.type);
}


export function srand(sd) {
    seed = sd;
}

export function rand(min, max) {
    seed = (seed * 9301 + 49297) % 233280;
    return min + (seed / 233280.0) * (max - min);
}

export function randRGB(minR, maxR, minG, maxG, minB, maxB) {
    return 'rgb(' + parseInt(minR, maxR) + ',' + parseInt(minG, maxG) + ',' + parseInt(minB, maxB) + ')';
}

export function defaultViewBox(qrcode) {
    if (!qrcode) return '0 0 0 0';

    const nCount = qrcode.getModuleCount();
    return String(-nCount / 5) + ' ' + String(-nCount / 5) + ' ' + String(nCount + nCount / 5 * 2) + ' ' + String(nCount + nCount / 5 * 2);
}

export function fillEmptyWith(arr, value) {
    for (let i = 0; i < arr.length; i++)
        if (!arr[i]) arr[i] = value;
    return arr;
}

export function isWeiXin(){
    const ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}

export function isPC() {
    const userAgentInfo = navigator.userAgent;
    const Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    let flag = true;
    for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

export function getParamDetailedValue(item, paramValue) {
    if (item.type == ParamTypes.SELECTOR) return item.choices[paramValue];
    return paramValue;
}

export function outerHtml(selectedIndex) {
    return document.getElementsByClassName('Qr-item-svg')[selectedIndex].outerHTML;
}

export function gamma(r, g, b) {
    return Math.pow((Math.pow(r, 2.2) + Math.pow(1.5 * g, 2.2) + Math.pow(0.6 * b, 2.2)) / (1 + Math.pow(1.5, 2.2) + Math.pow(0.6, 2.2)), 1/2.2)
}

export function getExactValue(value, defaultValue) {
    if (typeof value != "string") return value;
    if (value.length <= 0) value = defaultValue;
    if (!isNaN(value)) value = parseInt(value);
    return value;
}

export function extend(target, options) {
    for (let name in options) {
        target[name] = options[name]
    }
    return target
}

export function toBase64(file, width, height) {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    let img = document.createElement('img');

    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    img.setAttribute('src', URL.createObjectURL(file));

    return new Promise(resolve => {
        img.onload = () => {
            ctx.fillStyle = 'white'
            ctx.fillRect(0, 0, width, height)
            ctx.drawImage(img, 0, 0, width, height);

            resolve(canvas.toDataURL(file.type, 0.9));
        };
    })
}
