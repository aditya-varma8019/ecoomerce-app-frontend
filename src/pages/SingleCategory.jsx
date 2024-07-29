import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";

const SingleCategory = () => {

    const params = useParams();
    const [category, setCategory] = useState(null);
    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    const getCategoryAndProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`);
            setCategory(data?.category);
            setProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCategoryAndProducts();
    }, [params?.slug]);

    return (
        <div>
            <div className="container">
                <h1 className="text-center">Category: {category?.name}</h1>
                <hr />
                <h1 className="text-center">{products?.length} results found</h1>
                <div className="row">
                    <div className="d-flex flex-wrap">
                        {products?.map((p) => (
                            <div className="card m-2" style={{ width: '18rem' }} key={p._id}>
                                <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description.length > 30 ? p.description.substring(0, 30) + '...' : p.description}</p>
                                    <p className="card-text">${p.price}</p>
                                    <button className="btn btn-primary mx-1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                                    <button className="btn btn-warning mx-1">Add To Cart</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* <div className="m-2 p-3">
                        {products && products.length < totalCount && (
                            <button className="btn btn-warning" onClick={(e) => {
                                e.preventDefault();
                                setPage(page + 1);
                            }}>
                                {loading ? "Loading..." : "Loadmore"}
                            </button>
                        )}
                    </div> */}
                </div>
            </div>
        </div>
    )
};

export default SingleCategory;
