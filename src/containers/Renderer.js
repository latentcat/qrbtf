import {connect} from 'react-redux';
import * as React from "react";

const mapStateToProps = (state, ownProps) => ({
    qrcode: state.qrcode,
    params: state.paramValue[ownProps.index],
    rendererIndex: ownProps.index
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    setParamInfo: (params) => ownProps.setParamInfo(ownProps.index, params)
})

export default function Renderer(WrappedRenderer) {
    return connect(mapStateToProps, mapDispatchToProps)(WrappedRenderer)
}
