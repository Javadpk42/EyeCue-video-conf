import { createSlice } from "@reduxjs/toolkit";

// Helper function to get stored admin info from local storage
const getStoredAdminInfo = () => {
    try {
        const storedInfo = localStorage.getItem('admin');
        return storedInfo ? JSON.parse(storedInfo) : null;
    } catch (error) {
        console.error('Error parsing admin info from local storage:', error);
        return null;
    }
};

// Initial state
const initialState = {
    currentAdmin: getStoredAdminInfo(),
    error: null
};

// Create a slice for admin state management
const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.error = null;
        },
        signInSuccess: (state, action) => {
            state.currentAdmin = action.payload;
            state.error = null;
            localStorage.setItem('admin', JSON.stringify(action.payload));
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
        },
        signoutSuccess: (state) => {
            state.currentAdmin = null;
            state.error = null;
            localStorage.removeItem('admin');
        },
    }
});

// Export actions and reducer
export const { signInStart, signInSuccess, signInFailure, signoutSuccess } = adminSlice.actions;
export default adminSlice.reducer;
