import {encodeData} from "../utils/qrcodeHandler";
import {actionTypes} from "../constant/ActionTypes";
import {QRBTF_URL} from "../constant/References";
import {getExactValue} from "../utils/util";
import {RendererRect} from "../components/renderer/RendererBase";

const initialState = {
    selectedIndex: 0,
    value: 'A1',
    rendererType: RendererRect,
    correctLevel: 0,
    textUrl: QRBTF_URL,
    history: [],
    downloadData: [],
    qrcode: encodeData({text: QRBTF_URL, correctLevel: 0}),
    icon: { enabled: 0, src: '', scale: 22 },
    title: { enabled: 0, text: '', color: 'black', size: 20, align: 'middle'},
    paramInfo: new Array(16).fill(new Array(16)),
    paramValue: new Array(16).fill(new Array(16))
}

export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GENERATE_QR_INFO: {
            let text = action.text;
            if (!text || text.length === 0) text = QRBTF_URL;
            return Object.assign({}, state, {
                textUrl: text,
                qrcode: encodeData({text: text, correctLevel: state.correctLevel})
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
                qrcode: encodeData({text: state.textUrl, correctLevel: parseInt(action.correctLevel)})
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
                    if (index !== action.rendererIndex) {
                        return item;
                    }

                    const newItem = item.slice();
                    newItem[action.paramIndex] = getExactValue(action.value, state.paramInfo[action.rendererIndex][action.paramIndex].default);
                    return newItem;
                })
            });
        }
        case actionTypes.LOAD_DOWNLOAD_DATA: {
            return Object.assign({}, state, {
                downloadData: action.data
            });
        }
        case actionTypes.CHANGE_TITLE: {
            return Object.assign({}, state, {
                title: Object.assign({}, state.title, action.title)
            });
        }
        case actionTypes.CHANGE_ICON: {
            return Object.assign({}, state, {
                icon: Object.assign({}, state.icon, action.icon)
            });
        }
        default: return state
    }
}

