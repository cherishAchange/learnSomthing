import { createStore , applyMiddleware } from 'redux'
import reducer from '../reducer/reducer_a';

const logger = store => next => action => {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
}

let middle = applyMiddleware(logger)(createStore);

const store = middle(reducer);

export default store;