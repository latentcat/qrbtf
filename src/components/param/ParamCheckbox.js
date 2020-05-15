import React from 'react';
import PropTypes from 'prop-types'
import '../Qrcode.css';

const ParamCheckBox = ({ rendererIndex, paramIndex, value, onChange }) => (
    <input
        type="checkbox"
        className="Qr-checkbox"
        key={"checkbox_" + rendererIndex + "_" + paramIndex}
        checked={value}
        onChange={onChange}>
    </input>
)

ParamCheckBox.propTypes = {
    rendererIndex: PropTypes.number.isRequired,
    paramIndex: PropTypes.number.isRequired,
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
}

export default ParamCheckBox;
