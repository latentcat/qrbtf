import React from 'react';
import {ParamTypes} from "../../constant/ParamTypes";
import PropTypes from "prop-types"
import ParamTextViewer from "../../containers/param/ParamTextViewer";
import ParamSelectViewer from "../../containers/param/ParamSelectViewer";
import ParamColorViewer from "../../containers/param/ParamColorViewer";
import ParamUploadViewer from "../../containers/param/ParamUploadViewer";
import ParamCheckBoxViewer from "../../containers/param/ParamCheckBoxViewer";
import FrameworkParam from "./FrameworkParam";

const mapTypeToComponent = ({
    [ParamTypes.TEXT_EDITOR]: ParamTextViewer,
    [ParamTypes.SELECTOR]: ParamSelectViewer,
    [ParamTypes.COLOR_EDITOR]: ParamColorViewer,
    [ParamTypes.CHECK_BOX]: ParamCheckBoxViewer,
    [ParamTypes.UPLOAD_BUTTON]: ParamUploadViewer,
})

const ParamList = ({ rendererIndex, paramInfo }) => (
    paramInfo.map((item, paramIndex) => {
        return (
            <FrameworkParam key={"tr_" + rendererIndex + "_" + paramIndex} paramName={item.key}>
                {React.createElement(mapTypeToComponent[item.type], {
                    rendererIndex: rendererIndex,
                    paramIndex: paramIndex
                })}
            </FrameworkParam>
        );
    })
)

ParamList.propTypes = {
    rendererIndex: PropTypes.number.isRequired,
    paramInfo: PropTypes.array
}

export default ParamList;
