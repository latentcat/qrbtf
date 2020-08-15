import {actionTypes} from "../constant/ActionTypes";
import {handleStyle} from "../utils/gaHelper";

export const genQRInfo = text => ({
    type: actionTypes.GENERATE_QR_INFO,
    text
})

export const changeStyle = (rendererIndex, rendererType, value) => {
    handleStyle(value);
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

export const changeParam = (rendererIndex, paramIndex, value) => {

    return {
        type: actionTypes.CHANGE_PARAM,
        rendererIndex, paramIndex, value
    };
}

export const loadDownloadData = (data) => ({
    type: actionTypes.LOAD_DOWNLOAD_DATA,
    data
})

export const changeTitle = (title) => {
    return {
        type: actionTypes.CHANGE_TITLE,
        title
    }
}

export const changeIcon = (icon) => {
    return {
        type: actionTypes.CHANGE_ICON,
        icon
    }
}
