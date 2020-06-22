import React from "react";
import PropTypes from 'prop-types'
import '../Qrcode.css';
import LinkTrace from "./LinkTrace";

const LinkButton = ({ href, value }) => (
    <LinkTrace href={href} rel="noopener noreferrer" target="_blank">
        <button className="dl-btn">{value}</button>
    </LinkTrace>
)

LinkButton.propTypes = {
    href: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
}

export default LinkButton;
