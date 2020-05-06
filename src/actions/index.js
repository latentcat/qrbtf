export const actionTypes = {
    GENERATE_QR_INFO: 'GENERATE_QR_INFO',
    CHANGE_STYLE: 'CHANGE_STYLE'
}

export const genQRInfo = text => ({
    type: actionTypes.GENERATE_QR_INFO,
    text
})

export const changeStyle = index => ({
    type: actionTypes.CHANGE_STYLE,
    index
})
