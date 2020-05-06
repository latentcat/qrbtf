import React from 'react';
import PropTypes from 'prop-types';

const InputInfo = ({ onChange, onBlur, onKeyPress }) => (
    <div className="Qr-Centered">
        <input
            className="Qr-input big-input"
            placeholder="Input your URL here"
            onChange={onChange}
            onBlur={onBlur}
            onKeyPress={onKeyPress}
        />
    </div>
)

InputInfo.propTypes = {
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    onKeyPress: PropTypes.func.isRequired
}

export default InputInfo
