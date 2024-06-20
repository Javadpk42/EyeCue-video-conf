// import { useEffect, useState, useRef } from "react";
// import { useSearchParams } from "react-router-dom"
// import axios from 'axios';
// import './VideoComponents.css';
// import CallInfo from "./CallInfo";
// import ChatWindow from "./ChatWindow";
// import ActionButtons from "./ActionButtons";
// import addStream from '../redux/actions/addStream';
// import { useDispatch, useSelector } from "react-redux";
// import createPeerConnection from "../webRTCutilities/createPeerConnection";
// import socketConnection from '../webRTCutilities/socketConnection';
// import updateCallStatus from "../redux/actions/updateCallStatus";
// import clientSocketListeners from "../webRTCutilities/clientSocketListeners";

// const MainVideoPage = ()=>{

//     const dispatch = useDispatch();
//     const callStatus = useSelector(state=>state.callStatus)
//     const streams = useSelector(state=>state.streams)
//     //get query string finder hook 
//     const [ searchParams, setSearchParams ] = useSearchParams();
//     const [ apptInfo, setApptInfo ] = useState({})
//     const smallFeedEl = useRef(null); //this is a React ref to a dom element, so we can interact with it the React way
//     const largeFeedEl = useRef(null);
//     const uuidRef = useRef(null);
//     const streamsRef = useRef(null);
//     const [ showCallInfo, setShowCallInfo] = useState(true)

//     useEffect(()=>{
//         //fetch the user media
//         const fetchMedia = async()=>{
//             const constraints = {
//                 video: true, //must have one constraint, just dont show it yet
//                 audio: true, //if you make a video chat app that doesnt use audio, but does (????), then init this as false, and add logic later ... hahaha
//             }
//             try{
//                 const stream = await navigator.mediaDevices.getUserMedia(constraints);
//                 dispatch(updateCallStatus('haveMedia',true)); //update our callStatus reducer to know that we have the media
//                 //dispatch will send this function to the redux dispatcher so all reducers are notified
//                 //we send 2 args, the who, and the stream
//                 dispatch(addStream('localStream',stream));
//                 const { peerConnection, remoteStream } = await createPeerConnection(addIce);
//                 //we don't know "who" we are talking to... yet.
//                 dispatch(addStream('remote1',remoteStream, peerConnection));
//                 //we have a peerconnection... let's make an offer!
//                 //EXCEPT, it's not time yet. 
//                     //SDP = information about the feed, and we have NO tracks
//                 //socket.emit...
//                 if(largeFeedEl.current){
//                     largeFeedEl.current.srcObject = remoteStream //we have the remoteStream from our peerConnection. Set the video feed to be the remoteStream jsut created
//                 }
//             }catch(err){
//                 console.log(err);
//             }
//         }
//         fetchMedia()
//     },[])

//     useEffect(()=>{
//         //we cannot update streamsRef until we know redux is finished
//         if(streams.remote1){
//             streamsRef.current = streams;
//         }
//     },[streams])
    
//     useEffect(()=>{
//         const createOfferAsync = async()=>{
//             //we have audio and video and we need an offer. Let's make it!
//             for(const s in streams){
//                 if(s !== "localStream"){
//                     try{
//                         const pc = streams[s].peerConnection;
//                         const offer = await pc.createOffer()
//                         pc.setLocalDescription(offer);
//                         //get the token from the url for the socket connection
//                         const token = searchParams.get('token');
//                         //get the socket from socketConnection
//                         const socket = socketConnection(token)
//                         socket.emit('newOffer',{offer,apptInfo})
//                         //add our event listeners
//                     }catch(err){
//                         console.log(err);
//                     }
//                 }
//             }
//             dispatch(updateCallStatus('haveCreatedOffer',true));
//         }
//         if(callStatus.audio === "enabled" && callStatus.video === "enabled" && !callStatus.haveCreatedOffer){
//             createOfferAsync()
//         }
//     },[callStatus.audio, callStatus.video, callStatus.haveCreatedOffer])

//     useEffect(()=>{
//         const asyncAddAnswer = async()=>{
//             //listen for changes to callStatus.answer
//             //if it exists, we have an answer!
//             for(const s in streams){
//                 if(s !== "localStream"){
//                     const pc = streams[s].peerConnection;
//                     await pc.setRemoteDescription(callStatus.answer);
//                     console.log(pc.signalingState)
//                     console.log("Answer added!")
//                 }
//             }
//         }

//         if(callStatus.answer){
//             asyncAddAnswer()
//         }

//     },[callStatus.answer])

//     useEffect(()=>{
//         //grab the token var out of the query string
//         const token = searchParams.get('token');
//         console.log(token)
//         const fetchDecodedToken = async()=>{
//             const resp = await axios.post('https://localhost:3000/validate-link',{token});
//             console.log(resp.data);
//             setApptInfo(resp.data)
//             uuidRef.current = resp.data.uuid;
//         }
//         fetchDecodedToken();
//     },[])

//     useEffect(()=>{
//         //grab the token var out of the query string
//         const token = searchParams.get('token');
//         const socket = socketConnection(token);
//         clientSocketListeners(socket,dispatch,addIceCandidateToPc);
//     },[])

//     const addIceCandidateToPc = (iceC)=>{
//         //add an ice candidate form the remote, to the pc
//         for (const s in streamsRef.current){
//             if(s !== 'localStream'){
//                 const pc = streamsRef.current[s].peerConnection;
//                 pc.addIceCandidate(iceC);
//                 console.log("Added an iceCandidate to existing page presence")
//                 setShowCallInfo(false);
//             }
//         }
//     }

//     const addIce = (iceC)=>{
//         //emit a new icecandidate to the signalaing server
//         const socket = socketConnection(searchParams.get('token'));
//         socket.emit('iceToServer',{
//             iceC,
//             who: 'client',
//             uuid: uuidRef.current, //we used a useRef to keep the value fresh
//         })

//     }

//     return(
//         <div className="main-video-page">
//             <div className="video-chat-wrapper">
//                 {/* Div to hold our remote video, our local video, and our chat window*/}
//                 <video id="large-feed" ref={largeFeedEl} autoPlay controls playsInline></video>
//                 <video id="own-feed" ref={smallFeedEl} autoPlay controls playsInline></video>
//                 {showCallInfo ? <CallInfo apptInfo={apptInfo} /> : <></>}
//                 <ChatWindow />
//             </div>
//             <ActionButtons 
//                 smallFeedEl={smallFeedEl} 
//                 largeFeedEl={largeFeedEl}              
//             />
//         </div>
//     )
// }

// export default MainVideoPage
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import axios from 'axios';
import './VideoComponents.css';
import CallInfo from "./CallInfo";
import ChatWindow from "./ChatWindow";
import ActionButtons from "./ActionButtons";
import addStream from '../redux/actions/addStream';
import { useDispatch, useSelector } from "react-redux";
import createPeerConnection from "../webRTCutilities/createPeerConnection";
import socketConnection from '../webRTCutilities/socketConnection'; // Updated import to use socketConnection function
import updateCallStatus from "../redux/actions/updateCallStatus";
import clientSocketListeners from "../webRTCutilities/clientSocketListeners";

const MainVideoPage = () => {

    const dispatch = useDispatch();
    const callStatus = useSelector(state => state.callStatus);
    const streams = useSelector(state => state.streams);
    const [searchParams] = useSearchParams();
    const [apptInfo, setApptInfo] = useState({});
    const smallFeedEl = useRef(null);
    const largeFeedEl = useRef(null);
    const uuidRef = useRef(null);
    const streamsRef = useRef(null);
    const [showCallInfo, setShowCallInfo] = useState(true);

    useEffect(() => {
        // Dynamically load Bootstrap CSS
        const bootstrapLink = document.createElement('link');
        bootstrapLink.rel = 'stylesheet';
        bootstrapLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
        bootstrapLink.integrity = 'sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM';
        bootstrapLink.crossOrigin = 'anonymous';
    
        document.head.appendChild(bootstrapLink);
    
        return () => {
            // Remove Bootstrap CSS on component unmount
            document.head.removeChild(bootstrapLink);
        };
    }, []);
    
    useEffect(() => {
        // Dynamically load Font Awesome CSS
        const fontAwesomeLink = document.createElement('link');
        fontAwesomeLink.rel = 'stylesheet';
        fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        fontAwesomeLink.integrity = 'sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==';
        fontAwesomeLink.crossOrigin = 'anonymous';
    
        document.head.appendChild(fontAwesomeLink);
    
        return () => {
            // Remove Font Awesome CSS on component unmount
            document.head.removeChild(fontAwesomeLink);
        };
    }, []);

    useEffect(() => {
        const fetchMedia = async () => {
            const constraints = {
                video: true,
                audio: true,
            };
            try {
                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                dispatch(updateCallStatus('haveMedia', true));
                dispatch(addStream('localStream', stream));
                const { peerConnection, remoteStream } = await createPeerConnection(addIce);
                dispatch(addStream('remote1', remoteStream, peerConnection));
                if (largeFeedEl.current) {
                    largeFeedEl.current.srcObject = remoteStream;
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchMedia();
    }, [dispatch]);

    useEffect(() => {
        if (streams.remote1) {
            streamsRef.current = streams;
        }
    }, [streams]);

    useEffect(() => {
        const createOfferAsync = async () => {
            for (const s in streams) {
                if (s !== "localStream") {
                    try {
                        const pc = streams[s].peerConnection;
                        const offer = await pc.createOffer();
                        pc.setLocalDescription(offer);
                        const token = searchParams.get('token');
                        const socket = socketConnection(token); // Using socketConnection function with token
                        socket.emit('newOffer', { offer, apptInfo });
                    } catch (err) {
                        console.log(err);
                    }
                }
            }
            dispatch(updateCallStatus('haveCreatedOffer', true));
        }
        if (callStatus.audio === "enabled" && callStatus.video === "enabled" && !callStatus.haveCreatedOffer) {
            createOfferAsync();
        }
    }, [callStatus, dispatch, searchParams, apptInfo, streams]);

    useEffect(() => {
        const asyncAddAnswer = async () => {
            for (const s in streams) {
                if (s !== "localStream") {
                    const pc = streams[s].peerConnection;
                    await pc.setRemoteDescription(callStatus.answer);
                    console.log(pc.signalingState);
                    console.log("Answer added!");
                }
            }
        }
        if (callStatus.answer) {
            asyncAddAnswer();
        }
    }, [callStatus.answer, streams]);

    useEffect(() => {
        const token = searchParams.get('token');
        console.log(token);
        const fetchDecodedToken = async () => {
            const resp = await axios.post('http://localhost:3000/api/user/validate-link', { token:token }, { withCredentials: true });

            console.log(resp.data);
            setApptInfo(resp.data);
            uuidRef.current = resp.data.uuid;
        }
        fetchDecodedToken();
    }, [searchParams]);

    useEffect(() => {
        const token = searchParams.get('token');
        const socket = socketConnection(token); // Using socketConnection function with token
        clientSocketListeners(socket, dispatch, addIceCandidateToPc);
    }, [dispatch, searchParams]);

    const addIceCandidateToPc = (iceC) => {
        for (const s in streamsRef.current) {
            if (s !== 'localStream') {
                const pc = streamsRef.current[s].peerConnection;
                pc.addIceCandidate(iceC);
                console.log("Added an iceCandidate to existing page presence");
                setShowCallInfo(false);
            }
        }
    }

    const addIce = (iceC) => {
        const token = searchParams.get('token');
        const socket = socketConnection(token); // Using socketConnection function with token
        socket.emit('iceToServer', {
            iceC,
            who: 'client',
            uuid: uuidRef.current,
        });
    }

    return (
        <div className="main-video-page">
            <div className="video-chat-wrapper">
                <video id="large-feed" ref={largeFeedEl} autoPlay controls playsInline></video>
                <video id="own-feed" ref={smallFeedEl} autoPlay controls playsInline></video>
                {showCallInfo ? <CallInfo apptInfo={apptInfo} /> : <></>}
                <ChatWindow />
            </div>
            <ActionButtons
                smallFeedEl={smallFeedEl}
                largeFeedEl={largeFeedEl}
            />
        </div>
    );
}

export default MainVideoPage;

