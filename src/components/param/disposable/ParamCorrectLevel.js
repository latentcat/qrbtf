import React from 'react';
import PropTypes from 'prop-types'
import '../../Qrcode.css';
import FrameworkParam from "../FrameworkParam";

const ParamCorrectLevel = ({value, onChange}) => (
    <FrameworkParam paramName={"容错率"}>
        <select
            className="Qr-select"
            value={value}
            onChange={onChange}>
            <option value={1}>7%</option>
            <option value={0}>15%</option>
            <option value={3}>25%</option>
            <option value={2}>30%</option>
        </select>
    </FrameworkParam>
)

ParamCorrectLevel.propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
}

export default ParamCorrectLevel;
