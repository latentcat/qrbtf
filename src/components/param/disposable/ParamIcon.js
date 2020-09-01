import React from 'react';
import PropTypes from 'prop-types'
import '../../Qrcode.css';
import FrameworkParam from "../FrameworkParam";
import {getExactValue} from "../../../utils/util";
import ParamIconSrcViewer from "../../../containers/param/disposable/ParamIconSrcViewer";

const IconParams = ({ icon, onChange }) => {
    const { enabled, src, scale } = icon;
    const components = [];

    if (getExactValue(enabled, 0) == 1) {
        components.push(
            <FrameworkParam paramName={"图标源"}>
                <ParamIconSrcViewer icon={icon} onChange={onChange}/>
            </FrameworkParam>
        );
    }

    if (getExactValue(enabled, 0) != 0) {
        components.push(
            <FrameworkParam paramName={"图标缩放"}>
                <input
                    type="number"
                    className="Qr-input small-input"
                    value={scale}
                    onChange={(e) => onChange({...icon, scale: e.target.value})}
                />
            </FrameworkParam>
        )
    }
    return components;
}

const ParamIcon = ({icon, onChange}) => (
    <React.Fragment>
        <FrameworkParam paramName={"图标"}>
            <select
                className="Qr-select"
                value={icon.enabled}
                onChange={(e) => onChange({...icon, enabled: e.target.value})}>
                <option value={0}>无</option>
                <option value={1}>自定义</option>
                <option value={2}>微信 — 小</option>
                <option value={3}>微信</option>
                <option value={4}>微信支付</option>
                <option value={5}>支付宝</option>
            </select>
        </FrameworkParam>
        <IconParams icon={icon} onChange={onChange}/>
    </React.Fragment>
)

ParamIcon.propTypes = {
    icon: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
}

export default ParamIcon;
