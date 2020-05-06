import React from "react";
import PropTypes from 'prop-types';
import {defaultRenderer} from "../../utils/util";

function listPoints(qrcode) {
    if (!qrcode) return[]

    const nCount = qrcode.getModuleCount();
    const pointList = []
    let id = 0

    for (let x = 0; x < nCount; x++) {
        for (let y = 0; y < nCount; y++) {
            if (qrcode.isDark(x, y)) {
                pointList.push(<rect key={id++} width={1} height={1} fill={"black"} x={x} y={y}/>)
            }
        }
    }
    return pointList;
}

const RendererBase = ({ qrcode }) => (
    defaultRenderer(qrcode, listPoints(qrcode))
);

RendererBase.prototype = {
    qrcode: PropTypes.object.isRequired
}

export default RendererBase;
