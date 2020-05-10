import { connect } from 'react-redux';
import {changeParam} from "../../actions";
import ParamColor from "../../components/param/ParamColor";

const mapStateToProps = (state, ownProps) => ({
    rendererIndex: ownProps.rendererIndex,
    paramIndex: ownProps.paramIndex,
    value: state.paramValue[ownProps.rendererIndex][ownProps.paramIndex]
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChange: (color) => {
        dispatch(changeParam(ownProps.rendererIndex, ownProps.paramIndex, color.hex))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ParamColor);
