import React, {useEffect, useState} from 'react';
import './App.css';
import StyleListViewer from "../../containers/style/StyleListViewer";
import {isPC} from "../../utils/util";

const PartStyles = ({ setParamInfo }) => {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        setLoaded(true);
    }, [])

    const styleList = React.createElement(StyleListViewer({setParamInfo}))

    return (<div className="Qr-titled" id="Qr-style">
        <div className="Qr-Centered title-margin">
            <div className="Qr-s-title">Styles</div>
            <div className="Qr-s-subtitle Qr-rel">
                点击选择样式
                {isPC() ? <div className="Qr-style-hint">按住 shift 滚动</div> : null}
            </div>
        </div>
        <div className="Qr-s" style={{visibility: loaded ? "visible" :"hidden"}}>
            {styleList}
        </div>
    </div>)
}

export default PartStyles;
