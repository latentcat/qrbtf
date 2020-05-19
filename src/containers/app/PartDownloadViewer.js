import { connect } from 'react-redux';
import PartDownload from "../../components/app/PartDownload";
import {saveImg, saveSvg} from "../../utils/downloader";
import {increaseDownloadData, recordDownloadDetail} from "../../api/db";
import {getParamDetailedValue, outerHtml} from "../../utils/util";

function saveDB(state, type) {
    increaseDownloadData(state.value)
    recordDownloadDetail({
        text: state.textUrl,
        value: state.value,
        type: type,
        params: state.paramInfo[state.selectedIndex].map((item, index) => {
            const value = getParamDetailedValue(item, state.paramValue[state.selectedIndex][index])
            if (typeof value != "string" || value.length <= 128) {
                return {
                    key: item.key,
                    value: value
                }
            }
        }),
        history: state.history
    });
}

const mapStateToProps = (state) => ({
    value: state.value,
    onSvgDownload: () => {
        saveSvg(state.value, outerHtml(state.selectedIndex))
        saveDB(state, 'svg')
    },
    onJpgDownload: () => {
        saveDB(state, 'jpg')
        return saveImg(state.value, outerHtml(state.selectedIndex), 1500, 1500)
    }
})

export default connect(mapStateToProps, null)(PartDownload)
