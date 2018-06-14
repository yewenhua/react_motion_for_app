import { connect } from 'react-redux'
import Question from '../ui/Question'

const mapDispatchToProps = {

};

const mapStateToProps = (state) => ({
    baseurl : state.configState.baseurl
});

export default connect(mapStateToProps, mapDispatchToProps)(Question)
