import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/apiClient';

// Async thunk to fetch representative by ID
export const fetchRepresentativeDetailsById = createAsyncThunk(
    'representative/fetchById',
    async (id) => {
        const response = await api.get(`/api/representatives/details/${id}`);
        return response.data.data; // assumes your API returns { data: { ... } }
    }
);

const representativeSlice = createSlice({
    name: 'representative',
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearRepresentative: (state) => {
            state.data = null;
            state.error = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRepresentativeDetailsById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRepresentativeDetailsById.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchRepresentativeDetailsById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch';
            });
    },
});

export const { clearRepresentative } = representativeSlice.actions;
export default representativeSlice.reducer;
