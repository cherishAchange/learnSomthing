import React from 'react';
import {Link} from 'react-router';
import './app.scss';

class App extends React.Component {

    render(){
        return (
            <div className="work_space">
                <nav className="nav_bar">导航
                    <div className="userName">USERNAME
                        <ul className="user_menu">
                            <li>退出</li>
                            <li>重新登录</li>
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