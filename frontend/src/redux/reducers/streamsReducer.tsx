// export default (state = {}, action: any) => {
//     if (action.type === "ADD_STREAM") {
//         const copyState = { ...state };
//         copyState[action.payload.who] = action.payload;
//         return copyState;
//     } else if (action.type === "LOGOUT_ACTION") {
//         return {};
//     } else {
//         return state;
//     }
// };

const streamsReducer = (state = {}, action) => {
    if (action.type === "ADD_STREAM") {
        return {
            ...state,
            [action.payload.who]: action.payload
        };
    } else if (action.type === "LOGOUT_ACTION") {
        return {};
    } else {
        return state;
    }
};

export default streamsReducer;