import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux'
import {Add_NUMBER} from '../../action/action_a';

class First extends Component {

    constructor(){
        super();
        this._add = this._add.bind(this);
        this._subscribe = this._subscribe.bind(this);
    }

    componentDidMount(){
        this.listener = this.context.store.subscribe(this._subscribe);
    }

    shouldComponentUpdate(nextProps, nextState){
        return true;
    }

    componentWillUnmount(){
        this.listener();
    }

    _subscribe(){
        let store = this.context.store;
        this.setState({store});
    }

    static contextTypes = {
        store: PropTypes.object,
    };

    _add(){
        this.context.store.dispatch({type: Add_NUMBER, text: "age"});
    }

    render(){
        const {age} = this.context.store.getState();
        return (
            <div>
                <h2>{age}</h2>
                <button onClick={this._add}>点我加一,点</button>
            </div>
        );
    }
}

export default First;