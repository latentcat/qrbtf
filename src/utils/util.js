import {ParamTypes} from "../constant/ParamTypes";
import React from "react";

let seed = 0;

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

export function getParamDetailedValue(item, paramValue) {
    if (item.type == ParamTypes.SELECTOR) return item.choices[paramValue];
    return paramValue;
}

export function gamma(r, g, b) {
    return Math.pow((Math.pow(r, 2.2) + Math.pow(1.5 * g, 2.2) + Math.pow(0.6 * b, 2.2)) / (1 + Math.pow(1.5, 2.2) + Math.pow(0.6, 2.2)), 1/2.2)
}

export function getGrayPointList(imgBase64, size, black, white) {
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
                    if (Math.random() <= gray / 255) gpl.push(<use key={"g_" + x + "_" + y} x={x} y={y} xlinkHref={white} />);
                    else gpl.push(<use key={"g_" + x + "_" + y} x={x} y={y} xlinkHref={black} />);
                }
            }
            resolve(gpl);
        }
    })
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

            resolve(canvas.toDataURL(file.type, 0.8));
        };
    })
}
