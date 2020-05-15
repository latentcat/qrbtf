import {getQrcodeData} from "../utils/qrcodeHandler";
import {actionTypes} from "../constant/ActionTypes";
import {QRBTF_URL} from "../constant/References";
import RendererBase from "../components/renderer/RendererBase";
import {getExactValue} from "../utils/util";

const initialState = {
    selectedIndex: 0,
    value: 'A1',
    rendererType: RendererBase,
    correctLevel: 0,
    textUrl: QRBTF_URL,
    history: [],
    qrcode: getQrcodeData({text: QRBTF_URL, correctLevel: 0}),
    paramInfo: new Array(16).fill(new Array(16)),
    paramValue: new Array(16).fill(new Array(16))
}

export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GENERATE_QR_INFO: {
            let text = action.text;
            if (!text || text.length == 0) text = QRBTF_URL;
            return Object.assign({}, state, {
                textUrl: text,
                qrcode: getQrcodeData({text: text, correctLevel: state.correctLevel})
            });
        }
        case actionTypes.CHANGE_STYLE: {
            return Object.assign({}, state, {
                value: action.value,
                rendererType: action.rendererType,
                selectedIndex: action.rendererIndex,
                history: state.history.slice().concat(action.value)
            });
        }
        case actionTypes.CHANGE_CORRECT_LEVEL: {
            return Object.assign({}, state, {
                correctLevel: parseInt(action.correctLevel),
                qrcode: getQrcodeData({text: state.textUrl, correctLevel: parseInt(action.correctLevel)})
            })
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
                    newItem[action.paramIndex] = getExactValue(action.value, state.paramInfo[action.rendererIndex][action.paramIndex].default);
                    return newItem;
                })
            });
        }
        default: return state
    }
}

