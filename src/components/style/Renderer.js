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

let defaultDrawIcon = function ({ qrcode, params, title, icon }) {
    if (!qrcode) return []

    let id = 0;
    const nCount = qrcode.getModuleCount();
    const pointList = [];

    // draw icon
    if (icon) {
        const iconEnabled = getExactValue(icon.enabled, 0);
        const {src, scale} = icon;

        const iconSize = Number(nCount * (scale > .33 ? .33 : scale));
        const iconXY = (nCount - iconSize) / 2;

        if (icon && iconEnabled) {
            pointList.push(<rect key={id++} width={iconSize} height={iconSize} rx="2" ry="2" fill="#FFFFFF" x={iconXY} y={iconXY} />);
            pointList.push(<image key={id++} xlinkHref={src} width={iconSize - 2} x={iconXY + 1} y={iconXY + 1} />);
        }
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
        drawIcon: defaultDrawIcon
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
                {renderer.drawIcon({ qrcode, params, title, icon })}
            </svg>
        );
    }
}

export default React.memo(Renderer, areEqual)
export { defaultDrawIcon, defaultViewBox }
