import React  from "react";
import {ParamTypes} from "../../constant/ParamTypes";
import {createRenderer} from "../style/Renderer";
import {defaultImage} from "../../constant/References";

function listPoints({ qrcode, params, icon }) {
    if (!qrcode) return []

    const nCount = qrcode.getModuleCount();
    const pointList = new Array(nCount);

    let color = params[1];
    let opacity = params[2] / 100;
    let id = 0;

    pointList.push(<image key={id++} x="-0.01" y="-0.01" width={nCount + 0.02} height={nCount + 0.02} xlinkHref={params[0]}/>);
    pointList.push(<rect key={id++} x="-0.01" y="-0.01" width={nCount + 0.02} height={nCount + 0.02} fill={color} opacity={opacity}/>);

    for (let x = 0; x < nCount; x++) {
        for (let y = 0; y < nCount; y++) {
            if (!qrcode.isDark(x, y)) {
                pointList.push(<rect width={1.02} height={1.02} key={id++} fill="#FFF" x={x - 0.01} y={y - 0.01}/>);
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
            default: defaultImage,
        },
        {
            type: ParamTypes.COLOR_EDITOR,
            key: '覆盖颜色',
            default: '#000000'
        },
        {
            type: ParamTypes.TEXT_EDITOR,
            key: '覆盖不透明度',
            default: 10,
        },
    ];
}

const RendererImageFill = createRenderer({
    listPoints: listPoints,
    getParamInfo: getParamInfo,
})


export default RendererImageFill

RendererImageFill.detail = (
    <div>图像填充</div>
);
