import React from 'react';
import PropTypes from 'prop-types'
import '../../Qrcode.css';
import FrameworkParam from "../FrameworkParam";
import {getExactValue} from "../../../utils/util";
import ParamIconSrcViewer from "../../../containers/param/disposable/ParamIconSrcViewer";

const IconParams = ({ icon, onChange }) => {
    const { enabled, src, scale } = icon;
    if (getExactValue(enabled, 0)) {
        return (
            <React.Fragment>
                <FrameworkParam paramName={"图标源"}>
                    <ParamIconSrcViewer icon={icon} onChange={onChange}/>
                </FrameworkParam>
                <FrameworkParam paramName={"图标缩放"}>
                    <input
                        type="number"
                        className="Qr-input small-input"
                        value={scale}
                        onChange={(e) => onChange({...icon, scale: e.target.value})}
                    />
                </FrameworkParam>
            </React.Fragment>
        )
    }
    return null;
}

const ParamIcon = ({icon, onChange}) => (
    <React.Fragment>
        <FrameworkParam paramName={"启用图标"}>
            <select
                className="Qr-select"
                value={icon.enabled}
                onChange={(e) => onChange({...icon, enabled: e.target.value})}>
                <option value={0}>否</option>
                <option value={1}>是</option>
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
