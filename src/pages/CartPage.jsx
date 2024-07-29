import React, { useEffect, useState } from "react";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/CartStyles.css";

const CartPage = () => {

    const [cart, setCart] = useCart();
    const [auth] = useAuth();
    const navigate = useNavigate();
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);

    const getToken = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/braintree/token`)
            setClientToken(data?.clientToken);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getToken();
    }, [auth?.token])

    const removeCartItem = (pid) => {
        try {
            let temp = [...cart];
            let index = temp.findIndex((item) => item._id === pid);
            temp.splice(index, 1);
            setCart(temp);
            localStorage.setItem("cart", JSON.stringify(temp));
        } catch (error) {
            console.log(error);

        }
    }

    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((p) => {
                total = total + p.price
            });

            return total.toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
            });

        } catch (error) {
            console.log(error);
        }
    }

    const handlePayment = async () => {
        try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod()
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`, {
                nonce,
                cart
            })
            setLoading(false);
            localStorage.removeItem("cart");
            setCart([]);
            navigate("/dashboard/user/orders");
            toast.success("Payment Successfull");
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <>
            <div className="container cart-page">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="text-center bg-light p-2 mb-1">
                            {`Hello ${auth?.token && auth?.user?.name}`}
                        </h1>
                        <h4 className="text-center">
                            {cart?.length > 0 ? `You have ${cart?.length} items in cart ${auth?.token ? "" : " Please Login to checkout"}` : "Your Cart is empty"}
                        </h4>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-7 p-0 m-0">
                            {cart?.map((p) => (
                                <div className="row card flex-row">
                                    <div className="col-md-4">
                                        <img
                                            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                            className="card-img-top"
                                            alt={p.name}
                                            width={"100px"}
                                            height={"100px"}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <p>{p.name}</p>
                                        <p>{p.description.substring(0, 30)}</p>
                                        <p>Price: ${p.price}</p>
                                    </div>
                                    <div className="col-md-4 cart-remove-btn">
                                        <button className="btn btn-danger" onClick={() => removeCartItem(p._id)}>Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="col-md-5 cart-summary">
                            <h2>Cart Summary</h2>
                            <p>Total | Checkout | Payment</p>
                            <hr />
                            <h4>Total: {totalPrice()}</h4>
                            {auth?.user?.address ? (
                                <>
                                    <div className="mb-3">
                                        <h4>Shipping Address</h4>
                                        <h5>{auth?.user?.address}</h5>
                                        <button className="btn btn-outline-warning" onClick={() => {
                                            navigate("/dashboard/user/profile")
                                        }}>Another Address</button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="mb-3">
                                        {auth?.token ? (
                                            <>
                                                <button className="btn btn-outline-warning" onClick={() => navigate("/dashboard/user/profile")}>Update Address</button>
                                            </>
                                        ) : (
                                            <>
                                                <button className="btn btn-outline-warning" onClick={() => navigate("/login", { state: "/cart" })}>Login to Checkout</button>
                                            </>
                                        )}
                                    </div>
                                </>
                            )}
                            <div className="mt-2">
                                {
                                    (!clientToken || !cart?.length) ? ("") : (
                                        <>
                                            <DropIn
                                                options={{
                                                    authorization: clientToken,
                                                    paypal: {
                                                        flow: "vault"
                                                    }
                                                }}
                                                onInstance={(instance) => setInstance(instance)}
                                            />
                                            <button className="btn btn-primary" onClick={handlePayment} disabled={loading || !instance || !auth?.user?.address}>{loading ? "Processing..." : "Pay"}</button>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default CartPage;
