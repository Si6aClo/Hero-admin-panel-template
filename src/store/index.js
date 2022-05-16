import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import heroes from '../components/heroesList/heroesSlice';
import filters from '../components/heroesAddForm/filtersSlice';

const store = configureStore({
    reducer: {heroes, filters},
    middleware: [thunk],
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;