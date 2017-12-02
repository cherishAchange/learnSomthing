import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import './app.scss';

class App extends React.Component {

    static contextTypes = {
        store: PropTypes.object,
        router: PropTypes.object
    };

    constructor(){
        super();
        this._goOut = this._goOut.bind(this);
    }

    //tuichu
    _goOut(){
        sessionStorage.clear('tocken');
        this.context.router.push('/login');
    }

    render(){
        let {userinfo} = this.context.store.getState();
        return (
            <div className="work_space">
                <nav className="nav_bar">导航
                    <div className="userName">
                        {userinfo.username}
                        <ul className="user_menu">
                            <li onClick={this._goOut}>退出</li>
                        </ul>
                    </div>
                </nav>
                <div className="content">
                    <div className="side_nav">
                        <ul className="menu">
                            <li className="menu_item"><Link to="/first">第一个</Link></li>
                            <li className="menu_item"><Link to="/second">第二个</Link></li>
                            <li className="menu_item"><Link to="/chat_room">聊天室</Link></li>
                        </ul>
                    </div>
                    <div className="main_content">
                        {this.props.children}
                    </div>
                </div>
                <footer>
                    页脚
                </footer>
            </div>
        );
    }
}

export default App;