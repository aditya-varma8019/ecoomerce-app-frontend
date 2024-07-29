import { useState, useEffect } from "react";
import axios from "axios";

export default function useCategory() {
    const [allCategories, setAllCategories] = useState([]);

    //get all categories
    const getAllCategories = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
            setAllCategories(data?.categories);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllCategories();
    }, []);

    return allCategories;
}