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

//createStore实现的核心思路
export const createStore_realization = (reducer) => {
  let state = {};
  const listeners = [];
  const getState = () => state;
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };
  const subscribe = (listener) => listeners.push(listener);
  return {
    getState,
    dispatch,
    subscribe,
  };
};