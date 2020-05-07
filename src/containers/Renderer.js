import React from "react";
import { connect } from 'react-redux';
import {createParam} from "../actions";

const mapStateToProps = (state, ownProps) => ({
    qrcode: state.qrcode,
    params: state.paramValue[ownProps.index],
    rendererIndex: ownProps.index
})

const mapDispatchToProps = (dispatch) => ({
    setParamInfo: (index, params) => dispatch(createParam(index, params)),
})

export default function Renderer(WrappedRenderer) {
    return connect(mapStateToProps, mapDispatchToProps)(WrappedRenderer)
}
