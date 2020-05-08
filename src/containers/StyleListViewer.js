import {connect, useDispatch} from 'react-redux';
import {changeStyle, createParam} from "../actions";
import StyleList from "../components/style/StyleList";
import Renderer from "./Renderer";
import RendererBlank from "../components/renderer/RendererBlank";
import RendererBase from "../components/renderer/RendererBase";
import RendererDSJ from "../components/renderer/RendererDSJ";
import RendererRound from "../components/renderer/RendererRound";
import RendererRandRound from "../components/renderer/RendererRandRound";
import RendererRandRect from "../components/renderer/RendererRandRect";
import Renderer25D from "../components/renderer/Renderer25D";
import RendererImage from "../components/renderer/RendererImage";
import * as React from "react";

const styles = [
    {value: "A1", renderer: RendererBase},
    {value: "A2", renderer: RendererRound},
    {value: "A3", renderer: RendererRandRound},
    {value: "SP — 1", renderer: RendererDSJ},
    {value: "SP — 2", renderer: RendererRandRect},
    {value: "B1", renderer: Renderer25D},
    {value: "C1", renderer: RendererImage},
    {value: "D1", renderer: RendererBlank},
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
            selected: state.selectedIndex == index,
            renderer: React.createElement(Renderer(style.renderer), {index: index, setParamInfo: setParamInfo})
        }
    })
})

const mapDispatchToProps = dispatch => ({
    onSelected: index => dispatch(changeStyle(index))
})

const StyleListViewer = () => {
    let res = connect(mapStateToProps, mapDispatchToProps)(StyleList)
    const dispatch = useDispatch()
    dispatch(createParam(paramInfoBuffer, paramValueBuffer))
    return res;
}

export default StyleListViewer;
