import React from "react";
import {ParamTypes} from "../../constant/ParamTypes";
import {getTypeTable, QRPointType} from "../../utils/qrcodeHandler";
import {createRenderer} from "../style/Renderer";
import {getExactValue, getIdNum} from "../../utils/util";

const X = [ Math.sqrt(3)/2, 1/2];
const Y = [-Math.sqrt(3)/2, 1/2];
const Z = [0, 0];

const matrixString = 'matrix(' + String(X[0]) + ', ' + String(X[1]) + ', ' + String(Y[0]) + ', ' + String(Y[1]) + ', ' + String(Z[0]) + ', ' + String(Z[1]) + ')'

function listPoints({ qrcode, params, icon }) {
    if (!qrcode) return []

    const nCount = qrcode.getModuleCount();
    const typeTable = getTypeTable(qrcode);
    const pointList = new Array(nCount);

    let size = 1.001;
    let size2 = 1.001;
    let height = params[0];
    let height2 = params[1];
    let upColor = params[2];
    let leftColor = params[3];
    let rightColor = params[4];
    let id = 0;

    if (height <= 0) height = 1.0;
    if (height2 <= 0) height2 = 1.0;

    for (let x = 0; x < nCount; x++) {
        for (let y = 0; y < nCount; y++) {
            if (qrcode.isDark(x, y) === false) continue;
            else if (typeTable[x][y] === QRPointType.POS_OTHER || typeTable[x][y] === QRPointType.POS_CENTER) {
                pointList.push(<rect width={size2} height={size2} key={id++} fill={upColor} x={x + (1 - size2)/2} y={y + (1 - size2)/2} transform={matrixString}/>);
                pointList.push(<rect width={height2} height={size2} key={id++} fill={leftColor} x={0} y={0} transform={matrixString+'translate('+String(x + (1 - size2)/2 + size2)+','+String(y + (1 - size2)/2)+') '+'skewY(45) '}/>);
                pointList.push(<rect width={size2} height={height2} key={id++} fill={rightColor} x={0} y={0} transform={matrixString+'translate('+String(x + (1 - size2)/2)+','+String(y + size2 + (1 - size2)/2)+') '+'skewX(45) '}/>);
            }
            else {
                pointList.push(<rect width={size} height={size} key={id++} fill={upColor} x={x + (1 - size)/2} y={y + (1 - size)/2} transform={matrixString}/>);
                pointList.push(<rect width={height} height={size} key={id++} fill={leftColor} x={0} y={0} transform={matrixString+'translate('+String(x + (1 - size)/2 + size)+','+String(y + (1 - size)/2)+') '+'skewY(45) '}/>);
                pointList.push(<rect width={size} height={height} key={id++} fill={rightColor} x={0} y={0} transform={matrixString+'translate('+String(x + (1 - size)/2)+','+String(y + size + (1 - size)/2)+') '+'skewX(45) '}/>);
            }
        }
    }

    return pointList;
}

function getParamInfo() {
    return [
        {
            type: ParamTypes.TEXT_EDITOR,
            key: '柱体高度',
            default: 0.5,
        },
        {
            type: ParamTypes.TEXT_EDITOR,
            key: '定位点柱体高度',
            default: 0.5,
        },
        {
            type: ParamTypes.COLOR_EDITOR,
            key: '上侧颜色',
            default: '#FF7F89'
        },
        {
            type: ParamTypes.COLOR_EDITOR,
            key: '左侧颜色',
            default: '#FFD7D9'
        },
        {
            type: ParamTypes.COLOR_EDITOR,
            key: '右侧颜色',
            default: '#FFEBF3'
        },
    ];
}

let defaultDrawIcon = function ({ qrcode, params, title, icon }) {
    if (!qrcode) return []

    let id = 0;
    const nCount = qrcode.getModuleCount();
    const pointList = [];
    const sq25 = "M32.048565,-1.29480038e-15 L67.951435,1.29480038e-15 C79.0954192,-7.52316311e-16 83.1364972,1.16032014 87.2105713,3.3391588 C91.2846454,5.51799746 94.4820025,8.71535463 96.6608412,12.7894287 C98.8396799,16.8635028 100,20.9045808 100,32.048565 L100,67.951435 C100,79.0954192 98.8396799,83.1364972 96.6608412,87.2105713 C94.4820025,91.2846454 91.2846454,94.4820025 87.2105713,96.6608412 C83.1364972,98.8396799 79.0954192,100 67.951435,100 L32.048565,100 C20.9045808,100 16.8635028,98.8396799 12.7894287,96.6608412 C8.71535463,94.4820025 5.51799746,91.2846454 3.3391588,87.2105713 C1.16032014,83.1364972 5.01544207e-16,79.0954192 -8.63200256e-16,67.951435 L8.63200256e-16,32.048565 C-5.01544207e-16,20.9045808 1.16032014,16.8635028 3.3391588,12.7894287 C5.51799746,8.71535463 8.71535463,5.51799746 12.7894287,3.3391588 C16.8635028,1.16032014 20.9045808,7.52316311e-16 32.048565,-1.29480038e-15 Z";

    // draw icon
    if (icon) {
        const iconEnabled = getExactValue(icon.enabled, 0);
        const {src, scale} = icon;

        const iconSize = Number(nCount * (scale > 33 ? 33 : scale) / 100);
        const iconXY = (nCount - iconSize) / 2;

        if (icon && iconEnabled) {

            const randomIdDefs = getIdNum();
            const randomIdClips = getIdNum();
            pointList.push(
                <g transform={matrixString}>
                    <path d={sq25} stroke="#FFF" strokeWidth={100/iconSize * 1} fill="#FFF" transform={'translate('+String(iconXY)+','+String(iconXY)+') ' + 'scale(' + String(iconSize/100) + ',' + String(iconSize/100) + ')'} />
                </g>
            );
            pointList.push(
                <g key={id++} transform={matrixString}>
                    <defs>
                        <path id={"defs-path" + randomIdDefs} d={sq25} fill="#FFF" transform={'translate('+String(iconXY)+','+String(iconXY)+') ' + 'scale(' + String(iconSize/100) + ',' + String(iconSize/100) + ')'} />                    </defs>
                    <clipPath id={"clip-path" + randomIdClips}>
                        <use xlinkHref={"#defs-path" + randomIdDefs}  overflow="visible"/>
                    </clipPath>
                    <g clipPath={"url(#clip-path" + randomIdClips + ")"}>
                        <image overflow="visible" key={id++} xlinkHref={src} width={iconSize} x={iconXY} y={iconXY} />
                    </g>
                </g>
            );

        }
    }

    return pointList;
}

let builtinDrawIcon = function ({ qrcode, params, title, icon }) {
    if (!qrcode) return []

    let id = 0;
    const nCount = qrcode.getModuleCount();
    const pointList = [];
    const sq25 = "M32.048565,-1.29480038e-15 L67.951435,1.29480038e-15 C79.0954192,-7.52316311e-16 83.1364972,1.16032014 87.2105713,3.3391588 C91.2846454,5.51799746 94.4820025,8.71535463 96.6608412,12.7894287 C98.8396799,16.8635028 100,20.9045808 100,32.048565 L100,67.951435 C100,79.0954192 98.8396799,83.1364972 96.6608412,87.2105713 C94.4820025,91.2846454 91.2846454,94.4820025 87.2105713,96.6608412 C83.1364972,98.8396799 79.0954192,100 67.951435,100 L32.048565,100 C20.9045808,100 16.8635028,98.8396799 12.7894287,96.6608412 C8.71535463,94.4820025 5.51799746,91.2846454 3.3391588,87.2105713 C1.16032014,83.1364972 5.01544207e-16,79.0954192 -8.63200256e-16,67.951435 L8.63200256e-16,32.048565 C-5.01544207e-16,20.9045808 1.16032014,16.8635028 3.3391588,12.7894287 C5.51799746,8.71535463 8.71535463,5.51799746 12.7894287,3.3391588 C16.8635028,1.16032014 20.9045808,7.52316311e-16 32.048565,-1.29480038e-15 Z";

    // draw icon
    if (icon) {
        const iconMode = getExactValue(icon.enabled, 0);
        const {src, scale} = icon;

        const iconSize = Number(nCount * (scale > 33 ? 33 : scale) / 100);
        const iconXY = (nCount - iconSize) / 2;

        const WeChatIconSmall = (
            <g>
                <rect width="100" height="100" fill="#07c160"/>
                <path d="M39.061,44.018a4.375,4.375,0,1,1,4.374-4.375,4.375,4.375,0,0,1-4.374,4.375m21.877,0a4.375,4.375,0,1,1,4.376-4.375,4.375,4.375,0,0,1-4.376,4.375M28.522,69.063a2.184,2.184,0,0,1,.92,1.782,2.581,2.581,0,0,1-.116.7c-.552,2.06-1.437,5.361-1.478,5.516a3.237,3.237,0,0,0-.177.8,1.093,1.093,0,0,0,1.094,1.093,1.243,1.243,0,0,0,.633-.2L36.581,74.6a3.427,3.427,0,0,1,1.742-.5,3.3,3.3,0,0,1,.965.144A38.825,38.825,0,0,0,50,75.739c18.123,0,32.816-12.242,32.816-27.346S68.122,21.049,50,21.049,17.185,33.29,17.185,48.393c0,8.239,4.42,15.656,11.337,20.67" fill="#fff"/>
            </g>
        )

        const WeChatIcon = (
            <g>
                <rect width="100" height="100" fill="#07c160"/>
                <path d="M48.766,39.21a2.941,2.941,0,1,1,2.918-2.94,2.929,2.929,0,0,1-2.918,2.94m-16.455,0a2.941,2.941,0,1,1,2.918-2.941,2.93,2.93,0,0,1-2.918,2.941m8.227-17.039c-13.632,0-24.682,9.282-24.682,20.732,0,6.247,3.324,11.87,8.528,15.67a1.662,1.662,0,0,1,.691,1.352,1.984,1.984,0,0,1-.087.528c-.415,1.563-1.081,4.064-1.112,4.181a2.449,2.449,0,0,0-.132.607.825.825,0,0,0,.823.828.914.914,0,0,0,.474-.154l5.405-3.144a2.57,2.57,0,0,1,1.31-.382,2.442,2.442,0,0,1,.725.109,28.976,28.976,0,0,0,8.057,1.137c.455,0,.907-.012,1.356-.032a16.084,16.084,0,0,1-.829-5.082c0-10.442,10.078-18.908,22.511-18.908.45,0,.565.015,1.008.037-1.858-9.9-11.732-17.479-24.046-17.479" fill="#fff"/>
                <path d="M70.432,55.582A2.589,2.589,0,1,1,73,52.994a2.578,2.578,0,0,1-2.568,2.588m-13.713,0a2.589,2.589,0,1,1,2.568-2.588,2.578,2.578,0,0,1-2.568,2.588m20.319,16a16.3,16.3,0,0,0,7.106-13.058c0-9.542-9.208-17.276-20.568-17.276s-20.57,7.734-20.57,17.276S52.216,75.8,63.576,75.8a24.161,24.161,0,0,0,6.714-.947,2.079,2.079,0,0,1,.6-.091,2.138,2.138,0,0,1,1.092.319l4.5,2.62a.78.78,0,0,0,.4.129.688.688,0,0,0,.685-.691,2.081,2.081,0,0,0-.11-.5l-.927-3.486a1.641,1.641,0,0,1-.073-.44,1.385,1.385,0,0,1,.577-1.126" fill="#fff"/>
            </g>
        )

        const WeChatPayIcon = (
            <g>
                <rect width="100" height="100" fill="#07c160"/>
                <path d="M41.055,57.675a2.183,2.183,0,0,1-2.893-.883l-.143-.314L32.046,43.37a1.133,1.133,0,0,1-.105-.461,1.094,1.094,0,0,1,1.748-.877l7.049,5.019a3.249,3.249,0,0,0,2.914.333L76.8,32.63c-5.942-7-15.728-11.581-26.8-11.581-18.122,0-32.813,12.243-32.813,27.345,0,8.24,4.42,15.656,11.338,20.669a2.185,2.185,0,0,1,.919,1.781,2.569,2.569,0,0,1-.116.7c-.552,2.062-1.437,5.362-1.478,5.516a3.212,3.212,0,0,0-.177.8,1.094,1.094,0,0,0,1.1,1.094,1.236,1.236,0,0,0,.631-.2L36.583,74.6a3.438,3.438,0,0,1,1.742-.5,3.281,3.281,0,0,1,.965.145A38.844,38.844,0,0,0,50,75.739c18.122,0,32.813-12.243,32.813-27.345a23.668,23.668,0,0,0-3.738-12.671L41.3,57.537Z" fill="#fff"/>
            </g>
        )

        const AlipayIcon = (
            <g>
                <rect width="100" height="100" fill="#009ce1"/>
                <path d="M100,67.856c-.761-.1-4.8-.8-17.574-5.066-4.012-1.339-9.4-3.389-15.395-5.552A80.552,80.552,0,0,0,75.4,36.156H55.633v-7.1H79.848V25.094H55.633V13.258H45.749a1.68,1.68,0,0,0-1.733,1.707V25.094H19.524v3.963H44.016v7.1H23.8V40.12H63.013a69.579,69.579,0,0,1-5.65,13.763c-12.724-4.187-26.3-7.58-34.834-5.491C17.074,49.733,13.56,52.125,11.5,54.63,2.02,66.125,8.815,83.585,28.824,83.585c11.831,0,23.228-6.579,32.061-17.417C73.49,72.211,97.914,82.4,100,83.267ZM26.956,76.9c-15.6,0-20.215-12.255-12.5-18.958,2.573-2.266,7.276-3.372,9.782-3.621,9.268-.913,17.846,2.613,27.972,7.541C45.087,71.118,36.023,76.9,26.956,76.9Z" fill="#fff"/>
            </g>
        )

        function builtinIcon() {
            if (iconMode === 2) {
                return WeChatIconSmall
            } else if (iconMode === 3) {
                return WeChatIcon
            } else if (iconMode === 4) {
                return WeChatPayIcon
            } else if (iconMode === 5) {
                return AlipayIcon
            }
        }

        if (icon && iconMode) {
            const randomIdDefs = getIdNum();
            const randomIdClips = getIdNum();
            pointList.push(
                <g transform={matrixString}>
                    <path d={sq25} stroke="#FFF" strokeWidth={100/iconSize * 1} fill="#FFF" transform={'translate('+String(iconXY)+','+String(iconXY)+') ' + 'scale(' + String(iconSize/100) + ',' + String(iconSize/100) + ')'} />
                </g>
            );
            pointList.push(
                <g key={id++} transform={matrixString}>
                    <defs>
                        <path id={"defs-path" + randomIdDefs} d={sq25} fill="#FFF" transform={'translate('+String(iconXY)+','+String(iconXY)+') ' + 'scale(' + String(iconSize/100) + ',' + String(iconSize/100) + ')'} />                    </defs>
                    <clipPath id={"clip-path" + randomIdClips}>
                        <use xlinkHref={"#defs-path" + randomIdDefs}  overflow="visible"/>
                    </clipPath>
                    <g clipPath={"url(#clip-path" + randomIdClips + ")"}>
                        <g transform={'translate('+String(iconXY)+','+String(iconXY)+') ' + 'scale(' + String(iconSize/100) + ',' + String(iconSize/100) + ')'} >
                            {builtinIcon()}
                        </g>
                    </g>
                </g>
            );
        }
    }

    return pointList;
}

function drawIcon({ qrcode, icon, params }) {
    const iconMode = getExactValue(icon.enabled, 0);
    if (iconMode === 1) {

        // Custom
        // default
        return defaultDrawIcon({ qrcode, icon, params });

    } else {

        return builtinDrawIcon({ qrcode, icon, params });
    }
}

function viewBox(qrcode) {
    if (!qrcode) return '0 0 0 0';

    const nCount = qrcode.getModuleCount();
    return String(-nCount) + ' ' + String(-nCount / 2) + ' ' + String(nCount * 2) + ' ' + String(nCount * 2);
}

const Renderer25D = createRenderer({
    listPoints: listPoints,
    getParamInfo: getParamInfo,
    getViewBox: viewBox,
    drawIcon: drawIcon
})

export default Renderer25D

Renderer25D.detail = (
    <div>通向三维的半路。可能有一点点难以识别</div>
);
