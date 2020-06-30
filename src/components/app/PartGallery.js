import React from 'react';
import './App.css';
import {isPC} from "../../utils/navigatorUtils";
import ScrollContainer from "react-indiana-drag-scroll";
import LazyLoad from 'react-lazy-load';

const pictures = [
    'https://7172-qrbtf-1d845d-1255694434.tcb.qcloud.la/QrbtfGallery/gallery01.jpg?sign=0e29c9617c920148f6e8061386b69de0&t=1593501253',
    'https://7172-qrbtf-1d845d-1255694434.tcb.qcloud.la/QrbtfGallery/gallery02.jpg?sign=e9619d9e70adc33f9e5da775410220f5&t=1593501268'
]

const PartGallery = () => {
    return (<div className="Qr-titled-nobg" id="Qr-style">
        <div className="Qr-Centered title-margin">
            <div className="Qr-s-title">Gallery</div>
            <div className="Qr-s-subtitle Qr-rel">
                {isPC() ? <div className="Qr-style-hint">拖拽滑动</div> : null}
            </div>
        </div>
        <ScrollContainer
            className="Qr-s"
            hideScrollbars={false}
            horizontal={true}
            vertical={false}>
            {
                pictures.map((url) => (
                        <LazyLoad offsetVertical={200}>
                            <img src={url} width={800} height={300}/>
                        </LazyLoad>
                    )
                )
            }
        </ScrollContainer>
    </div>)
}

export default PartGallery;