import React from "react";
import './Qrcode.css'

function RandomNum(Min,Max){
    const Random = Max - Min;
    const random = Math.random();
    const num = Min + random * Random;
    return num;
}

function listPoint(props) {
    if (!props.qrcode) return []

    const qrcode = props.qrcode;
    const nCount = qrcode.getModuleCount();
    const position = qrcode.getPositionTable();
    const pointList = new Array(nCount);
    let id = 0;
    var sizeTable = new Array();         //先声明一维
    for (let i = 0; i < nCount; i++) {          //一维长度为5
        sizeTable[i] = new Array(i);    //在声明二维
        for (let j = 0; j < nCount; j++) {      //二维长度为5
            sizeTable[i][j] = RandomNum(0.33,1);
        }
    }
    var nearPoint = new Array();
    for (let i = 0; i < nCount; i++) {          //一维长度为5
        nearPoint[i] = new Array(i);    //在声明二维
        for (let j = 0; j < nCount; j++) {//二维长度为5
            nearPoint[i][j] = false;
        }
    }
    var nearBigPoint = new Array();
    for (let i = 0; i < nCount; i++) {          //一维长度为5
        nearBigPoint[i] = new Array(i);    //在声明二维
        for (let j = 0; j < nCount; j++) {//二维长度为5
            nearBigPoint[i][j] = false;
        }
    }
    for (let i = 0; i < position.length; i++) {
        for (let r = -2; r <= 2; r++) {
            for (let c = -2; c <= 2; c++) {
                if (r == -2 || r == 2 || c == -2 || c == 2
                    || (r == 0 && c == 0) ) {
                    nearPoint[position[i][0] + r][position[i][1] + c] = true;
                    sizeTable[position[i][0] + r][position[i][1] + c] = 0.8;
                } else {
                    nearPoint[position[i][0] + r][position[i][1] + c] = true;
                }
            }
        }
    }
    for (let i = 8; i < nCount - 7; i++) {
        sizeTable[i][6] = 0.8;
        sizeTable[6][i] = 0.8;
    }
    const bigPosition = [[3, 3], [3, nCount - 4], [nCount - 4, 3]];
    for (let i = 0; i < bigPosition.length; i++) {
        for (let r = -3; r <= 3; r++) {
            for (let c = -3; c <= 3; c++) {
                if (r == -3 || r == 3 || c == -3 || c == 3
                    || (r <= 1 && r >= -1 && c <= 1 && c >= -1) ) {
                    nearBigPoint[bigPosition[i][0] + r][bigPosition[i][1] + c] = true;
                } else {
                    nearBigPoint[bigPosition[i][0] + r][bigPosition[i][1] + c] = true;
                }
            }
        }
    }
    for (let row = 0; row < nCount; row++) {
        for (let col = 0; col < nCount; col++) {
            if (qrcode.isDark(row, col) && nearBigPoint[row][col] === false)
                pointList.push(<circle key={id++} fill="black" cx={row + 0.5} cy={col + 0.5} r={0.5 * sizeTable[row][col]} />)
        }
        const vw = [3, -3];
        const vh = [3, -3];
        for (let i = 0; i < bigPosition.length; i++) {
            pointList.push(<circle key={id++} fill="black" cx={bigPosition[i][0] + 0.5} cy={bigPosition[i][1] + 0.5} r={1.5} />)
            pointList.push(<circle key={id++} fill="none" strokeWidth="0.15" strokeDasharray="0.5,0.5" stroke="currentColor"  cx={bigPosition[i][0] + 0.5} cy={bigPosition[i][1] + 0.5} r={3} />)
            for (let w = 0; w < vw.length; w++) {
                pointList.push(<circle key={id++} fill="black" cx={bigPosition[i][0] + vw[w] + 0.5} cy={bigPosition[i][1] + 0.5} r={0.5} />)
            }
            for (let h = 0; h < vh.length; h++) {
                pointList.push(<circle key={id++} fill="black" cx={bigPosition[i][0] + 0.5} cy={bigPosition[i][1] + vh[h] + 0.5} r={0.5} />)
            }
        }
    }
    return pointList;
}

function calViewBox(props) {
    if (!props.qrcode) return '0 0 0 0';

    const nCount = props.qrcode.getModuleCount();
    return String(-nCount / 5) + ' ' + String(-nCount / 5) + ' ' + String(nCount + nCount / 5 * 2) + ' ' + String(nCount + nCount / 5 * 2);
}

class QrRendererRound extends React.Component {
    render() {
        return (
            <svg className="Qr-item-svg" width="100%" height="100%" viewBox={calViewBox(this.props)} enableBackground={calViewBox(this.props)} fill="white"
                 xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                {listPoint(this.props)}
            </svg>
        );
    }
}

export default QrRendererRound
