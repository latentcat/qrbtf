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

export function defaultRenderer(qrcode, points) {
    return (
        <svg className="Qr-item-svg" width="100%" height="100%" viewBox={defaultViewBox(qrcode)} fill="white"
             xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            {points}
        </svg>
    );
}

export function isWeiXin(){
    const ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}
