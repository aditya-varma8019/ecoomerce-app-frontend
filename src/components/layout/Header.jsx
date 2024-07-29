import React from "react";
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaShoppingCart } from "react-icons/fa";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import SearchInput from "../form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";


const Header = () => {

    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const categories = useCategory();
    const [cart] = useCart();

    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: ""
        });
        localStorage.removeItem("auth");
        toast.success("Successfully logout");
        navigate("/login");
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link to="/" className="navbar-brand"> <FaShoppingCart /> ECOMMERCE APP</Link>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <SearchInput />
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link">Home</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <Link to={"/"} className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                                    Categories
                                </Link>
                                <ul className="dropdown-menu" >
                                    <li><Link to={`/categories`} className="dropdown-item">All Categories</Link></li>
                                    {categories?.map((c) => (
                                        <li key={c._id}><Link to={`/category/${c.slug}`} className="dropdown-item">{c.name}</Link></li>
                                    ))}
                                </ul>
                            </li>


                            {
                                !auth.user ? (
                                    <>
                                        <li className="nav-item">
                                            <NavLink to="/register" className="nav-link">Register</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/login" className="nav-link">Login</NavLink>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li className="dropdown">
                                            <button className="nav-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                {auth?.user?.name}
                                                {/* {"hello".captilize} */}
                                            </button>
                                            <ul className="dropdown-menu">
                                                <li><NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="dropdown-item">
                                                    Dashboard</NavLink>
                                                </li>
                                                <li><hr className="dropdown-divider" /></li>
                                                <li className="nav-item">
                                                    <NavLink onClick={handleLogout} to='/login' className="dropdown-item">Logout</NavLink>
                                                </li>
                                            </ul>
                                        </li>
                                    </>
                                )
                            }
                            <li className="nav-item">
                                <Badge count={cart?.length} showZero offset={[-3, 8]} >
                                    <NavLink to="/cart" className="nav-link position-relative" style={{ top: "5px" }}>Cart</NavLink>
                                </Badge>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav >

        </>
    );
};

export default Header;
