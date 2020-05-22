import { connect } from 'react-redux';
import {changeParam} from "../../actions";
import ParamUpload from "../../components/param/ParamUpload";
import {isPicture, toBase64} from "../../utils/imageUtils";

const mapStateToProps = (state, ownProps) => ({
    rendererIndex: ownProps.rendererIndex,
    paramIndex: ownProps.paramIndex,
    value: state.paramValue[ownProps.rendererIndex][ownProps.paramIndex],
    info: state.paramInfo[ownProps.rendererIndex][ownProps.paramIndex],
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChange: (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            if (isPicture(file)) {
                toBase64(file, 500, 500).then(res => {
                    dispatch(changeParam(ownProps.rendererIndex, ownProps.paramIndex, res))
                })
            }
        }
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ParamUpload);
