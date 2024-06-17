import { createSlice } from "@reduxjs/toolkit";
import { IMovieData } from '../../types/IMovieData.ts'

export interface FavoritesState {
    favorites: IMovieData[]
}

const favoritesSlice = createSlice({
    name: "favorites",
    initialState: { favorites: [] } as FavoritesState,
    reducers: {
        addRemoveFavorites: (state, action) => {
            const itemInFavorites = state.favorites.find(
                (item) => item.id === action.payload.id
            )
            if (itemInFavorites) {
                state.favorites = state.favorites.filter((item) => item.id !== action.payload.id)

            } else {
                state.favorites.push({
                    ...action.payload
                })
            }
        }
    }
})

export const { addRemoveFavorites } = favoritesSlice.actions
export const favoritesReducer = favoritesSlice.reducer