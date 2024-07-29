import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

const UpdateProduct = () => {

    const [categories, setCategories] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        quantity: "",
        shipping: "",
        photo: "",
    });
    // const [category, setCategory] = useState("");

    const navigate = useNavigate();
    const params = useParams();

    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`);
            setNewProduct({
                _id: data.product._id,
                name: data.product.name,
                description: data.product.description,
                price: data.product.price,
                category: data.product.category._id,
                quantity: data.product.quantity,
                shipping: data.product.shipping,
                photo: data.product.photo
            })
        } catch (error) {
            console.log(error);
            // toast.error();
        }
    }

    useEffect(() => {
        getSingleProduct();

        //eslint-disable-next-line
    }, [])


    const getAllCategories = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);

            if (res?.data?.success) {
                setCategories(res.data.categories);
            }
            else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.res.data);
        }
    };


    useEffect(() => {
        getAllCategories();

        //eslint-disable-next-line
    }, [])

    const handleUpdate = async (e) => {
        // console.log(newProduct);
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", newProduct.name);
            productData.append("description", newProduct.description);
            productData.append("price", newProduct.price);
            productData.append("category", newProduct.category);
            productData.append("quantity", newProduct.quantity);
            productData.append("shipping", newProduct.shipping);
            newProduct.photo && productData.append("photo", newProduct.photo);
            const res = await axios.put(`${process.env.REACT_APP_API}/api/v1/product/update-product/${newProduct._id}`, productData);
            if (res?.data?.success) {
                toast.success("Product Updated Successfully");
                navigate('/dashboard/admin/products');
            }
            else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error);
        }
    }

    const handleDelete = async () => {
        try {
            let ans = window.confirm("Are you sure want to delete this product?");
            if (!ans) return;

            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/product/delete-product/${newProduct._id}`);
            toast.success(data.message);
            navigate('/dashboard/admin/products');
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    return (
        <div className="container-fluid m-3 p-3">

            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1>Update Product</h1>
                    <div className="m-1 w-75">
                        <Select placeholder="Select a Category" showSearch size="large"
                            className="form-select mb-3" onChange={(value) => setNewProduct({ ...newProduct, category: value })}
                            value={newProduct.category}
                        >
                            {categories?.map((c) => <Option key={c._id} value={c._id}>{c.name}</Option>)}
                        </Select>
                        <div className="mb-3">
                            <label className="btn btn-outline-secondary col-md-12">
                                {newProduct.photo ? newProduct.photo.name : "Upload Image"}
                                <input type="file" name="photo" accept="image/*" onChange={(e) => setNewProduct({ ...newProduct, photo: e.target.files[0] })} hidden />
                            </label>
                        </div>
                        <div className="mb-3">
                            {newProduct.photo ? (
                                <div className="text-center">
                                    <img src={URL.createObjectURL(newProduct.photo)} alt="product_photo" height={'200px'} className="img img-resposive"></img>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${newProduct._id}`} alt="product_photo" height={'200px'} className="img img-resposive"></img>
                                </div>
                            )}
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Product Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <textarea type="text" className="form-control" placeholder="Product Description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <input type="number" className="form-control" placeholder="Product Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <input type="number" className="form-control" placeholder="Product Quantity" value={newProduct.quantity} onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <Select
                                placeholder="Select Shipping"
                                size="large"
                                showSearch
                                className="form-select mb-3"
                                onChange={(value) => setNewProduct({ ...newProduct, shipping: value === '0' ? false : true })}
                                value={newProduct.shipping ? "yes" : "no"}
                            >
                                <Option value="0">No</Option>
                                <Option value="1">Yes</Option>
                            </Select>
                        </div>
                        <div className="mb-3">
                            <button className="btn btn-primary" onClick={handleUpdate}>Update</button>
                        </div>
                        <div className="mb-3">
                            <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default UpdateProduct;
