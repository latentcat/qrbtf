import {connect} from 'react-redux';
import PartDownload from "../../components/app/PartDownload";
import {saveImg, saveSvg} from "../../utils/downloader";
import {getDownloadCount, increaseDownloadData, recordDownloadDetail} from "../../api/TcbHandler";
import {getParamDetailedValue, outerHtml} from "../../utils/util";
import {handleDownloadJpg, handleDownloadSvg} from "../../utils/GAHelper";

function saveDB(state, type, updateDownloadData) {
    return new Promise(resolve => {
        increaseDownloadData(state.value, () => {
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
                    return {}
                }),
                history: state.history
            }, () => {
                getDownloadCount((res) => {
                    let downloadData = [];
                    res.data.forEach((item) => {
                        downloadData[item.value] = item.count;
                    });
                    updateDownloadData(downloadData);
                    resolve()
                });
            });
        });
    });
}

const mapStateToProps = (state, ownProps) => ({
    value: state.value,
    downloadCount: state.downloadData[state.value],
    onSvgDownload: () => {
        saveSvg(state.value, outerHtml(state.selectedIndex));
        saveDB(state, 'svg', ownProps.updateDownloadData);
        handleDownloadSvg(state.value);
    },
    onJpgDownload: () => {
        return new Promise(resolve => {
            saveImg(state.value, outerHtml(state.selectedIndex), 1500, 1500).then((res) => {
                saveDB(state, 'jpg', ownProps.updateDownloadData).then(() => {
                    handleDownloadJpg(state.value);
                    resolve(res)
                });
            });
        });
    }
})

export default connect(mapStateToProps, null)(PartDownload)
