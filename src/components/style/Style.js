import React from "react";
import PropTypes from 'prop-types'

function calClassName(selected) {
    if (selected === true) return 'Qr-item Qr-item-selected';
    return 'Qr-item';
}

const Style = ({ value, renderer, selected, details, onSelected }) => (
    <div className={calClassName(selected)}
         onClick={onSelected}>
        <div className="Qr-item-image">
            <div className="Qr-item-image-inner">
                {renderer}
            </div>
        </div>
        <div className="Qr-item-detail">
            {value}
        </div>
        <div className="Qr-item-desc">
            <div className="Qr-item-desc-inner">
                {details}
            </div>
        </div>
    </div>
);

Style.propTypes = {
    value: PropTypes.string.isRequired,
    renderer: PropTypes.object.isRequired,
    selected: PropTypes.bool.isRequired,
    onSelected: PropTypes.func.isRequired
}

export default Style;
