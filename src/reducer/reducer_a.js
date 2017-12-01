import {Add_NUMBER, REDUCE_NUMBER} from '../action/action_a';

const init = {
    age: 23,
    name: "taibowen"
}

const reducer = function(state = init, action){
    let obj;
    switch(action.type){
        case Add_NUMBER:
            obj = {...state};
            obj[action.text]+=1;
            return obj;
        case REDUCE_NUMBER:
            obj = {...state};
            obj[action.text]-=1;
            return obj;
        default:
            return state;
    }
}

export default reducer;