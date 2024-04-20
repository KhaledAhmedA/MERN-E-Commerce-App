import { createSlice } from "@reduxjs/toolkit";


const favoriteSlice = createSlice({

    name: "favorites",
    initialState: [],


    reducers: {

        addToFavorites: (state, action) => {
            // check if product is not already in favorite
            if (!state.some((product) => product._id === action.payload._id)) {
                state.push(action.payload);
            }
        },


        removeFromFavorites: (state, action) => {
            // remove product by id
            return state.filter((product) => product._id !== action.payload._id);
        },


        setFavorites: (state, action) => {
            // set favorites from localStorage
            return action.payload;
        }

    }
});


export const { addToFavorites, removeFromFavorites, setFavorites } = favoriteSlice.actions;
export const selectFavoriteProduct = (state) => state.favorites;
export default favoriteSlice.reducer;