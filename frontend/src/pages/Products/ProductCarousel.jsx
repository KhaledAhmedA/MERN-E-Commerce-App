import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
    FaBox,
    FaClock,
    FaShoppingCart,
    FaStar,
    FaStore
} from "react-icons/fa";



const ProductCarousel = () => {

    const { data: products, isLoading, error } = useGetTopProductsQuery();

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 10000,
    };




    return (
        <div className="mb-4 xl:block lg:block md:block">
            {isLoading ? null : error ? (
                <Message variant="danger">
                    {error?.data?.message || error.message}
                </Message>
            ) : (<Slider {...settings}
                className="xl:w-[50rem] lg:w-[50rem] md:w-[56rem] sm:w-[40rem] sm:block">
                {products.map(({
                    image, _id, name, price,
                    description, brand, createdAt, numReviews,
                    rating, quantity, countInStock }) => (
                    <div key={_id}>
                        <img src={image} alt={name}
                            className="w-full rounded-lg object-fit h-[30rem] mb-5" />
                        <div className="flex justify-between w-[20rem] ml-12">

                            <div className="one">
                                <h2>{name}</h2><br />
                                <p>Price:&nbsp;&nbsp;{price}&nbsp;$</p><br /><br />
                                <p className="w-[20rem]">{description.substring(0, 150)} ...</p>
                            </div>

                            <div className="flex justify-between w-[20rem]">
                                <div className="one">
                                    <h1 className="flex items-center mb-6 w-[15rem]">
                                        <FaStore className="mr-2 text-white" />&nbsp;
                                        Brand:&nbsp; {brand}
                                    </h1>
                                    <h1 className="flex items-center mb-6 w-[15rem]">
                                        <FaClock className="mr-2 text-white" />&nbsp;
                                        Added:&nbsp; {moment(createdAt).fromNow()}
                                    </h1>
                                    <h1 className="flex items-center mb-6 w-[15rem]">
                                        <FaStar className="mr-2 text-white" />&nbsp;
                                        Reviews:&nbsp; {numReviews}
                                    </h1>
                                </div>

                                <div className="two">
                                    <h1 className="flex items-center mb-6 w-[15rem]">
                                        <FaStar className="mr-2 text-white" />&nbsp;
                                        Ratings:&nbsp; {Math.round(rating)}
                                    </h1>
                                    <h1 className="flex items-center mb-6 w-[15rem]">
                                        <FaShoppingCart className="mr-2 text-white" />&nbsp;
                                        Quantity:&nbsp; {quantity}
                                    </h1>
                                    <h1 className="flex items-center mb-6 w-[15rem]">
                                        <FaBox className="mr-2 text-white" />&nbsp;
                                        In Stock:&nbsp; {countInStock}
                                    </h1>
                                </div>

                            </div>

                        </div>
                    </div>
                ))}
            </Slider>)}
        </div>
    )
};


export default ProductCarousel;