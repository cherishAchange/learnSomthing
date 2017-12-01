import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux'
import {Add_NUMBER} from '../../action/action_a';
import * as io from 'socket.io-client'
import classNames from 'classnames';
import './index.scss';

class Chat_room extends Component {

    constructor(){
        super();
        this.state = {
            message: []
        };
        this._sendMessage = this._sendMessage.bind(this);
    }

    componentDidMount(){
        const that = this;
        const url = location.hostname
        that.socket = io.connect(`http://${url}:3333/`);
          // 测试是否链接上websocket
        that.socket.on('connect', () => console.log('连接socket服务器成功'));

        that.socket.on('newMsg', (user, msg, color) => {
            let {message} = this.state, obj = {
                message: msg,
                fromWhere: 'left',
                user: ""
            };
            message.push(obj);
            that.setState({message});
        });

        window.addEventListener('keydown', this._sendMessage, false);
    }

    _sendMessage = (e) => {
        if(e.keyCode === 13){
            e.preventDefault();
            let {message} = this.state, obj = {
                message: e.target.value,
                fromWhere: 'right',
                user: ""
            };
            message.push(obj);
            this.setState({message});
            this.socket.emit('postMsg', e.target.value, 'color');
            e.target.value = null;
        }
      }

    render(){
        let {message} = this.state;
        return (
            <div className="chat_room">
                <div className="show_message">
                    <ul className="message">
                        {
                            message.map((msgBody, index) => {
                                let cls = classNames({
                                    "normal": true,
                                    "gotMessage": msgBody.fromWhere === 'left',
                                    "sendMessage": msgBody.fromWhere === 'right'
                                });
                                return (
                                    <li key={index}><span className={cls}>{msgBody.message}</span></li>
                                );
                            })
                        }
                    </ul>
                </div>
                <div className="input_message">
                    <textarea className="input_box" ref={(target) => this.input_box = target}></textarea>
                </div>
            </div>
        );
    }
}

export default Chat_room;