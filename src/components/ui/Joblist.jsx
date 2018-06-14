import React from 'react'
import PropTypes from 'prop-types'
import { List, Toast } from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';
import { Link } from 'react-router';
import axios from 'axios'
import '../assets/css/joblist.css';

const Item = List.Item;

class Joblist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            baseurl: props.baseurl,
            searchkey: '',
            page: 1,
            size: 10,
            loading: false,
            totalPage: 1,
            hasData: true
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
                url: this.state.baseurl + '/api/joblist',
                data: {
                    searchkey: this.state.searchkey,
                    page: this.state.page,
                    size: this.state.size
                },
            }).then(function (response) {
                Toast.hide();
                if (response.status == 200 && response.data.code == 0) {
                    this.setState({
                        loading: false,
                        hasData: true,
                        data: response.data.data.data,
                        totalPage: response.data.data.totalpage
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

    scroll(){
        var obj = document.querySelector(".joblist");
        var screenHeight = obj.offsetHeight;   //屏幕可见高度
        var scrollHeight = obj.scrollHeight;   //所有内容总高度
        this.scrollTop = document.querySelector(".joblist").scrollTop;   //滚动条距离顶部高度

        //滚动条触底触发事件
        if(scrollHeight - screenHeight - this.scrollTop < 100){
            if(!this.loading && this.page < this.totalPage) {
                this.setState({
                    page: this.state.page + 1
                });

                this.getData();
            }
        }
    }

    componentDidMount(){
        this.getData();
        var contentObj = document.querySelector(".joblist");
        contentObj.addEventListener('scroll', this.scroll);
    }

    render() {
        return (
            <div className="joblist">
                <List renderHeader={() => '职位列表'} className="my-list">
                    <QueueAnim>
                        {this.state.data.map((item, index) => {
                            let path = '/position/' + item.id;
                            return (
                                <Item key={index} arrow="horizontal" multipleLine>
                                    <Link to={path}>
                                        <div className="item-font">
                                            <div className="title">{item.title}</div>
                                            <div className="salary">{item.salary}</div>
                                        </div>
                                    </Link>
                                </Item>
                            )
                        })}
                    </QueueAnim>
                </List>
            </div>
        );
    }
}

Joblist.propTypes = {
    baseurl: PropTypes.string.isRequired
}

export default Joblist

