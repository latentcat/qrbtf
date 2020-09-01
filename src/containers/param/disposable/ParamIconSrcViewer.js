import { connect } from 'react-redux';
import {isPicture, toBase64} from "../../../utils/imageUtils";
import ParamUpload from "../../../components/param/ParamUpload";

const mapStateToProps = (state, ownProps) => ({
    rendererIndex: -1,
    paramIndex: -1,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChange: (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            if (isPicture(file)) {
                toBase64(file, 1.0).then(res => {
                    ownProps.onChange({ ...ownProps.icon, src: res})
                })
            }
        }
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ParamUpload);
