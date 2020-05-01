import React from "react";
import './Qrcode.css'

function QrItem(props) {
    return (
        <div className="Qr-item">
            <div className="Qr-item-image">

            </div>
            <div className="Qr-item-detail">
                {props.value}
            </div>
        </div>
    );
}

function Qrs(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
        <QrItem key={number.toString()}              value={number} />

    );
    return (
        <div>
            <div className="Qr-Centered">
                <h1>qrbtf.com</h1>
                <input className="Qr-input" placeholder="Input your URL here"/>
            </div>
            <div className="Qr-titled">
                <div className="Qr-Centered Qr-s-title">
                    Styles
                </div>
                <div className="Qr-s">
                    <div className="Qr-box">
                        {listItems}
                    </div>
                </div>
            </div>
        </div>

    );
}

const numbers = ['C1', 'C2', 'S1', 'D1', 'D2', 'D3', 'D4', 'A1', 'A2', 'A3', 'A4'];
const Qrcode = (props) => {
    return (
        <Qrs numbers={numbers} />
    );
}

export default Qrcode;
