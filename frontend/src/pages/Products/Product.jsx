import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";


const Product = ({ product }) => {




    return (
        <div className="w-[30rem] ml-[2rem] p-3 relative">

            <div className="relative">
                <img src={product.image} alt={product.name}
                    className="rounded object-fit w-[25rem] h-[15rem]" />
                <HeartIcon product={product} />
            </div>

            <div className="p-4">
                <Link to={`/product/${product._id}`}>
                    <h2 className="flex justify-between items-center">
                        <div className="text-lg">{product.name}</div>
                        <span className="bg-orange-300 text-orange-800 text-sm 
                        font-medium mr-[3rem] px-2.5 py-0.5 rounded-full dark:bg-orange-600 
                        dark:text-orange-100">{product.price} $</span>
                    </h2>
                </Link>
            </div>

        </div>
    )
};


export default Product;