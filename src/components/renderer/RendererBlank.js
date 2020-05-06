import React from "react";
import PropTypes from 'prop-types';
import {defaultRenderer} from "../../utils/util";

const RendererBlank = ({ qrcode }) => (
    defaultRenderer(qrcode, [])
);

RendererBlank.prototype = {
    qrcode: PropTypes.object.isRequired
}

export default RendererBlank;
