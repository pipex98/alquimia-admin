import { privateRequest } from "../helpers/requestMethods";
import { types } from "../types/types";
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

export const userStartLoading = () => {

    return async ( dispatch ) => {

        try {
            const res = await privateRequest.get('/users');

            const { data } = res; 
            
            dispatch(userLoaded( data.users ));
            
        } catch (err) {
            
            const { data } = err.response;

            alertify.error(`${ data.msg }`);
        }
    }
}

export const userAddStartNew = ( user ) => {

    return async (dispatch) => {

        try {
            
            const res = await privateRequest.post('/auth/register', user );

            const { data } = res;

            dispatch(userAddNew( data.user ));

            alertify.success(`${ data.msg }`);

        } catch (err) {

            const { data } = err.response;

            alertify.error(`${ data.msg }`);
   
        }
    }
}

export const userStartUpdate = ( user ) => {

    return async (dispatch) => {

        try {
                
            const res = await privateRequest.put(`/users/update/${user.id}`, user );

            console.log(res);

            const { data } = res;
    
            dispatch(userUpdated( data.user ))
    
            alertify.success(`${ data.msg }`);
    
        } catch (err) {
    
            const { data } = err.response;
    
            alertify.error(`${ data.msg }`);
        }
    }
}

export const userDeleting = ( id ) => {

    return async (dispatch) => {

        try {
                
            const res = await privateRequest.delete(`/users/delete/${id}`);

            console.log(res);

            const { data } = res;
    
            dispatch(userDelete( data.user ))
    
            alertify.success(`${ data.msg }`);
    
        } catch (err) {
    
            const { data } = err.response;
    
            alertify.error(`${ data.msg }`);
        }
    }
}

const userAddNew = ( user ) => ({ 
    type: types.userAddNew, 
    payload: user
})

const userLoaded = ( users ) => ({ 
    type: types.userLoaded, 
    payload: users
})

const userUpdated = ( user ) => ({ 
    type: types.userUpdated, 
    payload: user
})

const userDelete = ( id ) => ({ 
    type: types.userDelete, 
    payload: id
})
