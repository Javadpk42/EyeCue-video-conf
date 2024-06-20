const addStream = (who: string, stream: MediaStream, peerConnection: RTCPeerConnection) => {
    return {
        type: "ADD_STREAM",
        payload: {
            who,
            stream,
            peerConnection,
        },
    };
};

export default addStream;
