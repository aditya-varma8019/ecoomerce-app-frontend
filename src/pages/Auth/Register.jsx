import React, { useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../styles/AuthStyles.css";
const Register = () => {

    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        question: ''
    })

    const naviage = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, data);
            if (res.data.success) {
                toast.success(res.data.message);
                naviage('/login');
            }
            else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h4 className="title">Register</h4>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text"
                        className="form-control"
                        id="name"
                        value={data.name}
                        onChange={e => setData({ ...data, name: e.target.value })}
                        required />
                </div>
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
                    <label htmlFor="phone" className="form-label">Phone No</label>
                    <input type="text"
                        className="form-control"
                        id="phone"
                        value={data.phone}
                        onChange={e => setData({ ...data, phone: e.target.value })}
                        required />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text"
                        className="form-control"
                        id="address"
                        value={data.address}
                        onChange={e => setData({ ...data, address: e.target.value })}
                        required />
                </div>
                <div className="mb-3">
                    <label htmlFor="question" className="form-label">What is your first pet's name?</label>
                    <input type="text"
                        className="form-control"
                        id="question"
                        value={data.question}
                        onChange={e => setData({ ...data, question: e.target.value })}
                        required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>);
};

export default Register;
