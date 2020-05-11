import {connect} from "react-redux";
import PartStyles from "../../components/app/PartStyles";
import {createParam} from "../../actions";

const mapDispatchToProps = (dispatch) => ({
    setParamInfo: (paramInfo, paramValue) => dispatch(createParam(paramInfo, paramValue))
});

export default connect(null, mapDispatchToProps)(PartStyles)
