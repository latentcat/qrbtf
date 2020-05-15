import React, {useState} from 'react';
import './App.css';
import PropTypes from 'prop-types';
import {isWeiXin} from "../../utils/util";

const WxMessage = () => {
    if (isWeiXin()) {
        return <div className="note-font" id="wx-message-inner">当前客户端不支持下载 SVG，<br />请下载 JPG 并长按二维码保存。</div>
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
            <div className="btn-row">
                <div className="div-btn">
                    <button className="dl-btn" onClick={() => {
                        onJpgDownload().then(res => setImgData(res));
                    }}>
                        JPG
                    </button>
                    <button className="dl-btn" onClick={onSvgDownload}>SVG</button>
                </div>
            </div>

            <div id="wx-message">
                <WxMessage/>
            </div>
            <div>
                {
                    imgData.length > 0 ? <div id="dl-image"><div id="dl-image-inner"><img id="dl-image-inner-jpg" src={imgData} alt="点击JPG下载" /></div></div> : null
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
