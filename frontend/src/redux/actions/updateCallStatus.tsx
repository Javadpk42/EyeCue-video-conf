const updateCallStatus = (prop: string, value: any) => {
    return {
        type: "UPDATE_CALL_STATUS",
        payload: { prop, value },
    };
};

export default updateCallStatus;
