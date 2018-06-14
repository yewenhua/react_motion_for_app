import React from 'react'
import PropTypes from 'prop-types'
import '../assets/css/position.css';
import {Toast } from 'antd-mobile';
import axios from 'axios'

class Position extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            hasData: false,
            loading: false,
            baseurl: props.baseurl,
            id: props.params.page,
            placeholder_img: require('../assets/img/nodata.png')
        }
    }

    getData(){
        if(!this.state.loading) {
            Toast.loading('加载中…', 30);
            this.setState({
                loading: true
            });

            axios({
                method: 'post',
                url: this.state.baseurl + '/api/position',
                data: {
                    id: this.state.id
                },
            }).then(function (response) {
                Toast.hide();
                if (response.status == 200 && response.data.code == 0) {
                    this.setState({
                        loading: false,
                        hasData: true,
                        data: response.data.data
                    });
                }
                else {
                    this.setState({
                        loading: false
                    });
                }
            }.bind(this)).catch(function (error) {
                Toast.hide();
                Toast.fail('获取失败', 2);
                this.setState({
                    loading: false
                });
            }.bind(this));
        }
    }

    componentWillMount(){
        document.title = '职位详情';
    }

    componentDidMount(){
        this.getData();
    }

    render() {
        if(this.state.data){
            return (
                <div className="positionWraper">
                    <div className="titleWraper">
                        <div className="title">{this.state.data.title}</div>
                        <div className="monty">{this.state.data.salary}</div>
                        <div className="time">{this.state.data.created_at}</div>
                    </div>
                    <div className="empty-ten"></div>
                    <div className="contentWraper">
                        <div className="title">职位简介</div>
                        <div dangerouslySetInnerHTML={{__html: this.state.data.content}}/>
                    </div>
                </div>
            );
        }
        else{
            return (
                <div className="nodata">
                    <img src={this.state.placeholder_img}/>
                    <p className="text">亲，好像没有数据呢，换个姿势试试</p>
                </div>
            );
        }
    }
}

Position.propTypes = {
    baseurl: PropTypes.string.isRequired
}

export default Position

