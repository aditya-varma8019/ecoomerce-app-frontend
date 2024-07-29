import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/layout/AdminMenu"
import toast from 'react-toastify'
import { useAuth } from "../../context/auth";
import axios from "axios";
import moment from "moment";
import { Select } from "antd";

const { Option } = Select

const AdminOrders = () => {

    const [status, setStatus] = useState(["Not processed", "Processing", "Shipped", "Delivered", "Cancelled"]);
    const [changeStatus, setChangeStatus] = useState("");
    const [auth] = useAuth();
    const [allOrders, setAllOrders] = useState([]);

    const getAllOrders = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/all-orders`);
            setAllOrders(data.orders);
        } catch (error) {
            console.log(error);
        }
    }

    // getOrders();

    useEffect(() => {
        if (auth?.token) getAllOrders();

    }, [auth?.token]);

    const handleChange = async (value, id) => {
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/order-status/${id}`, { status: value });

            getAllOrders();

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1 className="text-center">All Orders</h1>
                    {
                        allOrders?.map((o, i) => {
                            return (
                                <div className="border shadow">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Buyer</th>
                                                <th scope="col">Purchased On</th>
                                                <th scope="col">Quantity</th>
                                                <th scope="col">Payment</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th>{i + 1}</th>
                                                <th>
                                                    <Select onChange={(value) => handleChange(value, o?._id)} defaultValue={o?.status}>
                                                        {status.map((s, i) => (
                                                            <Option key={i} value={s}>{s}</Option>
                                                        ))}
                                                    </Select>
                                                </th>
                                                <th>{o?.buyer?.name}</th>
                                                <th>{moment(o?.createdAt).fromNow()}</th>
                                                <th>{o?.products.length}</th>
                                                <th>{o?.payment.success ? "Success" : "Failed"}</th>
                                                {/* <th>{o?.prod}</th> */}
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="container">
                                        {o?.products?.map((p, i) => (
                                            <div className="row mb-2 p-3 card flex-row">
                                                <div className="col-md-4">
                                                    <img
                                                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                                        className="card-img-top"
                                                        alt={p.name}
                                                        width={"100px"}
                                                        height={"100px"}
                                                    />
                                                </div>
                                                <div className="col-md-8">
                                                    <p>{p.name}</p>
                                                    <p>{p.description.substring(0, 30)}</p>
                                                    <p>Price: ${p.price}</p>

                                                </div>
                                            </div>
                                        ))
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
};

export default AdminOrders;
