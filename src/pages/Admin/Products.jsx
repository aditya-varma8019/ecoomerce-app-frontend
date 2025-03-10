import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import { toast } from 'react-toastify'
import { Link } from "react-router-dom";
const Products = () => {

    const [allProducts, setAllProducts] = useState([]);

    const getAllProduts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`);
            setAllProducts(data.products);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    useEffect(() => {
        getAllProduts();

        //eslint-disable-next-line
    }, [])

    return (
        <div className="">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1 className="text-center">All Products</h1>
                    <div className="d-flex flex-wrap">
                        {allProducts?.map((p) => (
                            <Link to={`/dashboard/admin/product/${p.slug}`} key={p._id} className="product-link" >
                                <div className="card m-2" style={{ width: '18rem' }}>
                                    <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description}</p>
                                        {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                                    </div>
                                </div>

                            </Link>

                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Products;
