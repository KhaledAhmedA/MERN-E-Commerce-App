import React from "react";
import { useState } from "react";
import {
    AiOutlineHome,
    AiOutlineShopping,
    AiOutlineLogin,
    AiOutlineUserAdd,
    AiOutlineShoppingCart
} from "react-icons/ai"
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation, useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";


const Navigation = () => {

    const { userInfo } = useSelector(state => state.auth);
    const { cartItems } = useSelector(state => state.cart);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const closeSidebar = () => {
        setShowSidebar(false);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();


    const logoutHandler = async () => {

        try {

            await logoutApiCall().unwrap();
            dispatch(logout());

            navigate('/login');

        } catch (error) {
            console.error(error);
        }

    };

    return (

        <div style={{ zIndex: 999 }}
            className={`${showSidebar ? "hidden" : "flex"} 
            xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white 
            bg-[#000] w-[4%] hover:w-[15%] h-[100vh] fixed`}
            id="navigation-container">



            <div className="flex flex-col justify-center space-y-4">

                <Link to="/" className="flex items-center transition-transform 
                hover:translate-x-2">
                    <AiOutlineHome size={30} className="mr-2 mt-[3rem]" />
                    <span className="hidden nav-item-name mt-[3rem]"> HOME </span>
                    {" "}
                </Link>

                <Link to="/shop" className="flex items-center transition-transform transform
                hover:translate-x-2">
                    <AiOutlineShopping size={30} className="mr-2 mt-[3rem]" />
                    <span className="hidden nav-item-name mt-[3rem]"> SHOP </span>
                    {" "}
                </Link>

                <Link to="/cart" className="flex relative">
                    <div className="flex justify-center items-center transition-transform transform 
                                    hover:translate-x-2">

                        <AiOutlineShoppingCart size={30} className="mr-2 mt-[3rem]" />
                        <span className="hidden nav-item-name mt-[3rem]"> CART </span>
                        {" "}
                    </div>

                    <div className="absolute top-6 left-0">
                        {cartItems.length > 0 && (
                            <span>
                                <span className="px-1.5 py-0.5 text-sm text-white bg-orange-500 rounded-full">
                                    {cartItems.reduce((acc, cur) => acc + cur.qty, 0)}
                                </span>
                            </span>
                        )}
                    </div>

                </Link>

                <Link to="/favorite" className="flex relative">
                    <div className="flex justify-center items-center transition-transform transform 
                                    hover:translate-x-2">

                        <FaHeart size={26} className="mr-2 mt-[3rem]" />
                        <span className="hidden nav-item-name mt-[3rem]"> Favorite </span>
                        {" "}
                        <FavoritesCount />
                    </div>
                </Link>

            </div>

            <div className="relative">
                <button onClick={toggleDropdown}
                    className="flex items-center text-gray-8000 focus:outline-none">

                    {userInfo ? (
                        <span className="text-white">{userInfo.username}</span>
                    ) : (<></>)}

                    {userInfo && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-4 w-4 ml-1 ${dropdownOpen ? "transform rotate-180" : ""
                                }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="white"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                            />
                        </svg>
                    )}

                </button>

                {dropdownOpen && userInfo && (
                    <ul className={`absolute right-0 mt-2 mr-14 space-y-2 bg-white 
                    text-gray-600 ${!userInfo.isAdmin ? '-top-20' : '-top-80'}`}>
                        {userInfo.isAdmin && (
                            <>
                                <li>
                                    <Link to="/admin/dashboard"
                                        className="block px-4 py-2 hover:bg-gray-100">
                                        Dashboard
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/admin/productlist"
                                        className="block px-4 py-2 hover:bg-gray-100">
                                        Products
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/admin/categorylist"
                                        className="block px-4 py-2 hover:bg-gray-100">
                                        Categories
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/admin/orderlist"
                                        className="block px-4 py-2 hover:bg-gray-100">
                                        Orders
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/admin/userlist"
                                        className="block px-4 py-2 hover:bg-gray-100">
                                        Users
                                    </Link>
                                </li>
                            </>
                        )}

                        <li>
                            <Link to="/profile"
                                className="block px-4 py-2 hover:bg-gray-100">
                                Profile
                            </Link>
                        </li>

                        <li>
                            <Link to="/admin/logout"
                                onClick={logoutHandler}
                                className="block px-4 py-2 hover:bg-gray-100">
                                Log out
                            </Link>
                        </li>



                    </ul>
                )}

            </div>

            {!userInfo && (
                <ul>

                    <li>
                        <Link to="/login" className="flex items-center transition-transform 
            hover:translate-x-2">
                            <AiOutlineLogin size={26} className="mr-2 mt-[3rem]" />
                            <span className="hidden nav-item-name mt-[3rem]"> Login </span>
                            {" "}
                        </Link>
                    </li>


                    <li>
                        <Link to="/register" className="flex items-center transition-transform 
            hover:translate-x-2">
                            <AiOutlineUserAdd size={26} className="mr-2 mt-[3rem]" />
                            <span className="hidden nav-item-name mt-[3rem]"> Register </span>
                            {" "}
                        </Link>
                    </li>

                </ul>
            )}

        </div>
    )
};


export default Navigation;