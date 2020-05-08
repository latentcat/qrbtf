import React from 'react';
import PropTypes from 'prop-types'
import '../Qrcode.css';

const ParamList = ({ rendererIndex, paramIndex, value, info, onChange }) => (
    <select
        className="Qr-select"
        key={"select_" + rendererIndex + "_" + paramIndex}
        value={value}
        onChange={onChange}>
        {
            info.choices.map((choice, index) => {
                return (
                    <option key={"option_" + rendererIndex + "_" + paramIndex + "_" + index } value={index}>
                        {choice}
                    </option>
                );
            })
        }
    </select>
)

ParamList.propTypes = {
    rendererIndex: PropTypes.number.isRequired,
    paramIndex: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    info: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
}

export default ParamList;
