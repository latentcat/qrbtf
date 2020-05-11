import React from 'react';
import PropTypes from 'prop-types';
import {SliderPicker} from 'react-color';
import '../Qrcode.css';

const ParamColor = ({ rendererIndex, paramIndex, value, onChange }) => (
    <SliderPicker
        key={"input_" + rendererIndex + "_" + paramIndex}
        className="Qr-color-picker"
        color={value}
        onChangeComplete={onChange}
    />
)

ParamColor.propTypes = {
    rendererIndex: PropTypes.number.isRequired,
    paramIndex: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default ParamColor;
