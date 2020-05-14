import { connect } from 'react-redux';
import PartDownload from "../../components/app/PartDownload";
import React from "react";
import {saveImg, saveSvg} from "../../utils/downloader";
import ReactDOMServer from "react-dom/server";
import {increaseDownloadData, recordDownloadDetail} from "../../api/db";
import {getParamDetailedValue, outerHtml} from "../../utils/util";

function saveEl(state, type) {
    const el = React.createElement(state.rendererType, {
        qrcode: state.qrcode,
        params: state.paramValue[state.selectedIndex],
        setParamInfo: () => {}
    });
    increaseDownloadData(state.value)
    recordDownloadDetail({
        text: state.textUrl,
        value: state.value,
        type: type,
        params: state.paramInfo[state.selectedIndex].map((item, index) => {
            return {
                key: item.key,
                value: getParamDetailedValue(item, state.paramValue[state.selectedIndex][index])
            }
        }),
        history: state.history
    });
    return el;
}

const mapStateToProps = (state) => ({
    value: state.value,
    onSvgDownload: () => {
        // saveSvg(state.value, ReactDOMServer.renderToString(saveEl(state, 'svg')))
        saveSvg(state.value, outerHtml(state.selectedIndex))
    },
    onJpgDownload: () => {
        // return saveImg(state.value, ReactDOMServer.renderToString(saveEl(state, 'jpg')), 1500, 1500)
        return saveImg(state.value, outerHtml(state.selectedIndex), 1500, 1500)
    }
})

export default connect(mapStateToProps, null)(PartDownload)
