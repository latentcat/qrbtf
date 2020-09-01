import {connect} from 'react-redux';
import {changeStyle} from "../../actions";
import StyleList from "../../components/style/StyleList";
import RendererViewer from "./RendererViewer";
import RendererDSJ from "../../components/renderer/RendererDSJ";
import RendererCircle from "../../components/renderer/RendererCircle"
import RendererRandRect from "../../components/renderer/RendererRandRect";
import Renderer25D from "../../components/renderer/Renderer25D";
import RendererImage from "../../components/renderer/RendererImage";
import RendererResImage from "../../components/renderer/RendererResImage";
import { RendererRandRound, RendererRect, RendererRound } from "../../components/renderer/RendererBase";
import { RendererLine, RendererLine2 } from "../../components/renderer/RendererLine";
import { RendererFuncA, RendererFuncB } from "../../components/renderer/RendererFunc";
import * as React from "react";
import RendererImageFill from "../../components/renderer/RendererImageFill";

const styles = [
    {value: "A1", renderer: RendererRect},
    {value: "C2", renderer: RendererResImage},
    {value: "SP — 1", renderer: RendererDSJ},
    {value: "A — a1", renderer: RendererLine},
    {value: "SP — 3", renderer: RendererCircle},
    {value: "A2", renderer: RendererRound},
    {value: "A3", renderer: RendererRandRound},
    {value: "A — b2", renderer: RendererFuncB},
    {value: "C1", renderer: RendererImage},
    {value: "C3", renderer: RendererImageFill},
    {value: "B1", renderer: Renderer25D},
    {value: "A — a2", renderer: RendererLine2},
    {value: "A — b1", renderer: RendererFuncA},
    {value: "SP — 2", renderer: RendererRandRect},
]

const paramInfoBuffer = new Array(16).fill(new Array(16))
const paramValueBuffer = new Array(16).fill(new Array(16))

const setParamInfo = (renderIndex, paramInfo) => {
    paramInfoBuffer[renderIndex] = paramInfo
    paramValueBuffer[renderIndex] = paramInfo.map(item => item.default)
}

const mapStateToProps = state => ({
    styles: styles.map((style, index) => {
        return {
            value: style.value,
            selected: state.selectedIndex === index,
            details: style.renderer.detail,
            renderer: <RendererViewer rendererType={style.renderer} index={index} setParamInfo={setParamInfo}/>
        }
    })
})

const mapDispatchToProps = dispatch => ({
    onSelected: rendererIndex => {
        dispatch(changeStyle(rendererIndex, styles[rendererIndex].renderer, styles[rendererIndex].value))
    }
})

const StyleListViewer = ({setParamInfo}) => {
    let res = connect(mapStateToProps, mapDispatchToProps)(StyleList)
    setParamInfo(paramInfoBuffer, paramValueBuffer);
    return res;
}

export default StyleListViewer;
