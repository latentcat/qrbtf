import {connect} from 'react-redux';
import Renderer from "../../components/style/Renderer";
import {fillEmptyWith} from "../../utils/util";

const mapStateToProps = (state, ownProps) => ({
    rendererType: ownProps.rendererType,
    rendererIndex: ownProps.index,
    qrcode: state.qrcode,
    params: fillEmptyWith(state.paramValue[ownProps.index].slice(), 0),
    title: state.title,
    icon: state.icon,
    selected: state.selectedIndex === ownProps.index,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    setParamInfo: (params) => ownProps.setParamInfo(ownProps.index, params)
})


export default connect(mapStateToProps, mapDispatchToProps)(Renderer)
