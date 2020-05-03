import React from "react";
import './Qrcode.css'

class QrRendererBlank extends React.Component {
    render() {
        return (
            <svg className="Qr-item-svg" width="100%" height="100%" viewBox="0 0 0 0" fill="white"
                 xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            </svg>
        );
    }
}

export default QrRendererBlank
