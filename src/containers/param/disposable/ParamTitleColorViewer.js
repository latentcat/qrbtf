import { connect } from 'react-redux';
import ParamColor from "../../../components/param/ParamColor";

const mapStateToProps = (state, ownProps) => ({
    rendererIndex: -1,
    paramIndex: -1,
    value: state.title.color
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChange: (color) => {
        ownProps.onChange({ ...ownProps.title, color: color.hex })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ParamColor);
