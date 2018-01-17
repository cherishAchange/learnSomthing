import React, {Component, PropTypes} from 'react';
import {hashHistory} from 'react-router';
import {LOGIN} from '../action/action_a';
import './login.scss';

class Login extends Component {

    static contextTypes = {
        store: PropTypes.object,
    };

    constructor(){
        super();
        this._login = this._login.bind(this);
    }

    _login(){
        if(this.username.value && this.password.value){
            let obj = {
                "username": this.username.value,
                "password": this.password.value
            }, self = this;
            fetch('/validate', obj).then((response) => {
                response.json().then(function(data) {
                    if(data.loging === true){
                        sessionStorage.setItem('tocken', JSON.stringify(obj));
                        self.context.store.dispatch({type: LOGIN, text: "userinfo"});
                        hashHistory.push('/');
                    }
                });
            });
        }
    }

    render(){
        return (
            <div className="login_page">
                <h2>LOGIN</h2>
                <div className="login_box">
                    <div className="_input input_username">
                        <label>username:</label>
                        <div><input type="text" ref={d => this.username = d}/></div>
                    </div>
                    <div className="_input input_password">
                        <label>password:</label>
                        <div><input type="text" ref={d => this.password = d}/></div>
                    </div>
                    <div className="_input operate_but">
                        <button className="_button" onClick={this._login}>login</button>
                        <button className="_button">register</button>
                        <button className="_button">cencal</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
