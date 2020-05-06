import React from "react";
import PropTypes from 'prop-types'
import '../Qrcode.css';

const DownloadButton = ({ onClick, value }) => (
    <button className="dl-btn" onClick={onClick}>
        {value}
    </button>
)

DownloadButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
}

export default DownloadButton;
