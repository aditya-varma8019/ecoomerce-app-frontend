import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {

    const [data, setData] = useState({
        email: '',
        question: '',
        newPassword: ''
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`, data);
            if (res.data && res.data.success) {
                toast.success(res.data.message);
                navigate('/login');
            }
            else {
                toast.error(res.data.message);
            }
        }
        catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h4 className="title">Password Reset</h4>
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
                    <label htmlFor="question" className="form-label">What is your first pet's name?</label>
                    <input type="question"
                        className="form-control"
                        id="question"
                        value={data.question}
                        onChange={e => setData({ ...data, question: e.target.value })}
                        required />
                </div>
                <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">New Password</label>
                    <input type="newPassword"
                        className="form-control"
                        id="newPassword"
                        value={data.newPassword}
                        onChange={e => setData({ ...data, newPassword: e.target.value })}
                        required />
                </div>
                <button type="submit" className="btn btn-primary">Change Password</button>
            </form>
        </div>
    );
};

export default ForgotPassword;
