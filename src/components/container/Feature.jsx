import { connect } from 'react-redux'
import Feature from '../ui/Feature'

const mapDispatchToProps = {

};

const mapStateToProps = (state) => ({
    baseurl : state.configState.baseurl
});

export default connect(mapStateToProps, mapDispatchToProps)(Feature)
