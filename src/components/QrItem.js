import React from "react";
import './Qrcode.css'

function calClassName(props) {
    if (props.selected == true) return 'Qr-item Qr-item-selected';
    return 'Qr-item';
}

class QrItem extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            params: new Array(16)
        };
    }

    handleClick(e) {
        this.props.onSelected(this.props.index);
    }

    render() {
        return (
            <div className={calClassName(this.props)} onClick={this.handleClick}>
                <div className="Qr-item-image">
                    <div className="Qr-item-image-inner">
                            {this.props.renderer}
                    </div>
                </div>
                <div className="Qr-item-detail">
                    {this.props.value}
                </div>
            </div>
        );
    }
}

export default QrItem;
