import {actionTypes} from "../constant/ActionTypes";
import ReactGA from "react-ga";

export const genQRInfo = text => ({
    type: actionTypes.GENERATE_QR_INFO,
    text
})

export const changeStyle = (rendererIndex, rendererType, value) => {
    ReactGA.event({
        category: 'Style',
        action: 'Switch',
        value: value
    });

    return {
        type: actionTypes.CHANGE_STYLE,
        rendererIndex, rendererType, value
    }
}

export const changeCorrectLevel = (correctLevel) => ({
    type: actionTypes.CHANGE_CORRECT_LEVEL,
    correctLevel
})

export const createParam = (paramInfo, paramValue) => ({
    type: actionTypes.CREATE_PARAM,
    paramInfo, paramValue
})

export const changeParam = (rendererIndex, paramIndex, value) => ({
    type: actionTypes.CHANGE_PARAM,
    rendererIndex, paramIndex, value
})

export const loadDownloadData = (data) => ({
    type: actionTypes.LOAD_DOWNLOAD_DATA,
    data
})
