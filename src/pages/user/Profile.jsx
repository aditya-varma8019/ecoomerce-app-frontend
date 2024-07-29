import React, { useEffect, useState } from "react";
import UserMenu from "../../components/layout/UserMenu";
import { json, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth";

const Profile = () => {

    const [data, setData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    })
    const [password, setPassword] = useState('');
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        setData({ ...auth?.user })
    }, [auth?.user])

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/profile`, data);
            if (res?.data.error) {
                toast.error(res.data.message);
            }
            else {
                setAuth({ ...auth, user: res?.data?.updatedUser });
                // setAuth({...auth, user.password:''})
                let ls = localStorage.getItem('auth');
                ls = JSON.parse(ls);
                ls.user = res?.data?.updatedUser;
                // delete ls.password;
                localStorage.setItem('auth', JSON.stringify(ls));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    }

    return (
        <div className="container-fluid p-3 m-3">
            <div className="row">
                <div className="col-md-3">
                    <UserMenu />
                </div>
                <div className="col-md-9">
                    <h1>Your Profile</h1>
                    <div className="form-container">
                        <form onSubmit={handleSubmit}>
                            <h4 className="title">Update Profile</h4>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text"
                                    className="form-control"
                                    id="name"
                                    value={data.name}
                                    onChange={e => setData({ ...data, name: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email"
                                    className="form-control"
                                    id="email"
                                    value={data.email}
                                    onChange={e => setData({ ...data, email: e.target.value })}
                                    disabled
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password"
                                    className="form-control"
                                    id="password"
                                    value={data.password}
                                    onChange={e => setData({ ...data, password: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">Phone No</label>
                                <input type="text"
                                    className="form-control"
                                    id="phone"
                                    value={data.phone}
                                    onChange={e => setData({ ...data, phone: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address" className="form-label">Address</label>
                                <input type="text"
                                    className="form-control"
                                    id="address"
                                    value={data.address}
                                    onChange={e => setData({ ...data, address: e.target.value })}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Profile;
