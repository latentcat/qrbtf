import React from 'react';
import PropTypes from 'prop-types'
import '../Qrcode.css';

const ParamUpload = ({ rendererIndex, paramIndex, onChange }) => (
    <React.Fragment>
        <label
            htmlFor="image_upload"
            key={"label_" + rendererIndex + "_" + paramIndex}
            className="dl-btn ul-btn"
            style={{textAlign: "center"}}
        >
            上传图片
        </label>
        <input
            type="file"
            key={"input_" + rendererIndex + "_" + paramIndex}
            id="image_upload"
            hidden={true}
            accept="image/*"
            onChange={onChange}
        />
    </React.Fragment>
)

ParamUpload.propTypes = {
    rendererIndex: PropTypes.number.isRequired,
    paramIndex: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
}

export default ParamUpload;
