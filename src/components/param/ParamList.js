import React from 'react';
import {ParamTypes} from "../../constant/ParamTypes";
import PropTypes from "prop-types"
import ParamTextViewer from "../../containers/param/ParamTextViewer";
import ParamSelectViewer from "../../containers/param/ParamSelectViewer";

const ParamList = ({ rendererIndex, paramInfo }) => (
    paramInfo.map((item, paramIndex) => {
        switch (item.type) {
            case ParamTypes.TEXT_EDITOR: {
                return (
                    <tr>
                        <td>{item.key}</td>
                        <td>
                            <ParamTextViewer rendererIndex={rendererIndex} paramIndex={paramIndex}/>
                        </td>
                    </tr>
                )
            }
            case ParamTypes.SELECTOR: {
                return (
                    <tr>
                        <td>{item.key}</td>
                        <td>
                            <ParamSelectViewer rendererIndex={rendererIndex} paramIndex={paramIndex}/>
                        </td>
                    </tr>
                )
            }
        }
    })
)

ParamList.propTypes = {
    rendererIndex: PropTypes.number.isRequired,
    paramInfo: PropTypes.array
}

export default ParamList;
