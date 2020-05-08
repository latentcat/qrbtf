import {getQrcodeData} from "../utils/qrcodeHandler";
import {actionTypes} from "../constant/ActionTypes";

const initialState = {
    selectedIndex: 0,
    qrcode: null,
    paramInfo: new Array(16).fill(new Array(16)),
    paramValue: new Array(16).fill(new Array(16))
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
            });
        }
        case actionTypes.CREATE_PARAM: {
            return Object.assign({}, state, {
                paramInfo: action.paramInfo,
                paramValue: action.paramValue
            })
        }
        case actionTypes.CHANGE_PARAM: {
            return Object.assign({}, state, {
                paramValue: state.paramValue.map((item, index) => {
                    if (index != action.rendererIndex) {
                        return item;
                    }

                    const newItem = item.slice();
                    newItem[action.paramIndex] = action.value;
                    return newItem;
                })
            });
        }
        default: return state
    }
}

