import { combineReducers } from 'redux';
import callStatusReducer from './callStatusReducer';
import streamsReducer from './streamsReducer';
import userReducer from '../user/userSlice'; // Import your existing user slice

const rootReducer = combineReducers({
    callStatus: callStatusReducer,
    streams: streamsReducer,
    user: userReducer, // Include your user slice
});

export default rootReducer;
