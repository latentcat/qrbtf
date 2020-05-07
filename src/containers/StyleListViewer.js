import React from "react";
import { connect } from 'react-redux';
import {changeStyle} from "../actions";
import StyleList from "../components/style/StyleList";
import Renderer from "./Renderer";
import RendererBlank from "../components/renderer/RendererBlank";
import RendererBase from "../components/renderer/RendererBase";

const styles = [
    {value: 'A1', renderer: RendererBase},
    {value: 'A2', renderer: RendererBlank},
    {value: 'B1', renderer: RendererBlank},
    {value: 'B2', renderer: RendererBlank},
    {value: 'C1', renderer: RendererBlank},
    {value: 'C2', renderer: RendererBlank},
    {value: 'D1', renderer: RendererBlank},
]

const mapStateToProps = state => ({
    styles: styles.map((style, index) => {
        return {
            value: style.value,
            selected: state.selectedIndex == index,
            renderer: React.createElement(Renderer(style.renderer), {index: index})
        }
    })
})

const mapDispatchToProps = dispatch => ({
    onSelected: index => dispatch(changeStyle(index))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StyleList)
