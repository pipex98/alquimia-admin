import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLogin } from "../../actions/auth";
import './login.css'

export const LoginScreen = () => {

    const dispatch = useDispatch();
    const error = useSelector(state => state.auth.error)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLogin({ username, password }));
    }

    return (
        <div class="container-login">
            <div class="wrapper">
                <h1 className="title">Alquimia Store</h1>
                <form className="form-login">
                    <input
                        className="input" 
                        type="text" 
                        placeholder="usuario" 
                        onChange={ e => setUsername(e.target.value) }
                    />
                    <input
                        className="input" 
                        type="password" 
                        placeholder="password" 
                        onChange={ e => setPassword(e.target.value) } 
                    />
                    <button
                        className="button" 
                        onClick={ handleLogin }>
                        Login
                    </button>
                    { error && <span className="error">{ error }</span> }
                </form>
            </div>
    </div>
    )
}
