import React from "react";
import PropTypes from 'prop-types'
import '../Qrcode.css';

const LinkButton = ({ href, value }) => (
    <a href={href} rel="noopener noreferrer" target="_blank">
        <button className="dl-btn">{value}</button>
    </a>
)

LinkButton.propTypes = {
    href: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
}

export default LinkButton;
