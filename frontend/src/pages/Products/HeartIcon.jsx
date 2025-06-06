import { useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
    addToFavorites,
    removeFromFavorites,
    setFavorites
} from "../../redux/features/favorites/favoriteSlice";
import {
    addFavoriteToLocalStorage,
    getFavoritesFromLocalStorage,
    removeFavoriteFromLocalStorage
} from "../../Utils/localStorage";

const HeartIcon = ({ product }) => {

    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorites) || [];

    const isFavorite = favorites.some(prdt => prdt._id === product._id);

    useEffect(() => {
        const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
        dispatch(setFavorites(favoritesFromLocalStorage));
    }, []);


    const toggleFavorites = () => {
        if (isFavorite) {
            dispatch(removeFromFavorites(product));
            removeFavoriteFromLocalStorage(product._id);
        } else {
            dispatch(addToFavorites(product));
            addFavoriteToLocalStorage(product);
        }
    }


    return (
        <div className="absolute top-2 right-5 cursor-pointer" onClick={toggleFavorites}>
            {isFavorite ? (<FaHeart className="text-orange-500 w-[1.5rem] h-[1.5rem]" />) :
                (<FaRegHeart className="text-white bg-gray-700 w-[1.5rem] h-[1.5rem]" />)}
        </div>
    )
};


export default HeartIcon;