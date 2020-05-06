import React from "react";
import { connect } from 'react-redux';
import {changeStyle} from "../actions";

const mapStateToProp = state => ({
    qrcode: state.qrcode
})

const mapDispatchToProps = dispatch => ({
})

export default function Renderer(WrappedRenderer) {
    return connect(mapStateToProp, mapDispatchToProps())(WrappedRenderer)
}
