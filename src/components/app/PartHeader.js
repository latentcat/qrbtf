import React from "react";
import '../Qrcode.css';
import InputText from "../../containers/app/InputText";
import QrbtfLogo from "../svg/QrbtfLogo";

const PartHeader = () => (
    <div className="Qr-Centered">
        <div>
            <h1 className="Qr-title"><QrbtfLogo className="Qr-title-svg" /></h1>
        </div>
        <p className="Qr-subtitle">参数化二维码生成器{/* <sup className="Gray">测试版</sup>*/}</p>
        <InputText/>
    </div>
)

export default PartHeader
