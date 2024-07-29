import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CreateProduct = () => {

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

    const handleCreate = async (e) => {
        console.log(newProduct);
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", newProduct.name);
            productData.append("description", newProduct.description);
            productData.append("price", newProduct.price);
            productData.append("category", newProduct.category);
            productData.append("quantity", newProduct.quantity);
            productData.append("shipping", newProduct.shipping);
            productData.append("photo", newProduct.photo);
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-product`, productData);
            if (res?.data?.success) {
                toast.success("Product Created Successfully");
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

    return (
        <div className="container-fluid m-3 p-3">

            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1>Create Product</h1>
                    <div className="m-1 w-75">
                        <Select placeholder="Select a Category" showSearch size="large"
                            className="form-select mb-3" onChange={(value) => setNewProduct({ ...newProduct, category: value })}
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
                            {newProduct.photo && (
                                <div className="text-center">
                                    <img src={URL.createObjectURL(newProduct.photo)} alt="product_photo" height={'200px'} className="img img-resposive"></img>
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
                                onChange={(value) => setNewProduct({ ...newProduct, shipping: value })}
                            >
                                <Option value="0">No</Option>
                                <Option value="1">Yes</Option>
                            </Select>
                        </div>
                        <div className="mb-3">
                            <button className="btn btn-primary" onClick={handleCreate}>Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default CreateProduct;
