import React, {useState} from 'react';
import reactCSS from 'reactcss';
import PropTypes from 'prop-types';
import { TwitterPicker } from 'react-color';
import '../Qrcode.css';

const ParamColor = ({ rendererIndex, paramIndex, value, onChange }) => {
    const [displayColorPicker, setDisplay] = useState(false);
    const styles = reactCSS({
        'default': {
            btn: {
                borderColor: displayColorPicker ? '#44D7B6' : null,
                color: displayColorPicker ? '#44D7B6' : null
            },
            container: {
                position: 'relative',
            },
            popover: {
                marginTop: '10px',
                position: 'absolute',
                right: '0',
                zIndex: '2',
            },
            cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
            },
        },
    });

    return (
        <div style={styles.container}>
            <button className="dl-btn" style={styles.btn} onClick={ () => setDisplay(!displayColorPicker) }>
                选择颜色
            </button>
            {
                displayColorPicker ?
                    <div style={styles.popover}>
                        <div style={styles.cover} onClick={() => setDisplay(false)} />
                        <TwitterPicker
                            key={"input_" + rendererIndex + "_" + paramIndex}
                            triangle="hide"
                            color={value}
                            colors={['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF']}
                            onChangeComplete={onChange}
                        />
                    </div>
                    :
                    null
            }
        </div>
    );
}

ParamColor.propTypes = {
    rendererIndex: PropTypes.number.isRequired,
    paramIndex: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default ParamColor;
