import React from 'react';
import './App.css';

const PartDownload = () => (
    <div className="Qr-titled">
        <div className="Qr-Centered title-margin">
            <div className="Qr-s-title">Downloads</div>
            <p className="Qr-s-subtitle">下载二维码</p>
        </div>
        <div className="Qr-Centered">
            <div className="div-btn">
                <button className="dl-btn">SVG</button>
                <button className="dl-btn">JPG</button>
            </div>
            <div id="wx-message"></div>
        </div>

    </div>
)

export default PartDownload;
