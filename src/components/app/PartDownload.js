import React from 'react';
import './App.css';
import DownloadSvg from "../../containers/download/DownloadSvg";
import DownloadJpg from "../../containers/download/DownloadJpg";
import {isWeiXin} from "../../utils/util";

const WxMessage = () => {
    if (isWeiXin()) {
        return <div className="note-font" id="wx-message-inner">当前客户端不支持下载，请在浏览器中打开。</div>
    }
    return null
}

const PartDownload = ({ value }) => (
    <div className="Qr-titled">
        <div className="Qr-Centered title-margin">
            <div className="Qr-s-title">Downloads</div>
            <p className="Qr-s-subtitle">下载二维码 — {value}</p>
        </div>
        <div className="Qr-Centered">
            <div className="div-btn">
                <DownloadSvg/>
                <DownloadJpg/>
            </div>
            <div id="wx-message">
                <WxMessage/>
            </div>
        </div>
    </div>
)

export default PartDownload;
