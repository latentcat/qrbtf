import { connect } from 'react-redux';
import {changeParam} from "../../actions";
import ParamSelect from "../../components/param/ParamSelect";

const mapStateToProps = (state, ownProps) => ({
    rendererIndex: ownProps.rendererIndex,
    paramIndex: ownProps.paramIndex,
    value: state.paramValue[ownProps.rendererIndex][ownProps.paramIndex],
    info: state.paramInfo[ownProps.rendererIndex][ownProps.paramIndex],
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChange: (e) => {
        dispatch(changeParam(ownProps.rendererIndex, ownProps.paramIndex, e.target.value))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ParamSelect);
