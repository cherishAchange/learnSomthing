import React, {Component, PropTypes} from 'react';
import {REDUCE_NUMBER} from '../../action/action_a';

class Second extends Component {

    static contextTypes = {
        store: PropTypes.object,
    };

    constructor(){
        super();
        this._reduce = this._reduce.bind(this);
        this._subscribe = this._subscribe.bind(this);
    }

    componentDidMount(){
        this.listener = this.context.store.subscribe(this._subscribe);
    }

    componentWillUnmount(){
        this.listener();
    }

    _subscribe(){
        let store = this.context.store.getState();
        this.setState({store});
    }

    _reduce(){
        this.context.store.dispatch({type: REDUCE_NUMBER, text: "age"});
    }

    render(){
        const {age} = this.context.store.getState();
        return (
            <div>
                <h2>{age}</h2>
                <button onClick={this._reduce}>点我减一,点</button>
            </div>
        );
    }
}

export default Second;