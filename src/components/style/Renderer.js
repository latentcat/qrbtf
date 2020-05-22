import React, {useEffect} from "react";
import {extend} from "../../utils/util";

const Renderer = ({ rendererType, ...other }) => (
    React.createElement(rendererType, other)
)

function areEqual(prevProps, nextProps) {
    return !(prevProps.selected == true || nextProps.selected == true)
}

export function createRenderer(renderer) {
    let defaultViewBox = function (qrcode) {
        if (!qrcode) return '0 0 0 0';

        const nCount = qrcode.getModuleCount();
        return String(-nCount / 5) + ' ' + String(-nCount / 5) + ' ' + String(nCount + nCount / 5 * 2) + ' ' + String(nCount + nCount / 5 * 2);
    }

    renderer = extend({
        getViewBox: defaultViewBox,
        listPoints: (qrcode, params) => { return []; },
        getParamInfo: () => {return []; },
        beginRendering: ({ qrcode, params, setParamInfo }) => {},
        beforeListing: ({ qrcode, params, setParamInfo }) => {},
        afterListing: ({ qrcode, params, setParamInfo }) => {},
    }, renderer);

    return ({ qrcode, params, setParamInfo}) => {
        useEffect(() => {
            setParamInfo(renderer.getParamInfo());
        }, [setParamInfo]);

        renderer.beginRendering({ qrcode, params, setParamInfo });
        return (
            <svg className="Qr-item-svg" width="100%" height="100%" viewBox={renderer.getViewBox(qrcode)} fill="white"
                 xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                {renderer.beforeListing({ qrcode, params, setParamInfo })}
                {renderer.listPoints(qrcode, params)}
                {renderer.afterListing({ qrcode, params, setParamInfo })}
            </svg>
        );
    }
}

export default React.memo(Renderer, areEqual)
