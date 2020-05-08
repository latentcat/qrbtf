import { connect } from 'react-redux';
import ParamList from "../../components/param/ParamList";

const mapStateToProps = (state) => ({
    rendererIndex: state.selectedIndex,
    paramInfo: state.paramInfo[state.selectedIndex]
})

export default connect(mapStateToProps, null)(ParamList)
