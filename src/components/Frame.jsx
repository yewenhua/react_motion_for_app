import React from 'react';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import './assets/css/app.css';
import {store} from '../store/index.js';
import * as configAction from '../actions/configAction';

export default class App extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          motion: 'left'
      };
  }

  componentDidMount(){
      window.addEventListener('hashchange', (e) => {
          let arr = e.newURL.split("#");
          if(arr.length > 0 && arr[1] == '/'){
              this.setState({
                  motion: 'left'
              });
          }
          else{
              this.setState({
                  motion: 'right'
              });
          }
      });

      store.dispatch(configAction.update_base_url(baseurl));
      store.dispatch(configAction.update_api_url(apiurl));
      store.dispatch(configAction.update_token(token));
  }

  render() {
    return (
        <ReactCSSTransitionGroup
            transitionName={this.state.motion}
            component="div"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}>
              <div className="container" key={this.props.location.pathname} style={{position:"absolute", width: "100%", height: "100%"}}>
                  {this.props && this.props.children}
              </div>
        </ReactCSSTransitionGroup>
    );
  }
}
