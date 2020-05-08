/*eslint-disable*/

import React from "react";
import ReactDOMServer from 'react-dom/server'
import {getQrcodeData} from "../utils/qrcodeHandler";
import {saveImg, saveSvg} from "../utils/downloader";
import {isWeiXin} from "../utils/util";
import './Qrcode.css';
import logo from '../qrbtf-logo.svg';

import Footer from "./footer/Footer";
import QrItem from "./QrItem";
import QrRendererBase from "./QrRendererBase";
import QrRendererRound from "./QrRendererRound";
import QrRendererRandRound from "./QrRendererRandRound";
import QrRendererBlank from "./QrRendererBlank";
import QrRendererRandRect from "./QrRendererRandRect";
import QrRendererDSJ from "./QrRendererDSJ";

class Qrcode extends React.Component {

    downloadSvg = (e) => {
        const style = styleList[this.state.selectedIndex]
        const el = React.createElement(style.renderer, {qrcode: this.state.qrcode, params: this.state.paramValue[this.state.selectedIndex]})
        saveSvg(style.value, ReactDOMServer.renderToString(el))
    }

    downloadImg = (e) => {
        const style = styleList[this.state.selectedIndex]
        const el = React.createElement(style.renderer, {qrcode: this.state.qrcode, params: this.state.paramValue[this.state.selectedIndex]})
        saveImg(style.value, ReactDOMServer.renderToString(el), 1500, 1500)
    }
}

export default Qrcode;

window.onload = function(){
    if(isWeiXin()){
        const outer = document.getElementById("wx-message");
        const inner = document.createElement("div");
        inner.className = "note-font";
        inner.id = "wx-message-inner";
        inner.innerHTML = "当前客户端不支持下载，请在浏览器中打开。";
        outer.appendChild(inner);
    }
}
