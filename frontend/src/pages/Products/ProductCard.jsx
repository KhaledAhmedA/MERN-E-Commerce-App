import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";


const ProductCard = ({ p }) => {

    const dispatch = useDispatch();

    const addToCartHandler = (product, qty) => {
        dispatch(addToCart({ ...product, qty }));
        toast.success(`${product.name} added to your cart`, {
            autoClose: 2000
        });
    }

    return (

        <div className="max-w-sm relative bg-[#1A1A1A] rounded-lg shadow 
        dark:bg-gray-800 dark:border-gray-700">

            <section className="relative">
                <Link to={`/product/${p._id}`}>
                    <span className="absolute bottom-3 right-3 bg-orange-300 
                    text-orange-600 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full 
                    dark:bg-orange-500 dark:text-orange-200">{p?.brand}</span>
                    <img src={p?.image} alt={p?.name} className="cursor-pointer w-[30rem]"
                        style={{ height: "200px", objectFit: "fill" }} />
                </Link>
                <HeartIcon product={p} />
            </section>

            <div className="p-5">
                <div className="flex justify-between">
                    <h5 className="mb-2 text-xl text-white dark:text-white">
                        {p?.name}</h5>

                    <p className="ml-[1rem] text-black font-semibold text-orange-500">
                        {p?.price?.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                        })}
                    </p>

                </div>



                <p className="mb-3 font-normal text-[#CFCFCF]">
                    {p?.description?.substring(0, 60)} ...</p>

                <section className="flex justify-between items-center">
                    <Link to={`/product/${p._id}`}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium 
                        text-center text-white bg-orange-500 rounded-lg hover:bg-orange-400 
                        focus:ring-4 focus:outline-none focus:ring-orange-300 
                        dark:bg-orange-400 dark:hover:bg-orange-500 dark:focus:ring-orange-600"
                    >Read More
                        <svg
                            className="w-3.5 h-3.5 ml-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                        </svg>
                    </Link>

                    <button className="p-2 rounded-full" onClick={() => addToCartHandler(p, 1)}>
                        <AiOutlineShoppingCart size={30} />
                    </button>


                </section>


            </div>

        </div>
    )
};



export default ProductCard;