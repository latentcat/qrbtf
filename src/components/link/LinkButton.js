import React from "react";
import PropTypes from 'prop-types'
import '../Qrcode.css';
import {handleLink} from "../../utils/gaHelper";

const LinkButton = ({ href, value }) => (
    <a onClick={ (e) =>  handleLink(href)  } href={href} rel="noopener noreferrer" target="_blank">
        <button className="dl-btn">{value}</button>
    </a>
)

LinkButton.propTypes = {
    href: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
}

export default LinkButton;
