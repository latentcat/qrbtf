import { connect } from 'react-redux';
import { genQRInfo } from "../actions";
import React from "react";

const InputText = ({ dispatch }) => (
    <div className="Qr-Centered">
        <input
            className="Qr-input big-input"
            placeholder="Input your URL here"
            onBlur={e => dispatch(genQRInfo(e.target.value))}
            onKeyPress={(e) => {if(e.key === 'Enter') dispatch(genQRInfo(e.target.value))}}
        />
    </div>
)

export default connect()(InputText);
