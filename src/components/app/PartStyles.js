import React, {useEffect, useState} from 'react';
import './App.css';
import StyleListViewer from "../../containers/style/StyleListViewer";

const PartStyles = ({ setParamInfo }) => {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        setLoaded(true);
    }, [])
    const styleList = React.createElement(StyleListViewer({setParamInfo}))

    return (<div className="Qr-titled">
        <div className="Qr-Centered title-margin">
            <div className="Qr-s-title">Styles</div>
            <p className="Qr-s-subtitle">点击选择样式</p>
        </div>
        <div className="Qr-s">
            {styleList}
        </div>
    </div>)
}

export default PartStyles;
