// add product to localStorage
export const addFavoriteToLocalStorage = (product) => {

    const favorites = getFavoritesFromLocalStorage();

    if (!favorites.some((prdct) => prdct._id === product._id)) {
        favorites.push(product);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    };

};



// remove product from localStorage
export const removeFavoriteFromLocalStorage = (productId) => {

    const favorites = getFavoritesFromLocalStorage();

    const updateFavorites = favorites.filter((product) => product._id !== productId);

    localStorage.setItem("favorites", JSON.stringify(updateFavorites));
};



// retrive product from localStorage
export const getFavoritesFromLocalStorage = () => {
    const favoritesJSON = localStorage.getItem("favorites");
    return favoritesJSON ? JSON.parse(favoritesJSON) : [];
};