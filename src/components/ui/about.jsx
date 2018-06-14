import React from 'react'
import { Carousel, Toast } from 'antd-mobile';
import '../assets/css/about.css';
import { initHeight } from '../assets/js/utils'
import axios from 'axios'
import PropTypes from 'prop-types'
import {store} from '../../store/index.js';
import * as configAction from '../../actions/configAction';

class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            initialHeight: 200,
            page: 0,
            baseurl: props.baseurl
        }
    }

    getData(){
        Toast.loading('加载中…', 30);
        axios({
            method: 'post',
            url: this.state.baseurl + '/api/about',
            data: {},
        }).then(function (response) {
            Toast.hide();
            if(response.status == 200 && response.data.code == 0){
                let tmp = response.data.data;
                let data = [];
                for(let i=0; i<tmp.length; i++){
                    data.push(this.state.baseurl + tmp[i].url);
                }

                this.setState({
                    data: data
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

    componentWillMount(){
        document.title = '产品手册';
    }

    render() {
        const hProp = this.state.initialHeight ? { height: this.state.initialHeight } : {};
        return (
            <div className="about-page">
                <Carousel
                    vertical
                    dots={false}
                    className="my-carousel-about"
                    autoplay={false}
                    infinite
                    selectedIndex={0}
                    swipeSpeed={35}
                    beforeChange={(from, to) => {}}
                    afterChange={index => {this.setState({ page: index })}}
                    style={hProp}
                >
                    {this.state.data.map(ii => (
                        <div className="img-content" key={ii} style={hProp}>
                            <img
                                src={`${ii}`}
                                style={hProp}
                                onLoad={() => {
                                    // fire window resize event to change height
                                    window.dispatchEvent(new Event('resize'));
                                    this.setState({
                                        initialHeight: null
                                    });
                                }}
                            />
                        </div>
                    ))}
                </Carousel>
                <div className="page-dots">{this.state.page + 1}/{this.state.data.length}</div>
            </div>
        );
    }
}

About.propTypes = {
    baseurl: PropTypes.string.isRequired
}

export default About

