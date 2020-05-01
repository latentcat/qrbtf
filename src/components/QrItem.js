import React from "react";
import './Qrcode.css'

function calViewBox(props) {
    if (!props.qrcode) return '0 0 0 0';

    const nCount = props.qrcode.getModuleCount();
    return '0 0 ' + String(nCount) + ' ' + String(nCount);
}

class QrItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        }
    }

    render() {
        return (
            <div className="Qr-item">
                <div className="Qr-item-image">
                    <svg className="Qr-item-svg" width="100%" height="100%" viewBox={calViewBox(this.props)} fill="white">
                        {this.props.renderer}
                    </svg>
                </div>
                <div className="Qr-item-detail">
                    {this.state.value}
                </div>
            </div>
        );
    }
}

export default QrItem;
