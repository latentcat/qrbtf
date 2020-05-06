import { combineReducers } from "redux";
import {actionTypes} from "../actions";
import {getQrcodeData} from "../utils/qrcodeHandler";

const initialState = {
    selectedIndex: 0,
    qrcode: null
}

export default function appReducer(state = initialState, action) {
    console.log(state)
    switch (action.type) {
        case actionTypes.GENERATE_QR_INFO: {
            return Object.assign({}, state, {
                qrcode: getQrcodeData({text: action.text})
            });
        }
        case actionTypes.CHANGE_STYLE: {
            return Object.assign({}, state, {
                selectedIndex: action.index
            })
        }
        default: return state
    }
}

