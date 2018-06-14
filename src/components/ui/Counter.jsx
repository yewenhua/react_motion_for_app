import React from 'react'
import PropTypes from 'prop-types'
import { Button, WhiteSpace, WingBlank } from 'antd-mobile'

class Counter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var buttonStyle = {
            margin: '0.16rem 0'
        };

        const { counter, increment, doubleAsync } = this.props;
        return (
            <div style={{ margin: '0 auto' }} >
                <WingBlank size="md">
                    <h2>Counter: {counter}</h2>
                    <Button className="btn" type="primary" onClick={increment}>increment</Button>
                    <WhiteSpace size="lg" />
                    <Button className="btn" loading onClick={doubleAsync} style={buttonStyle}>Double (Async)</Button>
                </WingBlank>
            </div>
        );
    }
}

Counter.propTypes = {
    counter: PropTypes.number.isRequired,
    increment: PropTypes.func.isRequired,
    doubleAsync: PropTypes.func.isRequired,
}

export default Counter

