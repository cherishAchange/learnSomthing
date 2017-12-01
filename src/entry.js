import React from 'react';
import ReactDOM, {render} from 'react-dom';
import { Provider } from 'react-redux'
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import store from './store/store';

import App from './app.js';
import First from './components/first/index';
import Second from './components/second/index';
import Chat_room from './components/chat_room/index';

const routes = [
    {
        path: '/',
        component: App,
        routes: [
            {
                path: 'first',
                component: First
            },
            {
                path: 'second',
                component: Second
            },
            {
                path: 'chat_room',
                component: Chat_room
            }
        ]
    }
]

// render(
//     <Provider store={store}>
//         <Router history={browserHistory}>
//             <Route path='/' component={App}>
//                 <Route path='first' component={First}/>
//                 <Route path='second' component={Second}/>
//                 <Route path='chat_room' component={Chat_room}/>
//             </Route>
//         </Router>
//     </Provider>,
//     document.getElementById('root')
// );

let refr = ReactDOM.render(
    <Provider store={store}>
    <Router history={hashHistory}>
        <Route path='/' component={App}>
            <Route path='first' component={First}/>
            <Route path='second' component={Second}/>
            <Route path='chat_room' component={Chat_room}/>
        </Route>
    </Router>
</Provider>,
document.getElementById('root')
);
