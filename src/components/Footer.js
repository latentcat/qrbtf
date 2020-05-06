import React from "react";
import './Qrcode.css';

const currentYear = new Date().getFullYear();

class Footer extends React.Component {
    render() {
        return (
            <div className="Qr-titled">
                <div className="Qr-Centered Qr-footer note-font">
                    <div><strong>作者</strong>&emsp;<a href="https://blog.ciaochaos.com/" rel="noopener noreferrer" target="_blank">ciaochaos</a>&emsp;<a href="https://github.com/CPunisher/" rel="noopener noreferrer" target="_blank">CPunisher</a></div>
                    <div className="Gray">Copyright © {currentYear} QRBTF. 保留所有权利。</div>
                    <div className="Gray"><a href="http://www.beian.miit.gov.cn/" rel="noopener noreferrer" target="_blank">浙 ICP 备 19005869 号 </a></div>
                </div>
            </div>
        );
    }
}

export default Footer
