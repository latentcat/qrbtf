import React from 'react';
import PropTypes from 'prop-types'
import '../Qrcode.css';

const ParamText = ({ rendererIndex, paramIndex, value, onBlur, onKeyPress }) => (
    <input
        type="number"
        key={"input_" + rendererIndex + "_" + paramIndex}
        className="Qr-input small-input"
        placeholder={value}
        defaultValue={value}
        onBlur={onBlur}
        onKeyPress={onKeyPress}
        />
)

ParamText.propTypes = {
    rendererIndex: PropTypes.number.isRequired,
    paramIndex: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onKeyPress: PropTypes.func.isRequired
}

export default ParamText;
