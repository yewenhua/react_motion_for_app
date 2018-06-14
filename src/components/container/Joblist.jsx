import { connect } from 'react-redux'
import Joblist from '../ui/Joblist'

const mapDispatchToProps = {

};

const mapStateToProps = (state) => ({
    baseurl : state.configState.baseurl
});

export default connect(mapStateToProps, mapDispatchToProps)(Joblist)
