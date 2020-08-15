import React, {useEffect} from "react";
import {extend, getExactValue} from "../../utils/util";

const Renderer = ({ rendererType, ...other }) => (
    React.createElement(rendererType, other)
)

function areEqual(prevProps, nextProps) {
    return !(prevProps.selected === true || nextProps.selected === true)
}

let defaultViewBox = function (qrcode) {
    if (!qrcode) return '0 0 0 0';

    const nCount = qrcode.getModuleCount();
    return String(-nCount / 5) + ' ' + String(-nCount / 5) + ' ' + String(nCount + nCount / 5 * 2) + ' ' + String(nCount + nCount / 5 * 2);
}

let drawIcon = function (qrcode, title, icon) {
    if (!qrcode) return []
    if (!title && !icon) return null;

    let id = 0;
    const titleEnabled = getExactValue(title.enabled, 0);
    const iconEnabled = getExactValue(icon.enabled, 0);
    const {text, color, size, align} = title;
    const {src, scale} = icon;

    const nCount = qrcode.getModuleCount();
    // const { fontSize, color, verticalAlign, ...titleStyle } = styles.title || {};
    // const titleVerticalAlign = titleAlign || verticalAlign || (icon ? "bottom" : "middle");
    // iconScale = iconScale > .33 ? .33 : iconScale;
    const titleStyle = {};
    const titleVerticalAlign = align;

    const iconSize = Number(nCount * (scale > .33 ? .33 : scale));
    const iconXY = (nCount - iconSize) / 2;

    const pointList = [];
    if ((titleEnabled && align === "middle") || iconEnabled) {
        pointList.push(<rect key={id++} width={iconSize} height={iconSize} rx="2" ry="2" fill="#FFFFFF" x={iconXY} y={iconXY} />);
    }

    if (icon && iconEnabled) {
        pointList.push(<image key={id++} xlinkHref={src} width={iconSize - 2} x={iconXY + 1} y={iconXY + 1} />);
    }

    if (title && titleEnabled) {
        // const svgWidth = styles.svg && styles.svg.width ? styles.svg.width.replace("px", "") : 300;
        // const titleFontSize = Number(nCount + nCount / 5 * 2) * (titleSize || fontSize || 12) / svgWidth;
        // const titleFontColor = titleColor || color || "#000000";
        const svgWidth = 300;
        const titleFontSize = Number(nCount + nCount / 5 * 2) * size / svgWidth;
        const titleFontColor = color;

        const fontY = titleVerticalAlign === "middle"
            ? (icon ? (iconXY + iconSize) : (nCount / 2 + titleFontSize * .5))
            : Number(nCount + nCount / 5) - titleFontSize * .5;

        pointList.push(<text key={id++} x={nCount / 2} y={fontY} fill={titleFontColor} style={{ ...titleStyle, fontSize: titleFontSize }} textAnchor="middle">{text}</text>)
    }

    return pointList;
}

export function createRenderer(renderer) {


    renderer = extend({
        getViewBox: defaultViewBox,
        listPoints: (qrcode, params) => { return []; },
        getParamInfo: () => {return []; },
        beginRendering: ({ qrcode, params, setParamInfo }) => {},
        beforeListing: ({ qrcode, params, setParamInfo }) => {},
    }, renderer);

    return ({ qrcode, params, title, icon, setParamInfo}) => {
        useEffect(() => {
            setParamInfo(renderer.getParamInfo());
        }, [setParamInfo]);

        renderer.beginRendering({ qrcode, params, setParamInfo });
        return (
            <svg className="Qr-item-svg" width="100%" height="100%" viewBox={renderer.getViewBox(qrcode)} fill="white"
                 xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                {renderer.beforeListing({ qrcode, params, setParamInfo })}
                {renderer.listPoints(qrcode, params)}
                {drawIcon(qrcode, title, icon)}
            </svg>
        );
    }
}

export default React.memo(Renderer, areEqual)
