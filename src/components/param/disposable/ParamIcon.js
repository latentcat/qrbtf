import React from 'react';
import PropTypes from 'prop-types'
import '../../Qrcode.css';
import FrameworkParam from "../FrameworkParam";
import {getExactValue} from "../../../utils/util";
import ParamIconSrcViewer from "../../../containers/param/disposable/ParamIconSrcViewer";

const IconParams = ({ icon, onChange }) => {
    const { enabled, src, scale } = icon;
    const components = [];

    if (getExactValue(enabled, 0) == 3) {
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
        <FrameworkParam paramName={"启用图标"}>
            <select
                className="Qr-select"
                value={icon.enabled}
                onChange={(e) => onChange({...icon, enabled: e.target.value})}>
                <option value={0}>无</option>
                <option value={1}>微信</option>
                <option value={2}>支付宝</option>
                <option value={3}>自定义</option>
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
