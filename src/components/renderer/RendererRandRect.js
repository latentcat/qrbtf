import React from "react";
import {rand} from "../../utils/util";
import {createRenderer} from "../style/Renderer";

function listPoints({ qrcode, params, icon }) {
    if (!qrcode) return []

    const nCount = qrcode.getModuleCount();
    const pointList = [];
    let id = 0;

    let randArr = [];
    for (let row = 0; row < nCount; row++) {
        for (let col = 0; col < nCount; col++) {
            randArr.push([row,col]);
        }
    }
    randArr.sort(function() {
        return (0.5-Math.random());
    })

    for (let i = 0; i < randArr.length; i++) {
        let row = randArr[i][0];
        let col = randArr[i][1];
        if (qrcode.isDark(row, col)) {
            let tempRand = rand(0.8, 1.3);
            let randNum = rand(50,230);
            let tempRGB = [
                'rgb(' + Math.floor(20 + randNum) + ',' + Math.floor(170 - randNum / 2) + ',' + Math.floor(60 + randNum * 2) + ')',
                'rgb(' + Math.floor(-20 + randNum) + ',' + Math.floor(130 - randNum / 2) + ',' + Math.floor(20 + randNum * 2) + ')'
            ];
            let width = 0.15;
            pointList.push(<rect key={id++} opacity="0.9" fill={tempRGB[1]} width={1 * tempRand + width} height={1 * tempRand + width} x={row - (tempRand - 1)/2} y={col - (tempRand - 1)/2}/>);
            pointList.push(<rect key={id++} fill={tempRGB[0]} width={1 * tempRand} height={1 * tempRand} x={row - (tempRand - 1)/2} y={col - (tempRand - 1)/2}/>);
        }
    }
    return pointList;
}

function getParamInfo() {
    return []
}

const RendererRandRect = createRenderer({
    listPoints: listPoints,
    getParamInfo: getParamInfo
})

export default RendererRandRect

RendererRandRect.detail = (
    <div>有一点点骚的配色，很适合你</div>
);
