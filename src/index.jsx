import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router';

import {store} from './store/index.js';
import Frame from './components/Frame';
import Guide from './components/container/Guide';
import About from './components/container/About';
import Feature from './components/container/Feature';
import Question from './components/container/Question';
import Ask from './components/container/Ask';
import { List } from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';

import './index.less';

const Item = List.Item;

class Index extends React.Component {

  componentWillMount(){
    document.title = '服务支持';
  }

  render() {
    return (
        <div>
            <List renderHeader={() => '产品说明'} className="my-list">
                <QueueAnim>
                    <Item key="demo1" arrow="horizontal" onClick={() => {}}>
                        <Link to="/feature"><div className="item-font">产品特色</div></Link>
                    </Item>
                    <Item key="demo2" arrow="horizontal" onClick={() => {}}>
                        <Link to="/guide"><div className="item-font">门锁用户添加说明</div></Link>
                    </Item>
                    <Item key="demo3" arrow="horizontal" onClick={() => {}}>
                        <Link to="/about"><div className="item-font">产品手册</div></Link>
                    </Item>
                    <Item key="demo4" arrow="horizontal" onClick={() => {}}>
                        <Link to="/question"><div className="item-font">常见问题</div></Link>
                    </Item>
                    <Item key="demo5" arrow="horizontal" onClick={() => {}}>
                        <Link to="/ask"><div className="item-font">问题反馈</div></Link>
                    </Item>
                </QueueAnim>
            </List>
        </div>
    );
  }
}

ReactDOM.render(
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={Frame}>
          <IndexRoute component={Index} />
          <Route path="guide" component={Guide} />
          <Route path="about" component={About} />
          <Route path="feature" component={Feature} />
          <Route path="question" component={Question} />
          <Route path="ask" component={Ask} />
        </Route>
      </Router>
    </Provider>
, document.getElementById('example'));
