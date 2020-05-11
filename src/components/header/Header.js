import React from "react";
import '../Qrcode.css';
import logo from "../../qrbtf-logo.svg";
import InputText from "../../containers/InputText";

const logoStyle = {
    background: `url(${logo})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left'
};

const Header = () => (
    <div className="Qr-Centered">
        <div style={logoStyle}>
            <h1 className="Qr-title">&ensp;</h1>
        </div>
        <p className="Qr-subtitle">参数化二维码生成器 <sup className="Gray">测试版</sup></p>
        <InputText/>
    </div>
)

export default Header
