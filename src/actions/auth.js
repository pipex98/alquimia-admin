import { privateRequest, publicRequest } from "../helpers/requestMethods";
import { types } from "../types/types";


export const startLogin = ( username, password ) => {

    return async ( dispatch ) => {
        
        dispatch( checking() );

        try {
            const res = await publicRequest.post('/auth/login', username, password);

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            
            dispatch(login(res.data));
            
        } catch (err) {
            
            const { data } = err.response;
            
            dispatch( checkingFinish() );
            dispatch( authError( data.msg ) );
        }
    }
}

export const startChecking = () => {

    return async ( dispatch ) => {

        try {
            const res = await privateRequest.get('/auth/renew');

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            
            dispatch(login(res.data));
            
        } catch (err) {
            console.log(err);
            dispatch( checkingFinish() );
        }
    }
}

const login = ( user ) => ({
    type: types.authLogin,
    payload: user
})

export const startLogout = () => {

    return async ( dispatch ) => {

        localStorage.clear();
        dispatch( logout() );
    }
}

const checking = () => ({ type: types.authChecking })

const checkingFinish = () => ({ type: types.authCheckingFinish })

const authError = ( err ) => ({ 
    type: types.authError,
    payload: err 
})

const logout = () => ({ type: types.authLogout })
