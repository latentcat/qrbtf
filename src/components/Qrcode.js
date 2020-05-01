import React from "react";
import QrItem from './QrItem'
import {getQrcodeData} from "../utils/qrcodeHandler";
import './Qrcode.css'

import QrRendererBase from './QrRendererBase'
import QrRendererRound from './QrRendererRound'

function QrBoxList(props) {
    return (
        <React.Fragment>
            <QrItem value={"A1"} qrcode={props.qrcode} renderer={<QrRendererBase qrcode={props.qrcode}/>} />
            <QrItem value={2} qrcode={props.qrcode} renderer={<QrRendererRound qrcode={props.qrcode}/>} />
            <QrItem value={3} qrcode={props.qrcode} />
            <QrItem value={4} qrcode={props.qrcode} />
            <QrItem value={5} qrcode={props.qrcode} />
            <QrItem value={6} qrcode={props.qrcode} />
            <QrItem value={7} qrcode={props.qrcode} />
            <QrItem value={8} qrcode={props.qrcode} />
        </React.Fragment>
    );
}

class Qrcode extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.handleCreate = this.handleCreate.bind(this)
        this.state = {
            text: '',
            options: {text: ''},
            qrcode: null
        };
    }

    handleChange(e) {
        this.setState({text: e.target.value})
    }

    handleCreate(e) {
        const text = this.state.text
        this.setState({options: {text: text}, qrcode: getQrcodeData({text: text})});
    }

    render() {
        return (
            <div>
                <div className="Qr-Centered">
                    <h1 className="Qr-title">qrbtf.com</h1>
                    <p className="Qr-subtitle">参数化二维码生成器</p>
                    <input
                        className="Qr-input big-input"
                        placeholder="Input your URL here"
                        onChange={this.handleChange}
                        onBlur={this.handleCreate}
                        onKeyPress={(e) => {if(e.key == 'Enter') this.handleCreate(e)}}
                    />
                </div>
                <div className="Qr-titled">
                    <div className="Qr-Centered title-margin">
                        <div className="Qr-s-title">Styles</div>
                        <p className="Qr-s-subtitle">样式选择</p>
                    </div>
                    <div className="Qr-s">
                        <div className="Qr-box">
                            <QrBoxList qrcode={this.state.qrcode} options={this.state.options}/>
                        </div>
                    </div>
                </div>
                <div className="Qr-titled-nobg">
                    <div className="Qr-Centered title-margin">
                        <div className="Qr-s-title">Parameters</div>
                        <p className="Qr-s-subtitle">参数调整</p>
                    </div>
                    <div className="Qr-Centered">
                        <div className="Qr-div-table">
                            <table className="Qr-table">
                                <tbody>
                                    <tr>
                                        <td>圆点大小</td>
                                        <td><input className="Qr-input"
                                                   placeholder="10" />&ensp;px</td>
                                    </tr>
                                    <tr>
                                        <td>随机种</td>
                                        <td><input className="Qr-input"
                                                   placeholder="1" /></td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Qrcode;
