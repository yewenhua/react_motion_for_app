import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router';

import {store} from './store/index.js';
import App from './components/App';
import Stage1 from './components/Stage1';
import Stage2 from './components/Stage2';
import Stage3 from './components/Stage3';
import Counter from './components/container/Counter';

import './index.less';

class Index extends React.Component {
  render() {
    return (
      <div className="body">
        <h1>Stages list</h1>
        <ul role="nav">
          <li><Link to="/s1">ListView + Carousel</Link></li>
          <li><Link to="/s2">Tabs + ...</Link></li>
          <li><Link to="/s3">Form + ...</Link></li>
          <li><Link to="/counter">counter + ...</Link></li>
        </ul>
      </div>
    );
  }
}

ReactDOM.render(
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Index} />
          <Route path="s1" component={Stage1} />
          <Route path="s2" component={Stage2} />
          <Route path="s3" component={Stage3} />
          <Route path="counter" component={Counter} />
        </Route>
      </Router>
    </Provider>
, document.getElementById('example'));
