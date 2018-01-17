import React from 'react';
import ReactDOM, {render} from 'react-dom';
import { Provider } from 'react-redux'
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import store from './store/store';

import App from './app.js';
import First from './components/first/index';
import Second from './components/second/index';
import Html_newTag from './components/html_5.2_newTag/index'
import Chat_room from './components/chat_room/index';
import Login from './components/login';
import Index from './components/index';

const isLogin = (nextState, replaceState) => {
    let tocken = sessionStorage.getItem('tocken');
    console.log(tocken)
    if(!tocken){
        replaceState('/login');
    }
};

const provider =  <Provider store={store}>
<Router history={hashHistory}>
    <Route path='/' component={App} onEnter={isLogin}>
        <IndexRoute component={Index}/>
        <Route path='first' component={First}/>
        <Route path='second' component={Second}/>
        <Route path='chat_room' component={Chat_room}/>
        <Route path='html_newTag' component={Html_newTag}/>
    </Route>
    <Route path="/login" component={Login}/>
</Router>
</Provider>;

let refr = ReactDOM.render(
    provider,
    document.getElementById('root')
);
