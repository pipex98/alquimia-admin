import { privateRequest } from "../helpers/requestMethods";
import { types } from "../types/types";
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

export const productStartLoading = () => {

    return async ( dispatch ) => {

        try {
            const res = await privateRequest.get('/products');

            const { data } = res; 
            
            dispatch(productLoaded( data.products ));
            
        } catch (err) {
            
            const { data } = err.response;

            alertify.error(`${ data.msg }`);
        }

    }
}

export const productAddStartNew = ( product ) => {

    return async (dispatch) => {

        try {
            
            const res = await privateRequest.post('/products/add', product );

            const { data } = res;

            dispatch(productAddNew( data.product ));

            alertify.success(`${ data.msg }`);

        } catch (err) {

            const { data } = err.response;

            alertify.error(`${ data.msg }`);
   
        }
    }
}

export const productStartUpdate = ( product ) => {

    return async (dispatch) => {

        try {
                
            const res = await privateRequest.put(`/products/update/${product.id}`, product );
    
            const { data } = res;
    
            dispatch(productUpdated( data.product ))
    
            alertify.success(`${ data.msg }`);
    
        } catch (err) {
    
            const { data } = err.response;
    
            alertify.error(`${ data.msg }`);
    
        }
    }
}

const productLoaded = ( products ) => ({ 
    type: types.productLoaded, 
    payload: products
})

const productUpdated = ( product ) => ({ 
    type: types.productUpdated, 
    payload: product
})

const productAddNew = ( product ) => ({ 
    type: types.productAddNew, 
    payload: product
})
