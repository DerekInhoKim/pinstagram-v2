import {SET_FOLLOWERS} from '../actions/followers'

const initialState = []

const followerReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_FOLLOWERS:
            return [...action.followers];
        default: {
            return state
        }
    }
}

export default followerReducer
