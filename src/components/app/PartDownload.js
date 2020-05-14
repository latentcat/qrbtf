import React, {useState} from 'react';
import './App.css';
import PropTypes from 'prop-types';
import {isWeiXin} from "../../utils/util";

const WxMessage = () => {
    if (isWeiXin()) {
        return <div className="note-font" id="wx-message-inner">当前客户端不支持下载，请长按图片保存。</div>
    }
    return null
}

const PartDownload = ({ value, onSvgDownload, onJpgDownload }) => {
    const [imgData, setImgData] = useState('');

    return (
        <div className="Qr-titled">
        <div className="Qr-Centered title-margin">
            <div className="Qr-s-title">Downloads</div>
            <p className="Qr-s-subtitle">下载二维码 — {value}</p>
        </div>
        <div className="Qr-Centered">
            <div className="div-btn">
                <button className="dl-btn" onClick={onSvgDownload}>SVG</button>
                <button className="dl-btn" onClick={() => {
                    onJpgDownload().then(res => setImgData(res));
                }}>
                    JPG
                </button>
            </div>
            <div id="wx-message">
                <WxMessage/>
            </div>
            <div>
                {
                    imgData.length > 0 ? <img src={imgData} width={300} height={300} alt="点击JPG下载" /> : null
                }
            </div>
        </div>
    </div>
    );
}

PartDownload.propTypes = {
    value: PropTypes.string.isRequired,
    onSvgDownload: PropTypes.func.isRequired,
    onJpgDownload: PropTypes.func.isRequired,
}

export default PartDownload;
