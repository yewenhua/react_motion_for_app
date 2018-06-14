import { connect } from 'react-redux'
import About from '../ui/About'

const mapDispatchToProps = {

};

const mapStateToProps = (state) => ({
    baseurl : state.configState.baseurl
});

export default connect(mapStateToProps, mapDispatchToProps)(About)
