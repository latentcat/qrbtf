import React from 'react';
import PropTypes from 'prop-types'
import '../Qrcode.css';

const ParamText = ({ rendererIndex, paramIndex, value, info, onBlur, onKeyPress }) => (
    <input
        type="number"
        key={"input_" + rendererIndex + "_" + paramIndex}
        className="Qr-input small-input"
        placeholder={info.default}
        defaultValue={String(value)}
        onBlur={onBlur}
        onKeyPress={onKeyPress}
        />
)

ParamText.propTypes = {
    rendererIndex: PropTypes.number.isRequired,
    paramIndex: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    info: PropTypes.object.isRequired,
    onBlur: PropTypes.func.isRequired,
    onKeyPress: PropTypes.func.isRequired
}

export default ParamText;
