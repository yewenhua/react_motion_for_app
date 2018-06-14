import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as counterAction from '../../actions/counterAction';
import Counter from '../ui/Counter'

const mapDispatchToProps = {
    increment : () => counterAction.increment(1),
    doubleAsync: counterAction.doubleAsync
};

const mapStateToProps = (state) => ({
  counter : state.counterState.counter
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
