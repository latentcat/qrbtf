import { connect } from 'react-redux';
import ParamTitle from "../../../components/param/disposable/ParamTitle";
import {changeTitle} from "../../../actions";

const mapStateToProps = (state, ownProps) => ({
    title: state.title
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChange: (title) => {
        dispatch(changeTitle(title))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ParamTitle);
