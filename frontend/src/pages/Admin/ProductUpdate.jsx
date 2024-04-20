import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    useUpdateProductMutation,
    useDeleteProductMutation,
    useGetProductByIdQuery,
    useUploadProductImageMutation
} from "../../redux/api/productApiSlice";
import {
    useFetchCategoriesQuery
} from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";



const ProductUpdate = () => {

    const params = useParams();

    const { data: productData } = useGetProductByIdQuery(params._id);

    const [image, setImage] = useState(productData?.image || "");
    const [name, setName] = useState(productData?.name || "");
    const [description, setDescription] = useState(productData?.description || "");
    const [price, setPrice] = useState(productData?.price || "");
    const [quantity, setQunatity] = useState(productData?.quantity || "");
    const [category, setCategory] = useState(productData?.category || "");
    const [brand, setBrand] = useState(productData?.brand || "");
    const [stock, setStock] = useState(productData?.countInStock);

    const navigate = useNavigate();

    const { data: categories = [] } = useFetchCategoriesQuery();

    const [uploadProductImage] = useUploadProductImageMutation();
    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();


    useEffect(() => {
        if (productData && productData._id) {

            setName(productData.name);
            setDescription(productData.description);
            setPrice(productData?.price);
            setCategory(productData.categories?._id);
            setQunatity(productData.quantity);
            setBrand(productData.brand);
            setImage(productData.image);

        }
    }, [productData]);




    const uploadFileHandler = async (e) => {

        const formData = new FormData();
        formData.append("image", e.target.files[0]);

        try {

            const res = await uploadProductImage(formData).unwrap();
            toast.success("ITEM Added Successfully");
            setImage(res.image);

        } catch (error) {
            toast.error("");
        }

    };




    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const formData = new FormData();

            formData.append("image", image);
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("quantity", quantity);
            formData.append("brand", brand);
            formData.append("countInStock", stock);

            const { data } = await updateProduct({ productId: params._id, formData });

            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success(`${data.name} Updated Successfully`);
                navigate("/admin/allproductslist");
            };

        } catch (error) {
            console.error(error);
            toast.error("Failed To Update Product, something goes wrong!");
        }

    };




    const handleDelete = async () => {

        try {

            const { data } = await deleteProduct(params._id);

            let answer = window.confirm(`Are You Sure About Permanently Deleting ${data.name} Product?`);

            if (!answer) return;


            toast.success(`${data.name} Deleted Successfully`);
            navigate("/admin/allproductslist");

        } catch (error) {
            console.log(error);
            toast.error("Delation Faild, Try Again.");
        }

    };



    return (
        <div className="container xl:mx-[9rem] sm:mx-[0]">
            <div className="flex flex-col md:flex-row">

                <AdminMenu />

                <div className="md:w-3/4 p-3">
                    <div className="h-12">Create Product</div>

                    {image && (
                        <div className="text-center">
                            <img src={image} alt={name}
                                className="block mx-auto max-h-[200px]" />
                        </div>
                    )}


                    <div className="mb-3">
                        <label className="border text-white px-4 block w-[93%] 
                    text-center rounded-lg cursor-pointer font-bold py-11">

                            {image ? image.name : "Upload Product Image"}

                            <input type="file" name="image" accept="image/*"
                                onChange={uploadFileHandler}
                                className={!image ? 'hidden' : 'text-white'} />
                        </label>
                    </div>

                    <div className="p3">

                        <div className="flex flex-wrap">

                            <div className="one">
                                <label htmlFor="name">Name</label><br />
                                <input type="text" className="p-4 mb-3 w-[30rem] 
                            border rounded-lg bg-[#101011] text-white" value={name}
                                    onChange={(e) => setName(e.target.value)} />
                            </div>

                            <div className="two ml-20">
                                <label htmlFor="name block">Price</label><br />
                                <input type="number" className="p-4 mb-3 w-[30rem] 
                            border rounded-lg bg-[#101011] text-white" value={price}
                                    onChange={e => setPrice(e.target.value)} />
                            </div>

                        </div>


                        <div className="flex flex-wrap">

                            <div className="one">
                                <label htmlFor="name block">Brand</label><br />
                                <input type="text" className="p-4 mb-3 w-[30rem] 
                                border rounded-lg bg-[#101011] text-white" value={brand}
                                    onChange={e => setBrand(e.target.value)} />
                            </div>

                            <div className="two ml-20">
                                <label htmlFor="name block">Quantity</label><br />
                                <input type="number" className="p-4 mb-3 w-[30rem] 
                                border rounded-lg bg-[#101011] text-white" value={quantity}
                                    onChange={e => setQunatity(e.target.value)} />
                            </div>

                        </div>

                        <label htmlFor="" className="my-5">Description</label>
                        <textarea type="text" value={description}
                            className="p-2 mb-3 bg-[#101011] border rounded-lg w-[93%] text-white"
                            onChange={e => setDescription(e.target.value)}>
                        </textarea>

                        <div className="flex justify-between">
                            <div>
                                <label htmlFor="name block">Count In Stock</label><br />
                                <input type="number" className="p-4 mb-3 w-[30rem] border 
                                rounded-lg bg-[#101011] text-white" value={stock}
                                    onChange={e => setStock(e.target.value)} />
                            </div>

                            <div>
                                <label htmlFor="">Category</label><br />
                                <select placeholder="Choose Category"
                                    className="p-4 mb-3 w-[30rem] border 
                                rounded-lg bg-[#101011] text-white mr-[5rem]"
                                    onChange={e => setCategory(e.target.value)}>
                                    {categories?.map(cat => (
                                        <option key={cat._id} value={cat._id}>
                                            {cat.name}</option>
                                    ))}
                                </select>
                            </div>

                        </div>

                        <div className="flex justify-between">
                            <button
                                onClick={handleSubmit}
                                className="py-4 px-10 mt-5 rounded-lg 
                            text-lg font-bold bg-green-700 hover:bg-green-500 mr-6">
                                Save Changes
                            </button>
                            <button
                                onClick={handleDelete}
                                className="py-4 px-10 mt-5 rounded-lg 
                            text-lg font-bold bg-orange-500 hover:bg-orange-400 mr-[5rem]">
                                Delete Product
                            </button>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
};


export default ProductUpdate;