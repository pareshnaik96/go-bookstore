import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import '../../style/SignupForm.css';

function SignUpForm() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        user_type: 'USER',
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(signupUser(formData))
            .unwrap()
            .then(() => {
                navigate('/login');
            })
            .catch((error) => {
                console.error('Failed to register:', error);
            });
    };

    return (
        <div className="form-container" style={{ marginTop: '100px'}}>
            <form onSubmit={handleSubmit}>
                <label>First Name:</label>
                <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                />
                <label>Last Name:</label>
                <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                />
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <label>Phone:</label>
                <input
                    type="number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit" disabled={auth.status === 'loading'}>
                    {auth.status === 'loading' ? 'Registering...' : 'Signup'}
                </button>
                {auth.error && <p className="error-message">{auth.error}</p>}

                <button className="login-button" onClick={handleLoginClick}>
                  Login
               </button>
            </form>
        </div>
    );
}

export default SignUpForm;
