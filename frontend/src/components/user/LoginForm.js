import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import '../../style/LoginForm.css';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await dispatch(loginUser({ email, password })).unwrap();
            navigate('/dashboard');
        } catch (error) {
            console.error('Failed to login:', error);
        }
    };

    const handleSignupClick = () => {
        navigate('/register');
    };

    return (
        <div className="form-container" style={{ marginTop: '100px'}}> 
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={auth.status === 'loading'}>
                    {auth.status === 'loading' ? 'Logging in...' : 'Login'}
                </button>
                {auth.error && <p className="error-message">{auth.error}</p>}

                <button className="signup-button" onClick={handleSignupClick}>
                  Signup
               </button>
            </form>
        </div>
    );
}

export default LoginForm;
