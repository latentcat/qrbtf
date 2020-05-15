import React from 'react';
import {ParamTypes} from "../../constant/ParamTypes";
import PropTypes from "prop-types"
import ParamTextViewer from "../../containers/param/ParamTextViewer";
import ParamSelectViewer from "../../containers/param/ParamSelectViewer";
import ParamColorViewer from "../../containers/param/ParamColorViewer";
import ParamUploadViewer from "../../containers/param/ParamUploadViewer";
import ParamCheckBoxViewer from "../../containers/param/ParamCheckBoxViewer";

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
            <table className="Qr-table" key={"tr_" + rendererIndex + "_" + paramIndex}>
                <tbody>
                    <tr>
                        <td>{item.key}</td>
                        <td>
                            {React.createElement(mapTypeToComponent[item.type], {
                                rendererIndex: rendererIndex,
                                paramIndex: paramIndex
                            })}
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    })
)

ParamList.propTypes = {
    rendererIndex: PropTypes.number.isRequired,
    paramInfo: PropTypes.array
}

export default ParamList;
