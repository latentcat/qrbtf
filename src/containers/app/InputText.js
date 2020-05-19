import {connect} from 'react-redux';
import {genQRInfo} from "../../actions";
import React, {useRef} from "react";
import {isPicture} from "../../utils/util";
import {decodeData} from "../../utils/qrcodeHandler";

const InputText = ({dispatch}) => {
    const textRef = useRef();

    return (
        <React.Fragment>
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
                className="dl-btn"
                style={{textAlign: "center"}}
            >
                扫描图片
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
        </React.Fragment>);
}

export default connect()(InputText);
