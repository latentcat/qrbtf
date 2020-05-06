import React from 'react';
import './App.css';
import LinkButton from "../link/LinkButton";

const PartMore = () => (
    <div className="Qr-titled-nobg">
        <div className="Qr-Centered title-margin">
            <div className="Qr-s-title">More</div>
            <p className="Qr-s-subtitle">更多</p>
        </div>
        <div className="Qr-Centered btn-row">
            <div className="div-btn">
                <LinkButton href={"https://www.yuque.com/qrbtf/docs"} value={"使用手册"} />
                <LinkButton href={"https://www.yuque.com/qrbtf/topics"} value={"问题反馈"} />
            </div>
        </div>
    </div>
)

export default PartMore;
