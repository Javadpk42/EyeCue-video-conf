// import { configureStore } from '@reduxjs/toolkit'
// import userReducer from './user/userSlice'

// export const store = configureStore({
//   reducer: {
//     user:userReducer
//   },
// })


import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import adminReducer from './admin/adminSlice'; // Assuming the admin slice is in a file named adminSlice.js

export const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer
  },
});





// import { configureStore } from '@reduxjs/toolkit';
// import { combineReducers } from 'redux';
// import callStatusReducer from './reducers/callStatusReducer';
// import streamsReducer from './reducers/streamsReducer';
// import userReducer from './user/userSlice'; // Import your existing user slice

// const rootReducer = combineReducers({
//     callStatus: callStatusReducer,
//     streams: streamsReducer,
//     user: userReducer,
// });

// const store = configureStore({
//     reducer: rootReducer,
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             serializableCheck: {
//                 // Ignore these action types
//                 ignoredActions: ['ADD_STREAM'],
//                 // Ignore these field paths in all actions
//                 ignoredActionPaths: ['payload.stream'],
//                 // Ignore these paths in the state
//                 ignoredPaths: ['streams.localStream', 'streams.remoteStream'],
//             },
//         }),
// }); 

// export type RootState = ReturnType<typeof rootReducer>;
// export type AppDispatch = typeof store.dispatch;
// export default store