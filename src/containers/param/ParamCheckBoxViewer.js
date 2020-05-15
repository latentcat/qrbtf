import { connect } from 'react-redux';
import {changeParam} from "../../actions";
import ParamCheckBox from "../../components/param/ParamCheckbox";

const mapStateToProps = (state, ownProps) => ({
    rendererIndex: ownProps.rendererIndex,
    paramIndex: ownProps.paramIndex,
    value: state.paramValue[ownProps.rendererIndex][ownProps.paramIndex],
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChange: (e) => {
        dispatch(changeParam(ownProps.rendererIndex, ownProps.paramIndex, e.target.checked))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ParamCheckBox);
