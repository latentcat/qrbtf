import {actionTypes} from "../constant/ActionTypes";

export const genQRInfo = text => ({
    type: actionTypes.GENERATE_QR_INFO,
    text
})

export const changeStyle = index => ({
    type: actionTypes.CHANGE_STYLE,
    index
})

export const createParam = (paramInfo, paramValue) => ({
    type: actionTypes.CREATE_PARAM,
    paramInfo, paramValue
})

export const changeParam = (rendererIndex, paramIndex, value) => ({
    type: actionTypes.CHANGE_PARAM,
    rendererIndex, paramIndex, value
})
