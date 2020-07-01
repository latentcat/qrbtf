import React, {useEffect, useState} from 'react';
import './App.css';
import StyleListViewer from "../../containers/style/StyleListViewer";
import {isPC} from "../../utils/navigatorUtils";
import ScrollContainer from 'react-indiana-drag-scroll'
import {handleScroll} from "../../utils/gaHelper";

const PartStyles = ({ setParamInfo }) => {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        setLoaded(true);
    }, [])

    const styleList = React.createElement(StyleListViewer({setParamInfo}))

    return (<div className="Qr-titled" id="Qr-style">
        <div className="Qr-Centered title-margin">
            <div className="Qr-s-title">Styles</div>
            <div className="Qr-s-subtitle Qr-rel">
                点击选择样式
                {isPC() ? <div className="Qr-style-hint">拖拽滑动</div> : null}
            </div>
        </div>
        <ScrollContainer
            className="Qr-s"
            onStartScroll={(e) => handleScroll('style')}
            hideScrollbars={false}
            horizontal={true}
            vertical={false}
            style={{visibility: loaded ? "visible" :"hidden"}}>
            {styleList}
        </ScrollContainer>
    </div>)
}

export default PartStyles;
