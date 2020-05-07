import { combineReducers } from "redux";
import {getQrcodeData} from "../utils/qrcodeHandler";
import {actionTypes} from "../constant/ActionTypes";

const initialState = {
    selectedIndex: 0,
    qrcode: null,
    paramInfo: new Array(16).fill(new Array(16)),
    paramValue: new Array(16).fill(new Array(16))
}

export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GENERATE_QR_INFO: {
            return Object.assign({}, state, {
                qrcode: getQrcodeData({text: action.text})
            });
        }
        case actionTypes.CHANGE_STYLE: {
            return Object.assign({}, state, {
                selectedIndex: action.index
            });
        }
        case actionTypes.CREATE_PARAM: {
            return Object.assign({}, state, {
                paramInfo: Object.assign([], [...state.paramInfo], {
                    [action.rendererIndex]: action.params
                }),
                paramValue: Object.assign([], [...state.paramValue], {
                    [action.rendererIndex]: action.params.map(obj => obj.default)
                })
            });
        }
        case actionTypes.CHANGE_PARAM: {
            return Object.assign({}, state, {
                paramValue: Object.assign([], [...state.paramValue], {
                    [action.rendererIndex]:
                        Object.assign([], [...state.paramValue[action.rendererIndex]], {
                        [action.paramIndex]: action.value
                    })
                })
            });
        }
        default: return state
    }
}

