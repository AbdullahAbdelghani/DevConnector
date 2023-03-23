import { REGISTER_FAIL, REGISTER_SUCCESS, LOGIN_FAIL, LOGIN_SUCCESS } from "../actions/types";

const initialState = [];

export default function(state= initialState,action) {
    const {type, payload} = action
    switch(type)
        {
            case REGISTER_SUCCESS:

                break;
            case REGISTER_FAIL:
            case LOGIN_FAIL:
            
                break;
            case LOGIN_SUCCESS:

                break;
            default:
                return state;
        }
} 