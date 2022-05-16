import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from '../../hooks/http.hook';

const heroesAdapter = createEntityAdapter();

// const initialState = {
//     heroes: [],
//     heroesLoadingStatus: 'idle'
// }

const initialState = heroesAdapter.getInitialState({
    heroesLoadingStatus: 'idle'
});

export const fetchHeroes = createAsyncThunk(
    'heroes/fetchHeroes',
    () => {
        const { request } = useHttp();
        return request("http://localhost:3001/heroes");
    }
);

export const deleteHero = createAsyncThunk(
    'heroes/deleteHero',
    async (payload) => {
        const { request } = useHttp();
        await request(`http://localhost:3001/heroes/${payload}`, "DELETE");
        return payload;
    }
)

export const addHero = createAsyncThunk(
    'heroes/addHero',
    async (newHero) => {
        const { request } = useHttp();
        await request(`http://localhost:3001/heroes/`, "POST", JSON.stringify(newHero));
        return newHero;
    }
)

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, state => { state.heroesLoadingStatus = 'loading' })
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = 'idle';
                heroesAdapter.setAll(state, action.payload);
            })
            .addCase(fetchHeroes.rejected, state => { state.heroesLoadingStatus = 'error' })

            .addCase(deleteHero.fulfilled, (state, action) => {
                heroesAdapter.removeOne(state, action.payload);
            })

            .addCase(addHero.fulfilled, (state, action) => {
                heroesAdapter.addOne(state, action.payload);
            })
            .addDefaultCase(() => { })
    }
});

const { actions, reducer } = heroesSlice;

export default reducer;

export const { selectAll } = heroesAdapter.getSelectors(state => state.heroes);

export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroAdd,
    heroDelete
} = actions;
