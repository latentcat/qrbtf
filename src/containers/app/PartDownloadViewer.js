import { connect } from 'react-redux';
import PartDownload from "../../components/app/PartDownload";

const mapStateToProps = (state) => ({
    value: state.value
})

export default connect(mapStateToProps, null)(PartDownload)
