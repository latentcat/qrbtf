import { connect } from 'react-redux';
import React from 'react';
import ReactDOMServer from 'react-dom/server'
import DownloadButton from "../../components/download/DownloadButton";
import {saveSvg} from "../../utils/downloader";
import {increaseDownloadData, recordDownloadDetail} from "../../api/db";
import {getParamDetailedValue} from "../../utils/util";

const mapStateToProps = (state) => ({
    value: 'SVG',
    onClick: () => {
        const el = React.createElement(state.rendererType, {
            qrcode: state.qrcode,
            params: state.paramValue[state.selectedIndex],
            setParamInfo: () => {}
        });
        saveSvg(state.value, ReactDOMServer.renderToString(el));
        increaseDownloadData(state.value)
        recordDownloadDetail({
            text: state.textUrl,
            value: state.value,
            type: 'svg',
            params: state.paramInfo[state.selectedIndex].map((item, index) => {
                return {
                    key: item.key,
                    value: getParamDetailedValue(item, state.paramValue[state.selectedIndex][index])
                }
            }),
            history: state.history
        });
    }
});

export default connect(mapStateToProps, null)(DownloadButton)
