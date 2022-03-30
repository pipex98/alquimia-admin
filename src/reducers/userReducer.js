import { types } from "../types/types";


const initialState = {
    users: [],
    error: ''
}

export const userReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        
        case types.userLoaded:
            return {
                ...state,
                users: [ ...action.payload ]
            }

        case types.userAddNew:
            return {
                ...state,
                users: [ action.payload, ...state.users ]
            }

        case types.userUpdated:
            return {
                ...state,
                users: state.users.map( 
                    user => user.id === action.payload.id
                        ? action.payload.user
                        : user
                )   
            }

        case types.userDelete:
            return {
                ...state,
                users: state.users.filter( user => user.id !== action.payload )
            }
    
        default:
            return state;
    }

}