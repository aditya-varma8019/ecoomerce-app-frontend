import React, { useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";


const Login = () => {

    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, data);
            if (res && res.data.success) {
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.userToken
                })
                localStorage.setItem('auth', JSON.stringify(res.data));
                toast.success(res.data.message);
                navigate(location.state || '/');
            }
            else {
                toast.error();
            }
        } catch (error) {
            console.error(error);
            toast.error("Invalid Email");
        }
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h4 className="title">Login</h4>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email"
                        className="form-control"
                        id="email"
                        value={data.email}
                        onChange={e => setData({ ...data, email: e.target.value })}
                        required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password"
                        className="form-control"
                        id="password"
                        value={data.password}
                        onChange={e => setData({ ...data, password: e.target.value })}
                        required />
                </div>
                <div className="mb-3">
                    <button type="button" className="btn btn-primary" onClick={() => navigate('/forgot-password')}>Forgot Password</button>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default Login;
