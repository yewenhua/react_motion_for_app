import React from 'react'
import { WingBlank, Toast } from 'antd-mobile';
import '../assets/css/guide.css';
import { initHeight } from '../assets/js/utils'
import axios from 'axios'
import PropTypes from 'prop-types'
import {store} from '../../store/index.js';
import * as configAction from '../../actions/configAction';

class Guide extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialHeight: 200,
            data: null,
            baseurl: props.baseurl
        }
    }

    getData(){
        Toast.loading('加载中…', 30);
        axios({
            method: 'post',
            url: this.state.baseurl + '/api/guide',
            data: {},
        }).then(function (response) {
            Toast.hide();
            if(response.status == 200 && response.data.code == 0){
                this.setState({
                    data: response.data.data.content
                });
            }
            this.interactive(response);
        }.bind(this)).catch(function (error) {
            Toast.hide();
            Toast.fail('获取失败', 2);
            this.interactive(error);
        }.bind(this));
    }

    init(cb){
        var that = this;
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
        //注册事件监听
        function setupWebViewJavascriptBridge(callback) {
            if(isAndroid){
                if (window.WebViewJavascriptBridge) {
                    callback(WebViewJavascriptBridge)
                } else {
                    document.addEventListener(
                        'WebViewJavascriptBridgeReady'
                        , function() {
                            callback(WebViewJavascriptBridge)
                        },
                        false
                    );
                }
            }
            else {
                if (window.WebViewJavascriptBridge) {
                    return callback(WebViewJavascriptBridge);
                }
                if (window.WVJBCallbacks) {
                    return window.WVJBCallbacks.push(callback);
                }
                window.WVJBCallbacks = [callback];
                var WVJBIframe = document.createElement('iframe');
                WVJBIframe.style.display = 'none';
                WVJBIframe.src = 'https://__bridge_loaded__';
                document.documentElement.appendChild(WVJBIframe);
                setTimeout(function () {
                    document.documentElement.removeChild(WVJBIframe)
                }, 0)
            }
        }

        //注册回调函数，第一次连接时调用 初始化函数
        setupWebViewJavascriptBridge(function(bridge) {
            if(isAndroid) {
                bridge.init(function (message, responseCallback) {
                    var msgObj = JSON.parse(message);
                    token = msgObj.token;
                    baseurl = msgObj.baseurl;
                    apiurl = msgObj.apiurl;

                    that.setState({
                        baseurl: baseurl
                    });
                    store.dispatch(configAction.update_base_url(baseurl));

                    cb();

                    responseCallback('success');
                });
            }
            else{
                bridge.registerHandler('functionInJs', function(data, responseCallback) {
                    token = data.token;
                    baseurl = data.baseurl;
                    apiurl = data.apiurl;

                    that.setState({
                        baseurl: baseurl
                    });
                    store.dispatch(configAction.update_base_url(baseurl));

                    cb();

                    responseCallback('success');
                });
            }
        });
    }

    interactive(data){
        window.WebViewJavascriptBridge.callHandler(
            'submitFromWeb'
            ,data
            , function(responseData) {
                //来自App的回传数据
            }
        );
    }

    componentWillMount(){
        document.title = '门锁用户添加说明';
    }

    componentDidMount() {
        let { viewHeight } = initHeight();

        this.setState({
            initialHeight: viewHeight
        });

        if(this.state.baseurl){
            this.getData();
        }
        else {
            this.init(function () {
                setTimeout(() => {
                    this.getData();
                }, 100);
            }.bind(this));
        }
    }

    render() {
        const hProp = this.state.initialHeight ? { height: this.state.initialHeight } : {};

        return (
            <div style={hProp} className="content">
                <WingBlank size="lg">
                    <div dangerouslySetInnerHTML={{__html: this.state.data}}/>
                </WingBlank>
            </div>
        );
    }
}

Guide.propTypes = {
    baseurl: PropTypes.string.isRequired
}

export default Guide

