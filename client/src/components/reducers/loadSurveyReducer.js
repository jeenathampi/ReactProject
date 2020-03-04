import {LOAD} from '../../actions/types';

export default function(state={}, action) {
    switch(action.type){
        case LOAD:
            return {data: action.payload};
        default:
            return state;
    }
}