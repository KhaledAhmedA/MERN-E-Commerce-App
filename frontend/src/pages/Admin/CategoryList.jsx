import { useState } from "react";
import {
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useFetchCategoriesQuery
} from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Modal";
import AdminMenu from "./AdminMenu";



const CategoryList = () => {

    const { data: categories } = useFetchCategoriesQuery();

    const [name, setName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [updatedName, setUpdatedName] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const [createCategory] = useCreateCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();


    const handleCreateCategory = async (e) => {
        e.preventDefault();

        if (!name) {
            toast.error("Category Name Required");
            return;
        };

        try {

            const result = await createCategory({ name }).unwrap();

            if (result.error) {
                toast.error(error);
            } else {
                setName("");
                toast.success(`${result.name} is created`);
            };


        } catch (error) {
            console.error(error);
            toast.error("Failed To Create New Category");
        }

    };



    const handleUpdateCategory = async (e) => {
        e.preventDefault();

        if (!updatedName) {
            toast.error("Category Name Required");
            return;
        }


        try {

            const result = await updateCategory({
                categoryId: selectedCategory._id,
                updatedCategory: {
                    name: updatedName,
                },
            }).unwrap();


            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success(`${result.name} is updated`);
                setSelectedCategory(null);
                setUpdatedName("");
                setModalVisible(false);
            }


        } catch (error) {
            console.error(error);
            // toast.error("Failed To Update Category");
        }

    };


    const handleDeleteCategory = async () => {

        try {

            const result = await deleteCategory(selectedCategory._id).unwrap();

            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success(`${result.name} deleted successfully`);
                setSelectedCategory(null);
                setModalVisible(false);
            };


        } catch (error) {
            console.error(error);
            toast.error("Failed Category Delection");
        }

    };



    return (
        <div className="flex flex-col ml-[10rem] md:flex-row">
            <AdminMenu />
            <div className="md:w-3/4 p-3">
                <div className="h-12">Manage Categories</div>

                <CategoryForm value={name} setValue={setName}
                    handleSubmit={handleCreateCategory} />

                <br />
                <hr />

                <div className="flex flex-wrap">

                    {categories?.map((category) => (
                        <div key={category._id}>
                            <button className="bg-white border border-orange-500 text-orange-500 
                            py-2 px-4 rounded-lg m-3 hover:bg-orange-500 hover:text-white 
                            focus:outline-none focus:ring-2 focus:ring-orange-500 
                            focus:ring-opacity-50" onClick={() => {
                                    {
                                        setModalVisible(true);
                                        setSelectedCategory(category);
                                        setUpdatedName(category.name);
                                    }
                                }}>{category.name}</button>
                        </div>
                    ))}

                </div>

                <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} >
                    <CategoryForm value={updatedName}
                        setValue={(value) => setUpdatedName(value)}
                        handleSubmit={handleUpdateCategory}
                        buttonText="Update"
                        handleDelete={handleDeleteCategory} />
                </Modal>

            </div>
        </div>
    )
};


export default CategoryList;