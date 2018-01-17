import {Add_NUMBER, REDUCE_NUMBER, LOGIN} from '../action/action_a';

const init = {
    age: 23,
    name: "taibowen",
    userinfo: {}
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
        case LOGIN:
            let tocken = JSON.parse(sessionStorage.getItem('tocken'));
            obj = {...state};
            obj[action.text] = tocken;
            return obj; 
        default:
            return state;
    }
}

export default reducer;