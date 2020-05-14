import { connect } from 'react-redux';
import ParamText from "../../components/param/ParamText";
import {changeParam} from "../../actions";

const mapStateToProps = (state, ownProps) => ({
    rendererIndex: ownProps.rendererIndex,
    paramIndex: ownProps.paramIndex,
    value: state.paramValue[ownProps.rendererIndex][ownProps.paramIndex],
    info: state.paramInfo[ownProps.rendererIndex][ownProps.paramIndex]
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onBlur: (e) => dispatch(changeParam(ownProps.rendererIndex, ownProps.paramIndex, e.target.value)),
    onKeyPress: (e) => {
        if(e.key === 'Enter') {
            dispatch(changeParam(ownProps.rendererIndex, ownProps.paramIndex, e.target.value));
            e.target.blur()
        }
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ParamText);
