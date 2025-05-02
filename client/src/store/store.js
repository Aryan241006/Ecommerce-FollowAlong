import {configureStore} from '@reduxjs/toolkit';

const intialState={
    email:null,
};

//userReducer to handle email state
const userReducer= (state = intialState,action)=>{
    switch(action.type){
        case 'SET_EMAIL':
            return{
                ...state,
                email:action.payload,
            };
        default:
            return state;
    }
}

//configure the redux store with userrReducer
const store= configureStore({
    reducer:{
        user:userReducer,
    }
});

export default store;