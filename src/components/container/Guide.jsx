import { connect } from 'react-redux'
import Guide from '../ui/Guide'

const mapDispatchToProps = {

};

const mapStateToProps = (state) => ({
    baseurl : state.configState.baseurl
});

export default connect(mapStateToProps, mapDispatchToProps)(Guide)
