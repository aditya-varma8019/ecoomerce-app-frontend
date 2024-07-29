import React from "react";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";

const Search = () => {

    const [values, setValues] = useSearch();

    const navigate = useNavigate();

    return (
        <div>
            <div className="container">
                <div className="text-center">
                    <h1>Search Results</h1>
                    <h4>{values?.results.length < 1 ? "No Products Found" : `Found ${values?.results.length} products`}</h4>
                    <div className="d-flex flex-wrap mt-4">
                        {values?.results.map((p) => (
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
            </div>
        </div>
    )
};

export default Search;
