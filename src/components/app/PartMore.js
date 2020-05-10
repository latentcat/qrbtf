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
                <LinkButton href={"https://www.yuque.com/qrbtf/docs/donate"} value={"打赏 & 赞助"} />
                <LinkButton href={"https://www.yuque.com/qrbtf/topics"} value={"问题反馈"} />
            </div>
            <div className="div-btn">
                <LinkButton href={"https://www.yuque.com/qrbtf/docs/dev"} value={"开发与设计"} />
                <LinkButton href={"https://www.yuque.com/qrbtf/docs/coop"} value={"商业合作"} />
            </div>
        </div>
    </div>
)

export default PartMore;
