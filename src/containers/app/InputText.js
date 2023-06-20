import {connect} from 'react-redux';
import {genQRInfo} from "../../actions";
import React, {useRef} from "react";
import {isPicture} from "../../utils/imageUtils";
import {decodeData} from "../../utils/qrcodeHandler";
import { handleUpload, handleInputUrl } from "../../utils/gaHelper";

const InputText = ({dispatch}) => {
    const textRef = useRef();

    return (
        <React.Fragment>
            <div className="Qr-input-upload-div">
                <div className="Qr-input-upload">
                    <label
                        htmlFor="image_scanner"
                        className="Qr-upload"
                        style={{textAlign: "center"}}
                    >
                        <svg className="Qr-upload-svg" version="1.1" id="图层_1" zoomAndPan="disable"
                             xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                             viewBox="0 -5 30 40" preserveAspectRatio="none">
                            <g className="st0">
                                <line x1="15" y1="0" x2="15" y2="30"/>
                                <line x1="25" y1="10" x2="15" y2="0"/>
                                <line x1="5" y1="10" x2="15" y2="0"/>
                            </g>
                        </svg>
                    </label>
                    <input
                        type="file"
                        id="image_scanner"
                        hidden={true}
                        accept=".jpg, .jpeg, .png"
                        onClick={(e) => e.target.value = null}
                        onChange={(e) => {
                            if (e.target.files.length > 0) {
                                const file = e.target.files[0];
                                if (isPicture(file)) {
                                    handleUpload();
                                    decodeData(file).then((res) => {
                                        if (res) {
                                            textRef.current.value = res.data;
                                            console.log(res.data)
                                            dispatch(genQRInfo(res.data))
                                        }
                                    }).catch(console.err);
                                }
                            }
                        }}
                    />
                    <input
                        className="Qr-input big-input"
                        placeholder="https://qrbtf.com"
                        ref={textRef}
                        onBlur={(e) => {
                            handleInputUrl();
                            dispatch(genQRInfo(e.target.value))
                        }}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                dispatch(genQRInfo(e.target.value));
                                handleInputUrl();
                                e.target.blur();
                            }
                        }}
                    />
                </div>
                <div className="Qr-input-hint">
                    上传普通二维码或输入网址
                </div>
                <a className="Qr-new-discord" href="https://discord.gg/V9CNuqYfte" target='_blank'>
                    New! Click to join our Discord，AI QR code coming soon!
                </a>
            </div>
        </React.Fragment>);
}

export default connect()(InputText);
