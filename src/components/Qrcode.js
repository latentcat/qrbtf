import React from "react";
import ReactDOMServer from 'react-dom/server'
import {getQrcodeData} from "../utils/qrcodeHandler";
import {saveImg, saveSvg} from "../utils/downloader";
import './Qrcode.css';

import QrRendererBase from "./QrRendererBase";
import QrRendererRound from "./QrRendererRound";
import QrRendererBlank from "./QrRendererBlank";
import QrItem from "./QrItem";

const date = new Date();
const currentYear = date.getFullYear();

const styleList = [
    {value: "A1", renderer: QrRendererBase},
    {value: "A2", renderer: QrRendererRound},
    {value: "B1", renderer: QrRendererBlank},
    {value: "B2", renderer: QrRendererBlank},
    {value: "C1", renderer: QrRendererBlank},
    {value: "C2", renderer: QrRendererBlank},
    {value: "D1", renderer: QrRendererBlank},
    {value: "D2", renderer: QrRendererBlank},
];

class Qrcode extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.handleCreate = this.handleCreate.bind(this)
        this.handleSelected = this.handleSelected.bind(this)
        this.downloadSvg = this.downloadSvg.bind(this)
        this.downloadImg = this.downloadImg.bind(this)
        this.state = {
            text: '',
            selectedIndex: 0,
            options: {text: ''},
            qrcode: null
        };
    }

    componentDidMount() {
        this.handleCreate()
    }

    handleSelected(index) {
        this.setState({selectedIndex: index});
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
        if (e) e.target.blur();
    }

    downloadSvg(e) {
        const style = styleList[this.state.selectedIndex]
        const el = React.createElement(style.renderer, {qrcode: this.state.qrcode})
        saveSvg(style.value, ReactDOMServer.renderToString(el))
    }

    downloadImg(e) {
        const style = styleList[this.state.selectedIndex]
        const el = React.createElement(style.renderer, {qrcode: this.state.qrcode})
        saveImg(style.value, ReactDOMServer.renderToString(el), 512, 512)
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
                        onKeyPress={(e) => {if(e.key === 'Enter') this.handleCreate(e)}}
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
                                styleList.map((style, index) => {
                                    return <QrItem
                                        key={style.value}
                                        value={style.value}
                                        index={index}
                                        qrcode={this.state.qrcode}
                                        renderer={React.createElement(style.renderer, {
                                            qrcode: this.state.qrcode,
                                        })}
                                        selected={index == this.state.selectedIndex}
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
                            <button className="dl-btn" onClick={this.downloadSvg}>SVG</button>
                            <button className="dl-btn" onClick={this.downloadImg}>JPG</button>
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
                        <div><strong>作者</strong>&emsp;<a href="https://blog.ciaochaos.com/" rel="noopener noreferrer" target="_blank" data-pjax-state="">ciaochaos</a>&emsp;<a href="https://github.com/CPunisher/" rel="noopener noreferrer" target="_blank" data-pjax-state="">CPunisher</a></div>
                        <div className="Gray">Copyright © {currentYear} QRBTF. All rights reserved.</div>
                        <div className="Gray"><a href="http://www.beian.miit.gov.cn/" rel="noopener noreferrer" target="_blank" data-pjax-state="">浙 ICP 备 19005869 号 </a></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Qrcode;
