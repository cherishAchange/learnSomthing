import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux'
import {Add_NUMBER} from '../../action/action_a';
import * as io from 'socket.io-client'
import classNames from 'classnames';
import './index.scss';

class Chat_room extends Component {

    static contextTypes = {
        store: PropTypes.object,
    };

    constructor(){
        super();
        this.state = {
            message: []
        };
        this._sendMessage = this._sendMessage.bind(this);
    }

    componentWillMount(){
        this.userSelf = this.context.store.getState().userinfo;
    }

    componentDidMount(){
        const that = this;
        const url = location.hostname
        that.socket = io.connect(`http://${url}:3333/`);
          // 测试是否链接上websocket
        that.socket.on('connect', () => console.log('连接socket服务器成功'));

        //get message
        that.socket.on('newMsg', (user, msg, color) => {
            let {message} = this.state, obj = {
                message: msg.message,
                username: msg.username
            };
            message.push(obj);
            that.setState({message});
        });

        window.addEventListener('keydown', this._sendMessage, false);
    }

    //send message
    _sendMessage = (e) => {
        if(e.keyCode === 13){
            e.preventDefault();
            let {message} = this.state, 
                obj = {
                    message: e.target.value,
                    username: this.userSelf.username
                };
            message.push(obj);
            this.setState({message});
            this.socket.emit('postMsg', obj, 'color');
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
                                    "gotMessage": msgBody.username !== this.userSelf.username,
                                    "sendMessage": msgBody.username === this.userSelf.username
                                });
                                return (
                                    <li key={index}>
                                        <div className={cls}>
                                            <span className="_username">{`@${msgBody.username}`}</span>
                                            <span className="_message">{msgBody.message}</span>
                                        </div>
                                    </li>
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