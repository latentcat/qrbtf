import React from 'react';
import PropTypes from 'prop-types'
import '../../Qrcode.css';
import FrameworkParam from "../FrameworkParam";
import {getExactValue} from "../../../utils/util";
import ParamTitleColorViewer from "../../../containers/param/disposable/ParamTitleColorViewer";

const TitleParams = ({ title, onChange }) => {
    const { enabled, text, color, size, align } = title;
    if (getExactValue(enabled, 0)) {
        return (
            <React.Fragment>
                <FrameworkParam paramName={"标题内容"}>
                    <input
                        type="text"
                        className="Qr-input small-input"
                        value={text}
                        onChange={(e) => onChange({...title, text: e.target.value})}
                    />
                </FrameworkParam>
                <FrameworkParam paramName={"标题颜色"}>
                    <ParamTitleColorViewer title={title} onChange={onChange}/>
                </FrameworkParam>
                <FrameworkParam paramName={"标题大小"}>
                    <input
                        type="number"
                        className="Qr-input small-input"
                        value={size}
                        onChange={(e) => onChange({...title, size: e.target.value})}
                    />
                </FrameworkParam>
                <FrameworkParam paramName={"标题对齐"}>
                    <select
                        className="Qr-select"
                        value={title.align}
                        onChange={(e) => onChange({...title, align: e.target.value})}>
                        <option value={"middle"}>中间</option>
                        <option value={"bottom"}>底部</option>
                    </select>
                </FrameworkParam>
            </React.Fragment>
        )
    }
    return null;
}

const ParamTitle = ({title, onChange}) => (
    <React.Fragment>
        <FrameworkParam paramName={"启用标题"}>
            <select
                className="Qr-select"
                value={title.enabled}
                onChange={(e) => onChange({...title, enabled: e.target.value})}>
                <option value={0}>否</option>
                <option value={1}>是</option>
            </select>
        </FrameworkParam>
        <TitleParams title={title} onChange={onChange}/>
    </React.Fragment>
)

ParamTitle.propTypes = {
    title: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
}

export default ParamTitle;
