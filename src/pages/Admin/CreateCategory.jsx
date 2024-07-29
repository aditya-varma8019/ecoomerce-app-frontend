import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import CategoryForm from "../../components/form/CategoryForm";
import { Modal } from 'antd';

const CreateCategory = () => {

    const [categories, setCategories] = React.useState([]);
    const [newCategory, setNewCategory] = React.useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectCategory, setSelectCategory] = useState(null);
    const [updatedCategory, setUpdatedCategory] = useState("");

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`, { name: newCategory });
            if (res.data.success) {
                if (newCategory !== "")
                    toast.success(`${newCategory} added successfully`);
                getAllCategories();
                setNewCategory('');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        getAllCategories();

        //eslint-disable-next-line
    }, [])

    const handleUpdateCategory = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selectCategory._id}`, { name: updatedCategory });
            if (res.data.success) {
                toast.success(`${updatedCategory} updated successfully`);
                setSelectCategory(null);
                setUpdatedCategory("");
                setIsModalOpen(false);
                getAllCategories();
            }
            else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }


    const handleDeleteCategory = async (id) => {
        // e.preventDefault();
        try {
            const res = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${id}`);
            if (res.data.success) {
                toast.success(`${newCategory} Deleted successfully`);
                setNewCategory("");
                getAllCategories();
            }
            else {
                toast.error(res.data.message);
            }
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
                    <h1>Manage Categories</h1>
                    <div className="p-3 w-50">
                        <CategoryForm handleSubmit={handleSubmit} value={newCategory} setValue={setNewCategory} />
                    </div>
                    <div className="w-75">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories?.map((category) => (
                                    <tr key={category._id}>
                                        <td>{category.name}</td>
                                        <td>
                                            <button className="btn btn-warning ms-2" onClick={() => { setIsModalOpen(true); setUpdatedCategory(category.name); setSelectCategory(category) }} >Edit</button>
                                            <button className="btn btn-danger ms-2" onClick={() => { setNewCategory(category.name); handleDeleteCategory(category._id) }}>Delete</button>
                                        </td>
                                    </tr>

                                ))}

                            </tbody>
                        </table>

                    </div>
                    <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <CategoryForm value={updatedCategory} setValue={setUpdatedCategory} handleSubmit={handleUpdateCategory} />
                    </Modal>
                </div>
            </div>
        </div>
    )
};

export default CreateCategory;
