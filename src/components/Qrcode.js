import React from "react";
import {getQrcodeData} from "../utils/qrcodeHandler";
import './Qrcode.css';

import QrRendererBase from "./QrRendererBase";
import QrRendererRound from "./QrRendererRound";
import QrItem from "./QrItem";

const date = new Date();
const currentYear = date.getFullYear();

function getStyleList(qrcode) {
    const styleList = [
        {value: "A1", renderer: <QrRendererBase qrcode={qrcode}/> },
        {value: "A2", renderer: <QrRendererRound qrcode={qrcode}/>},
        {value: "B1"},
        {value: "B2"},
        {value: "C1"},
        {value: "C2"},
        {value: "D1"},
        {value: "D2"},
    ];
    return styleList;
}

class Qrcode extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.handleCreate = this.handleCreate.bind(this)
        this.handleSelected = this.handleSelected.bind(this)
        this.state = {
            text: '',
            selected: 'A1',
            options: {text: ''},
            qrcode: null
        };
    }

    handleSelected(value) {
        this.setState({selected: value});
    }

    handleChange(e) {
        this.setState({text: e.target.value})
    }

    handleCreate(e) {
        let text = this.state.text

        if (text.length > 0)
            this.setState({options: {text: text}, qrcode: getQrcodeData({text: text})});
        else {
            text = 'https://qrbtf.com/';
            this.setState({text: text, options: {text: text}, qrcode: getQrcodeData({text: text})});
        }
        e.target.blur();
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
                        value={this.state.text}
                        onChange={this.handleChange}
                        onBlur={this.handleCreate}
                        onKeyPress={(e) => {if(e.key == 'Enter') this.handleCreate(e)}}
                    />
                </div>
                <div className="Qr-titled">
                    <div className="Qr-Centered title-margin">
                        <div className="Qr-s-title">Styles</div>
                        <p className="Qr-s-subtitle">点击选择样式</p>
                    </div>
                    <div className="Qr-s">
                        <div className="Qr-box">
                            {
                                getStyleList(this.state.qrcode).map((style) => {
                                    return <QrItem
                                        value={style.value}
                                        key={style.value}
                                        qrcode={this.state.qrcode}
                                        renderer={style.renderer}
                                        selected={style.value == this.state.selected}
                                        onSelected={this.handleSelected}
                                    />
                                })
                            }
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
                                        <td><input className="Qr-input small-input"
                                                   placeholder="10" /></td>
                                    </tr>
                                    <tr>
                                        <td>随机种</td>
                                        <td><input className="Qr-input small-input"
                                                   placeholder="10" /></td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
                <div className="Qr-titled">
                    <div className="Qr-Centered title-margin">
                        <div className="Qr-s-title">Downloads</div>
                        <p className="Qr-s-subtitle">下载二维码</p>
                    </div>
                    <div className="Qr-Centered">
                        <div className="div-btn">
                            <button className="dl-btn">SVG</button>
                            <button className="dl-btn">JPG</button>
                        </div>

                    </div>
                </div>
                <div className="Qr-titled-nobg">
                    <div className="Qr-Centered title-margin">
                        <div className="Qr-s-title">More</div>
                        <p className="Qr-s-subtitle">更多</p>
                    </div>
                    <div className="Qr-Centered">
                        <div className="div-btn">
                            <button disabled className="dl-btn">提交样式</button>
                        </div>
                    </div>
                </div>
                <div className="Qr-titled">
                    <div className="Qr-Centered Qr-footer">
                        <div><strong>作者</strong>&emsp;<a href="https://blog.ciaochaos.com/" rel="noopener" target="_blank" data-pjax-state="">ciaochaos</a>&emsp;<a href="https://github.com/CPunisher/" rel="noopener" target="_blank" data-pjax-state="">CPunisher</a></div>
                        <div>Copyright © {currentYear} QRBTF. All rights reserved.</div>
                        <div><a href="http://www.beian.miit.gov.cn/" rel="noopener" target="_blank" data-pjax-state="">浙 ICP 备 19005869 号 </a></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Qrcode;
