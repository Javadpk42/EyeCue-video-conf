const initState = {
    current: "idle",
    video: "off",
    audio: "off",
    audioDevice: 'default',
    videoDevice: 'default',
    shareScreen: false,
    haveMedia: false,
    haveCreatedOffer: false,
};

const callStatusReducer = (state = initState, action) => {
    if (action.type === "UPDATE_CALL_STATUS") {
        return {
            ...state,
            [action.payload.prop]: action.payload.value
        };
    } else if ((action.type === "LOGOUT_ACTION") || (action.type === "NEW_VERSION")) {
        return initState;
    } else {
        return state;
    }
};

export default callStatusReducer;

// export default (state = initState, action: any) => {
//     if (action.type === "UPDATE_CALL_STATUS") {
//         const copyState = { ...state };
//         copyState[action.payload.prop] = action.payload.value;
//         return copyState;
//     } else if ((action.type === "LOGOUT_ACTION") || (action.type === "NEW_VERSION")) {
//         return initState;
//     } else {
//         return state;
//     }
// };
