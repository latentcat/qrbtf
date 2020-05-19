import {connect} from 'react-redux';
import {genQRInfo} from "../../actions";
import React, {useRef} from "react";
import {isPicture} from "../../utils/util";
import {decodeData} from "../../utils/qrcodeHandler";

const InputText = ({dispatch}) => {
    const textRef = useRef();

    return (
        <React.Fragment>
            <div className="Qr-input-upload">
                <input
                    className="Qr-input big-input"
                    placeholder="Input your URL here"
                    ref={textRef}
                    onBlur={e => dispatch(genQRInfo(e.target.value))}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            dispatch(genQRInfo(e.target.value));
                            e.target.blur();
                        }
                    }}
                />
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
            </div>
        </React.Fragment>);
}

export default connect()(InputText);
