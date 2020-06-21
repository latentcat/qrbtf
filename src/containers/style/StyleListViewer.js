import {connect} from 'react-redux';
import {changeStyle} from "../../actions";
import StyleList from "../../components/style/StyleList";
import RendererViewer from "./RendererViewer";
import RendererDSJ from "../../components/renderer/RendererDSJ";
import RendererRandRect from "../../components/renderer/RendererRandRect";
import Renderer25D from "../../components/renderer/Renderer25D";
import RendererImage from "../../components/renderer/RendererImage";
import RendererResImage from "../../components/renderer/RendererResImage";
import {RendererRandRound, RendererRect, RendererRound} from "../../components/renderer/RendererBase";
import {RendererLine} from "../../components/renderer/RendererLine";
import * as React from "react";

const styles = [
    {value: "A1", renderer: RendererRect},
    {value: "A2", renderer: RendererRound},
    {value: "A3", renderer: RendererRandRound},
    {value: "A — a1", renderer: RendererLine},
    {value: "SP — 1", renderer: RendererDSJ},
    {value: "SP — 2", renderer: RendererRandRect},
    {value: "B1", renderer: Renderer25D},
    {value: "C1", renderer: RendererImage},
    {value: "C2", renderer: RendererResImage},
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
