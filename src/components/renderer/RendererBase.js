import React from "react";
import {defaultViewBox} from "../../utils/util";
import {ParamTypes} from "../../constant/ParamTypes";
import {createParam} from "../../actions";

function listPoints(qrcode, params) {
    if (!qrcode) return[]

    const nCount = qrcode.getModuleCount();
    const pointList = []
    let id = 0

    for (let x = 0; x < nCount; x++) {
        for (let y = 0; y < nCount; y++) {
            if (qrcode.isDark(x, y)) {
                pointList.push(<rect key={id++} width={1} height={1} fill={"black"} x={x} y={y}/>)
            }
        }
    }
    return pointList;
}

function getParamInfo() {
    return [
        {
            type: ParamTypes.SELECTOR,
            key: '信息点样式',
            default: 0,
            choices: [
                "矩形",
                "圆形",
                "随机"
            ]
        },
        {
            type: ParamTypes.TEXT_EDITOR,
            key: '信息点缩放',
            default: 100
        },
        {
            type: ParamTypes.TEXT_EDITOR,
            key: '信息点不透明度',
            default: 100,
        },
        {
            type: ParamTypes.SELECTOR,
            key: '定位点样式',
            default: 0,
            choices: [
                "矩形",
                "圆形",
                "行星",
            ]
        },
    ];
}

export default class RendererBase extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.setParamInfo(this.props.rendererIndex, getParamInfo())
    }

    render() {
        return (
            <svg className="Qr-item-svg" width="100%" height="100%" viewBox={defaultViewBox(this.props.qrcode)} fill="white"
                 xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                {listPoints(this.props.qrcode, this.props.params)}
            </svg>
        )
    }
}

