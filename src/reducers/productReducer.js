import { types } from "../types/types";


const initialState = {
    products: [],
    error: ''
}

export const productReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        
        case types.productLoaded:
            return {
                ...state,
                products: [ ...action.payload ]
            }

        case types.productAddNew:
            return {
                ...state,
                products: [ action.payload, ...state.products ]
            }

        case types.productUpdated:
            return {
                ...state,
                products: state.products.map( 
                    product => product.id === action.payload.id
                        ? action.payload.product
                        : product
                )
            }

        case types.productDeleted:
            return {
                ...state,
                products: state.products.filter( product => product.id !== action.payload )
            }
    
        default:
            return state;
    }

}