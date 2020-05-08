import React from 'react';
import './App.css';
import StyleListViewer from "../../containers/StyleListViewer";

const PartStyles = () => (
    <div className="Qr-titled">
        <div className="Qr-Centered title-margin">
            <div className="Qr-s-title">Styles</div>
            <p className="Qr-s-subtitle">点击选择样式</p>
        </div>
        <div className="Qr-s">
            {React.createElement(StyleListViewer())}
        </div>
    </div>
)

export default PartStyles;
