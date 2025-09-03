import { configureStore } from '@reduxjs/toolkit';
import representativeReducer from './slices/representativeSlice';
import subdomainReducer from './slices/subdomainSlice';

const store = configureStore({
    reducer: {
        representative: representativeReducer,
        subdomain: subdomainReducer,
    },
});

export default store;
