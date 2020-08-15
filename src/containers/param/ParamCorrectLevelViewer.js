import {changeCorrectLevel} from "../../actions";
import ParamCorrectLevel from "../../components/param/disposable/ParamCorrectLevel";
import {connect} from "react-redux";

const mapStateToProps = (state) => ({
    value: state.correctLevel
});

const mapDispatchToProps = (dispatch) => ({
    onChange: (e) => {
        dispatch(changeCorrectLevel(e.target.value));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ParamCorrectLevel)
