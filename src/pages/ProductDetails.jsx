import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/CategoryProductStyles.css";
const ProductDetails = () => {

    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    // const [imgSrc, setImgSrc] = useState("");
    const params = useParams();
    const navigate = useNavigate();

    const getProduct = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`);
            setProduct(data?.product);
            // setImgSrc(`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product?._id}`)
            getSimilarProducts(data?.product._id, data?.product.category._id);
        }
        catch (error) {
            console.log(error);
        }
    }

    const getSimilarProducts = async (pid, cid) => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/similar-products/${pid}/${cid}`);
            setRelatedProducts(data?.products);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (params?.slug) {
            getProduct();
            // getSimilarProducts();
        }

    }, [params]);

    return (
        <div>
            <div className="row container mt-2">
                <div className="col-md-6">
                    <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`} className="card-img-top" alt={product.name} height="300" width={"350px"} />
                </div>
                <div className="col-md-6">
                    <h1 className="text-center">Product Details</h1>
                    <h5>Name: {product.name}</h5>
                    <h5>Description: {product.description}</h5>
                    <h5>Category: {product?.category?.name}</h5>
                    <h5>Price: ${product.price}</h5>
                    <h5>Shipping: {product.shipping ? "Yes" : "No"}</h5>
                    {/* <button className="btn btn-primary ms-1">Buy Now</button> */}
                    <button className="btn btn-secondary ms-1">Add to Cart</button>
                </div>
            </div>
            <hr />
            <div className="row container">
                <h6>similar products</h6>
                {relatedProducts.length === 0 && <p className="text-center">No Similar Products Found</p>}
                <div className="d-flex flex-wrap">
                    {relatedProducts?.map((p) => (
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
            </div>
        </div >
    )
};

export default ProductDetails;
