import { connect } from 'react-redux';
import ParamIcon from "../../../components/param/disposable/ParamIcon";
import {changeIcon} from "../../../actions";

const mapStateToProps = (state, ownProps) => ({
    icon: state.icon
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChange: (icon) => {
        dispatch(changeIcon(icon))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ParamIcon);
