import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export const PrivateRoute = ({ children }) => {
    const [auth] = useAuth();
    const [ok, setOk] = useState(false);

    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/user-auth`, {
                // headers:{
                //     "Authorization": auth?.token
                // }
            });
            if (res.data.ok) {
                setOk(true);
            }
            else {
                setOk(false);
            }
        }
        if (auth?.token) authCheck();
    }, [auth?.token])

    return ok ? <Outlet /> : <Spinner />;
}