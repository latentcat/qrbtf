import React from 'react'
import PropTypes from 'prop-types'
import Style from "./Style";

const StyleList = ({ styles, onSelected }) => (
    <div className="Qr-box">
        {styles.map((style, index) =>
            <Style
                key={style.value}
                {...style}
                onSelected={() => onSelected(index)}
            />
        )}
    </div>
);

StyleList.propTypes = {
    styles: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string.isRequired,
        renderer: PropTypes.object.isRequired,
        selected: PropTypes.bool.isRequired
    }).isRequired).isRequired,
    onSelected: PropTypes.func.isRequired
}

export default StyleList;
