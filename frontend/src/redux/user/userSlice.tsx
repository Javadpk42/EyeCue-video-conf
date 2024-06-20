// import { createSlice } from "@reduxjs/toolkit";

// const initialState ={
//     currentUser:null,
//     error:null
// }

// const userSlice= createSlice({
//     name:'user',
//     initialState,
//     reducers:{
//         signInStart: (state) => {
//             state.error = null;
//           },
//           signInSuccess: (state, action) => {
//             state.currentUser = action.payload;
//             state.error = null;
//           },
//           signInFailure: (state, action) => {
//             state.error = action.payload;
//           },
//           signoutSuccess: (state) => {
//             state.currentUser = null;
//             state.error = null;
//           },
//     }
// })

// export const {signInStart,signInSuccess,signInFailure,signoutSuccess}=userSlice.actions
// export default userSlice.reducer

import { createSlice } from "@reduxjs/toolkit";

const getStoredUserInfo = () => {
    try {
        const storedInfo = localStorage.getItem('user');
        return storedInfo ? JSON.parse(storedInfo) : null;
    } catch (error) {
        console.error('Error parsing user info from local storage:', error);
        return null;
    }
};

const initialState = {
    currentUser: getStoredUserInfo(),
    error: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.error = null;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.error = null;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
        },
        signoutSuccess: (state) => {
            state.currentUser = null;
            state.error = null;
            localStorage.removeItem('user');
        },
    }
});

export const { signInStart, signInSuccess, signInFailure, signoutSuccess } = userSlice.actions;
export default userSlice.reducer;
