import { useState } from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import SmallProduct from "./SmallProduct";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";


const ProductTabs = ({
    loadingProductReview,
    userInfo,
    submitHandler,
    rating, setRating,
    comment, setComment,
    product
}) => {

    const { data, isLoading } = useGetTopProductsQuery();
    const [activeTab, setActiveTab] = useState(1);

    if (isLoading) {
        return <Loader />
    };



    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    };


    return (
        <div className="flex flex-col md:flex-row">

            <section className="mr-[5rem]">

                <div className={`flex-1 p-4 cursor-pointer text-lg 
                                ${activeTab === 1 ? "font-bold" : ""}`}
                    onClick={() => handleTabClick(1)}>
                    Write Your Review
                </div>

                <div className={`flex-1 p-4 cursor-pointer text-lg 
                                ${activeTab === 2 ? "font-bold" : ""}`}
                    onClick={() => handleTabClick(2)}>
                    All Reviews
                </div>

                <div className={`flex-1 p-4 cursor-pointer text-lg 
                                ${activeTab === 3 ? "font-bold" : ""}`}
                    onClick={() => handleTabClick(3)}>
                    Related Products
                </div>

            </section>


            {/* Second part */}
            <section>
                {activeTab === 1 && (
                    <div className="mt-4">
                        {userInfo ? (
                            <form onSubmit={submitHandler}>

                                <div className="my-2">
                                    <label htmlFor="rating" className="block text-xl mb-2">
                                        Rating By Stars: </label>

                                    <select id="rating" required value={rating}
                                        onChange={e => setRating(e.target.value)}
                                        className="p-2 border rounded-lg xl:w-[20rem] text-white bg-black">
                                        <option value="">Select Rating</option>
                                        <option value="1">Inferior &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1-Star&nbsp;&nbsp;&nbsp;&nbsp; *</option>
                                        <option value="2">Decent &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2-Stars &nbsp;&nbsp;**</option>
                                        <option value="3">Great &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3-Stars &nbsp;&nbsp;***</option>
                                        <option value="4">Excellent &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4-Stars &nbsp;&nbsp;****</option>
                                        <option value="5">Exceptional &nbsp;&nbsp;&nbsp;&nbsp;5-Stars &nbsp;&nbsp;*****</option>
                                    </select>

                                </div>


                                <div className="my-2">
                                    <label htmlFor="comment" className="block text-xl mb-2">
                                        Comment</label>

                                    <textarea id="comment" rows="3" required value={comment}
                                        onChange={e => setComment(e.target.value)}
                                        className="p-2 border rounded-lg xl:w-[30rem] text-white bg-black"
                                        placeholder="write a comment ...">

                                    </textarea>
                                </div>

                                <button type="submit" disabled={loadingProductReview}
                                    className="bg-orange-500 text-white py-2 px-4 rounded-lg">
                                    Publish</button>

                            </form>
                        ) : (
                            <p>Please <Link to="/login"> Sign in </Link> to write a review</p>
                        )}
                    </div>
                )}
            </section>



            <section className="">
                {activeTab === 2 && (
                    <>
                        <div>
                            {product.reviews.length === 0 && <p>No Reviews</p>}
                        </div>
                        <div>
                            {product.reviews.map((review) => (
                                <div key={review._id} className="bg-[#1A1A1A] p-4 rounded-lg 
                                xl:ml-[2rem] sm:ml-[0rem] xl:w-[30rem] sm:w-[24rem] mb-5">
                                    <div className="flex justify-between">
                                        <strong className="text-[#B0B0B0]">{review.name}</strong>
                                        <p className="text-[#B0B0B0]">
                                            {review.createdAt.substring(0, 10)}
                                        </p>
                                    </div>

                                    <p className="my-4">{review.comment}</p>
                                    <Ratings value={review.rating} />

                                </div>
                            ))}
                        </div>
                    </>
                )}
            </section>



            <section>
                {activeTab === 3 && (
                    <section className="ml-[4rem] flex flex-wrap">
                        {!data ? (
                            <Loader />
                        ) : (
                            data.map((product) => (
                                <div key={product._id}>
                                    <SmallProduct product={product} />
                                </div>
                            ))
                        )}
                    </section>
                )}
            </section>



        </div>
    )
};


export default ProductTabs;