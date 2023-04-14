import { useState, useEffect } from "react";
import axios from "axios";

export const useCategory = () => {
    const [categories, setCategories] = useState([])
   

    //get Categories
    const getCategories = async () => {
        try {
            const { data } = await axios.get("http://localhost:3001/api/category/all-category");
            setCategories(data?.category)
            
        } catch (error) {
            console.log(error)
            

        }
    }
    useEffect(() => {
        getCategories()
    }, [])
    return categories
}