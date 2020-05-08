import React, { useEffect } from "react";
import {defaultViewBox} from "../../utils/util";

function listPoints(qrcode, params) {
    return []
}

function getParamInfo() {
    return [];
}

const RenderBlank = ({ qrcode, params, setParamInfo}) => {
    useEffect(() => {
        setParamInfo(getParamInfo());
    }, [setParamInfo]);

    return (
        <svg className="Qr-item-svg" width="100%" height="100%" viewBox={defaultViewBox(qrcode)} fill="white"
             xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            {listPoints(qrcode, params)}
        </svg>
    )
}

export default RenderBlank
