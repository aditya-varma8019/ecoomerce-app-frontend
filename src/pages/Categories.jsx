import React from "react";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {

    const allCategories = useCategory();

    return (
        <>
            <div className="container">
                <div className="row">
                    {allCategories?.map((c) => (
                        <div className="col-md-6 mt-5 mb-3 gx-3 gy-3" key={c._id}>
                            <Link className="btn btn-primary" to={`/category/${c.slug}`}>{c.name}</Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
};

export default Categories;
