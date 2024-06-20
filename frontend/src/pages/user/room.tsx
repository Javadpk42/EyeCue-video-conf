// import React,{useEffect,useCallback,useState,useRef} from 'react'
// import peer from '../../service/peers'
// import { useSocket } from '@/context/socketProvider'

// function Room() { 
//     const socket =useSocket()
//     const [remoteSocketId,setRemoteSocketId]=useState()
//     const [myStream, setMyStream]=useState()
//     const [remoteStream, setRemoteStream]=useState()
//     const videoRef = useRef(null);
//     const remoteVideoRef = useRef(null);
//     const handleUserJoined =useCallback(({email,id})=>{
//         console.log(`email ${email} joined room`)
//         setRemoteSocketId(id)
//     },[])
//     const handleCallUser=useCallback(async()=>{
//         const stream=await navigator.mediaDevices.getUserMedia({audio:true,video:true})
//         const offer=await peer.getOffer()
//         socket.emit("user:call",{to:remoteSocketId,offer})
//         setMyStream(stream)
//     },[remoteSocketId,socket])
//     const handleIncomingCall=useCallback(async({from,offer})=>{
//         setRemoteSocketId(from)
//         const stream=await navigator.mediaDevices.getUserMedia({audio:true,video:true})
//         setMyStream(stream)
//         console.log(`incoming call`,from,offer)
//         const ans=await peer.getAnswer(offer)
//         socket.emit('call:accepted',{to:from,ans})
//     },[socket])
//     const sendStreams=useCallback(()=>{
//       if (myStream) {
//         for (const track of myStream.getTracks()) {
//           peer.peer.addTrack(track, myStream);
//         }
//       }
//     },[myStream])
//     const handleCallAccepted=useCallback(({from,ans})=>{
//       peer.setLocalDescription(ans)
//       console.log('call accepted')
//       sendStreams()
      
//     },[sendStreams])
//     const handleNegoNeeded=useCallback(async()=>{
//       const offer =await peer.getOffer()
//       socket.emit("peer:nego:needed",{offer,to:remoteSocketId})
//     },[remoteSocketId,socket])
//     const handleNegoNeedIncoming=useCallback(async({from,offer})=>{
//       const ans =await peer.getAnswer(offer)
//       socket.emit("peer:nego:done",{to:from,ans})
//     },[socket])
//     const handleNegoNeedFinal=useCallback(async({ans})=>{
//       await peer.setLocalDescription(ans)
//     },[])
//     useEffect(()=>{
//       peer.peer.addEventListener("negotiationneeded",handleNegoNeeded)
//       return ()=>{
//         peer.peer.removeEventListener("negotiationneeded",handleNegoNeeded)
//       }
//     },[handleNegoNeeded])
//     useEffect(()=>{
//       peer.peer.addEventListener('track',async ev=>{
//         const remoteStream=ev.streams
//         console.log('got tracks')
//         setRemoteStream(remoteStream[0])
//       })
//     },[])
//     useEffect(()=>{
//         socket.on('user:joined',handleUserJoined)
//         socket.on('incoming:call',handleIncomingCall)
//         socket.on('call:accepted',handleCallAccepted)
//         socket.on('peer:nego:needed',handleNegoNeedIncoming)
//         socket.on('peer:nego:final',handleNegoNeedFinal)



//         return ()=>{
//             socket.off('user:joined',handleUserJoined)
//             socket.off('incoming:call',handleIncomingCall)
//             socket.off('call:accepted',handleCallAccepted)
//             socket.off('peer:nego:needed',handleNegoNeedIncoming)
//             socket.off('peer:nego:final',handleNegoNeedFinal)

//         }
//     },[socket, handleUserJoined, handleIncomingCall, handleCallAccepted, handleNegoNeedIncoming, handleNegoNeedFinal])
//     useEffect(() => {
//         if (videoRef.current && myStream) {
//           videoRef.current.srcObject = myStream;
//         }
//       }, [myStream]);
//       useEffect(() => {
//         if (remoteVideoRef.current && remoteStream) {
//           remoteVideoRef.current.srcObject = remoteStream;
//         }
//       }, [remoteStream]);
//   return (
//     <div>
//       <h1>Room</h1>
//       <h2>{remoteSocketId?'connected':'not connected'} </h2>
//       {myStream&&<button onClick={sendStreams}>send stream</button>}
//       {remoteSocketId&&<button onClick={handleCallUser}>call</button>}
//       {myStream&&<video ref={videoRef} muted autoPlay playsInline height='300px' width='500px'/>}
//       {remoteStream&&<><h1>remote</h1><video ref={remoteVideoRef} muted autoPlay playsInline height='300px' width='500px'/></>}
//     </div>
//   )
// }

// export default Room 


// import React, { useEffect, useCallback, useState, useRef } from 'react';
// import peer from '../../service/peers';
// import { useSocket } from '@/context/socketProvider';

// function Room() { 
//     const socket = useSocket();
//     const [remoteSocketId, setRemoteSocketId] = useState();
//     const [myStream, setMyStream] = useState();
//     const [remoteStream, setRemoteStream] = useState();
//     const videoRef = useRef(null);
//     const remoteVideoRef = useRef(null);

//     const handleUserJoined = useCallback(({ email, id }) => {
//         console.log(`email ${email} joined room`);
//         setRemoteSocketId(id);
//     }, []);

//     const handleCallUser = useCallback(async () => {
//         const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
//         const offer = await peer.getOffer();
//         socket.emit("user:call", { to: remoteSocketId, offer });
//         setMyStream(stream);
//     }, [remoteSocketId, socket]);

//     const handleIncomingCall = useCallback(async ({ from, offer }) => {
//         setRemoteSocketId(from);
//         const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
//         setMyStream(stream);
//         console.log(`incoming call`, from, offer);
//         const ans = await peer.getAnswer(offer);
//         socket.emit('call:accepted', { to: from, ans });
//     }, [socket]);

//     const sendStreams = useCallback(() => {
//         if (myStream) {
//             for (const track of myStream.getTracks()) {
//                 peer.peer.addTrack(track, myStream);
//             }
//         }
//     }, [myStream]);

//     const handleCallAccepted = useCallback(({ from, ans }) => {
//         peer.setLocalDescription(ans);
//         console.log('call accepted');
//         sendStreams();
//     }, [sendStreams]);

//     const handleNegoNeeded = useCallback(async () => {
//         const offer = await peer.getOffer();
//         socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
//     }, [remoteSocketId, socket]);

//     const handleNegoNeedIncoming = useCallback(async ({ from, offer }) => {
//         const ans = await peer.getAnswer(offer);
//         socket.emit("peer:nego:done", { to: from, ans });
//     }, [socket]);

//     const handleNegoNeedFinal = useCallback(async ({ ans }) => {
//         await peer.setLocalDescription(ans);
//     }, []);

//     useEffect(() => {
//         peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
//         return () => {
//             peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
//         };
//     }, [handleNegoNeeded]);

//     useEffect(() => {
//         peer.peer.addEventListener('track', async (ev) => {
//             const [stream] = ev.streams;
//             setRemoteStream(stream);
//         });
//     }, []);

//     useEffect(() => {
//         socket.on('user:joined', handleUserJoined);
//         socket.on('incoming:call', handleIncomingCall);
//         socket.on('call:accepted', handleCallAccepted);
//         socket.on('peer:nego:needed', handleNegoNeedIncoming);
//         socket.on('peer:nego:final', handleNegoNeedFinal);

//         return () => {
//             socket.off('user:joined', handleUserJoined);
//             socket.off('incoming:call', handleIncomingCall);
//             socket.off('call:accepted', handleCallAccepted);
//             socket.off('peer:nego:needed', handleNegoNeedIncoming);
//             socket.off('peer:nego:final', handleNegoNeedFinal);
//         };
//     }, [socket, handleUserJoined, handleIncomingCall, handleCallAccepted, handleNegoNeedIncoming, handleNegoNeedFinal]);

//     useEffect(() => {
//         if (videoRef.current && myStream) {
//             videoRef.current.srcObject = myStream;
//         }
//     }, [myStream]);

//     useEffect(() => {
//         if (remoteVideoRef.current && remoteStream) {
//             remoteVideoRef.current.srcObject = remoteStream;
//         }
//     }, [remoteStream]);

//     return (
//         <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//             <div className="bg-white p-4 rounded shadow-md w-full max-w-4xl flex flex-col items-center">
//                 <h1 className="text-2xl font-bold mb-4">Room</h1>
//                 <h2 className="text-lg mb-6">{remoteSocketId ? 'Peer Connected' : 'waiting to connect peer...'}</h2>
//                 <div className="flex space-x-4 mb-6">
//                     {myStream && <button onClick={sendStreams} className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700">Send Stream</button>}
//                     {remoteSocketId && <button onClick={handleCallUser} className="py-2 px-4 bg-green-600 text-white font-semibold rounded-md shadow hover:bg-green-700">Call</button>}
//                 </div>
//                 <div className="flex space-x-4">
//                     {myStream && (
//                         <div className="flex flex-col items-center">
//                             <h3 className="text-lg font-bold mb-2">My Stream</h3>
//                             <video ref={videoRef} muted autoPlay playsInline className="border border-gray-300 rounded-md" height='300px' width='500px' />
//                         </div>
//                     )}
//                     {remoteStream && (
//                         <div className="flex flex-col items-center">
//                             <h3 className="text-lg font-bold mb-2">Remote Stream</h3>
//                             <video ref={remoteVideoRef} autoPlay playsInline className="border border-gray-300 rounded-md" height='300px' width='500px' />
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Room;



// import React, { useEffect, useCallback, useState, useRef } from 'react';
// import axios from 'axios';
// import peer from '../../service/peers';
// import { useSocket } from '@/context/socketProvider';

// function Room() { 
//     const socket = useSocket();
//     const [remoteSocketId, setRemoteSocketId] = useState();
//     const [myStream, setMyStream] = useState();
//     const [remoteStream, setRemoteStream] = useState();
//     const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
//     const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
//     const videoRef = useRef<HTMLVideoElement>(null);
//     const remoteVideoRef = useRef<HTMLVideoElement>(null);

//     const handleUserJoined = useCallback(({ email, id }) => {
//         console.log(`email ${email} joined room`);
//         setRemoteSocketId(id);
//     }, []);

//     const handleCallUser = useCallback(async () => {
//         const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
//         const offer = await peer.getOffer();
//         socket.emit("user:call", { to: remoteSocketId, offer });
//         setMyStream(stream);

//         const recorder = new MediaRecorder(stream);
//         recorder.ondataavailable = event => {
//             if (event.data.size > 0) {
//                 setRecordedChunks(prev => [...prev, event.data]);
//             }
//         };
//         setMediaRecorder(recorder);
//     }, [remoteSocketId, socket]);

//     const handleIncomingCall = useCallback(async ({ from, offer }) => {
//         setRemoteSocketId(from);
//         const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
//         setMyStream(stream);
//         console.log(`incoming call`, from, offer);
//         const ans = await peer.getAnswer(offer);
//         socket.emit('call:accepted', { to: from, ans });

//         const recorder = new MediaRecorder(stream);
//         recorder.ondataavailable = event => {
//             if (event.data.size > 0) {
//                 setRecordedChunks(prev => [...prev, event.data]);
//             }
//         };
//         setMediaRecorder(recorder);
//     }, [socket]);

//     const sendStreams = useCallback(() => {
//         if (myStream) {
//             for (const track of myStream.getTracks()) {
//                 peer.peer.addTrack(track, myStream);
//             }
//         }
//     }, [myStream]);

//     const handleCallAccepted = useCallback(({ from, ans }) => {
//         peer.setLocalDescription(ans);
//         console.log('call accepted');
//         sendStreams();
//     }, [sendStreams]);

//     const handleNegoNeeded = useCallback(async () => {
//         const offer = await peer.getOffer();
//         socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
//     }, [remoteSocketId, socket]);

//     const handleNegoNeedIncoming = useCallback(async ({ from, offer }) => {
//         const ans = await peer.getAnswer(offer);
//         socket.emit("peer:nego:done", { to: from, ans });
//     }, [socket]);

//     const handleNegoNeedFinal = useCallback(async ({ ans }) => {
//         await peer.setLocalDescription(ans);
//     }, []);

//     const startRecording = () => {
//         if (mediaRecorder) {
//             mediaRecorder.start();
//             console.log('Recording started');
//         }
//     };

//     const stopRecording = () => {
//         if (mediaRecorder) {
//             mediaRecorder.stop();
//             console.log('Recording stopped');
//         }
//     };

//     const saveRecording = async () => {
//         const blob = new Blob(recordedChunks, { type: 'video/webm' });
//         const formData = new FormData();
//         formData.append('file', blob, 'recording.webm');

//         try {
//             const response = await axios.post('http://localhost:3000/api/user/upload', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });
//             console.log('Upload success:', response.data);
//         } catch (error) {
//             console.error('Upload error:', error);
//         }
//     };

//     useEffect(() => {
//         peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
//         return () => {
//             peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
//         };
//     }, [handleNegoNeeded]);

//     useEffect(() => {
//         peer.peer.addEventListener('track', async (ev) => {
//             const [stream] = ev.streams;
//             setRemoteStream(stream);
//         });
//     }, []);

//     useEffect(() => {
//         socket.on('user:joined', handleUserJoined);
//         socket.on('incoming:call', handleIncomingCall);
//         socket.on('call:accepted', handleCallAccepted);
//         socket.on('peer:nego:needed', handleNegoNeedIncoming);
//         socket.on('peer:nego:final', handleNegoNeedFinal);

//         return () => {
//             socket.off('user:joined', handleUserJoined);
//             socket.off('incoming:call', handleIncomingCall);
//             socket.off('call:accepted', handleCallAccepted);
//             socket.off('peer:nego:needed', handleNegoNeedIncoming);
//             socket.off('peer:nego:final', handleNegoNeedFinal);
//         };
//     }, [socket, handleUserJoined, handleIncomingCall, handleCallAccepted, handleNegoNeedIncoming, handleNegoNeedFinal]);

//     useEffect(() => {
//         if (videoRef.current && myStream) {
//             videoRef.current.srcObject = myStream;
//         }
//     }, [myStream]);

//     useEffect(() => {
//         if (remoteVideoRef.current && remoteStream) {
//             remoteVideoRef.current.srcObject = remoteStream;
//         }
//     }, [remoteStream]);

//     return (
//         <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//             <div className="bg-white p-4 rounded shadow-md w-full max-w-4xl flex flex-col items-center">
//                 <h1 className="text-2xl font-bold mb-4">Room</h1>
//                 <h2 className="text-lg mb-6">{remoteSocketId ? 'Peer Connected' : 'waiting to connect peer...'}</h2>
//                 <div className="flex space-x-4 mb-6">
//                     {myStream && <button onClick={sendStreams} className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700">Send Stream</button>}
//                     {remoteSocketId && <button onClick={handleCallUser} className="py-2 px-4 bg-green-600 text-white font-semibold rounded-md shadow hover:bg-green-700">Call</button>}
//                     {myStream && <button onClick={startRecording} className="py-2 px-4 bg-yellow-600 text-white font-semibold rounded-md shadow hover:bg-yellow-700">Start Recording</button>}
//                     {myStream && <button onClick={stopRecording} className="py-2 px-4 bg-red-600 text-white font-semibold rounded-md shadow hover:bg-red-700">Stop Recording</button>}
//                     {recordedChunks.length > 0 && <button onClick={saveRecording} className="py-2 px-4 bg-purple-600 text-white font-semibold rounded-md shadow hover:bg-purple-700">Save Recording</button>}
//                 </div>
//                 <div className="flex space-x-4">
//                     {myStream && (
//                         <div className="flex flex-col items-center">
//                             <h3 className="text-lg font-bold mb-2">My Stream</h3>
//                             <video ref={videoRef} muted autoPlay playsInline className="border border-gray-300 rounded-md" height='300px' width='500px' />
//                         </div>
//                     )}
//                     {remoteStream && (
//                         <div className="flex flex-col items-center">
//                             <h3 className="text-lg font-bold mb-2">Remote Stream</h3>
//                             <video ref={remoteVideoRef} autoPlay playsInline className="border border-gray-300 rounded-md" height='300px' width='500px' />
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Room;

import React, { useEffect, useCallback, useState, useRef } from 'react';
import axios from 'axios';
import peer from '../../service/peers';
import { useSocket } from '@/context/socketProvider';
import { useSelector } from "react-redux";


function Room() { 
    const user  = useSelector((state) => state.user.currentUser.data._id);
    const socket = useSocket();
    const [remoteSocketId, setRemoteSocketId] = useState();
    const [myStream, setMyStream] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
    const videoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const combinedStreamRef = useRef<MediaStream | null>(null);

    const handleUserJoined = useCallback(({ email, id }) => {
        console.log(`email ${email} joined room`);
        setRemoteSocketId(id);
    }, []);

    const handleCallUser = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        const offer = await peer.getOffer();
        socket.emit("user:call", { to: remoteSocketId, offer });
        setMyStream(stream);
    }, [remoteSocketId, socket]);

    const handleIncomingCall = useCallback(async ({ from, offer }) => {
        setRemoteSocketId(from);
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        setMyStream(stream);
        console.log(`incoming call`, from, offer);
        const ans = await peer.getAnswer(offer);
        socket.emit('call:accepted', { to: from, ans });
    }, [socket]);

    const sendStreams = useCallback(() => {
        if (myStream) {
            for (const track of myStream.getTracks()) {
                peer.peer.addTrack(track, myStream);
            }
        }
    }, [myStream]);

    const handleCallAccepted = useCallback(({ from, ans }) => {
        peer.setLocalDescription(ans);
        console.log('call accepted');
        sendStreams();
    }, [sendStreams]);

    const handleNegoNeeded = useCallback(async () => {
        const offer = await peer.getOffer();
        socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
    }, [remoteSocketId, socket]);

    const handleNegoNeedIncoming = useCallback(async ({ from, offer }) => {
        const ans = await peer.getAnswer(offer);
        socket.emit("peer:nego:done", { to: from, ans });
    }, [socket]);

    const handleNegoNeedFinal = useCallback(async ({ ans }) => {
        await peer.setLocalDescription(ans);
    }, []);

    const startRecording = () => {
        if (myStream && remoteStream && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            const combinedStream = canvas.captureStream();
            const audioContext = new AudioContext();
            const audioDestination = audioContext.createMediaStreamDestination();

            // Combine audio tracks
            const myAudioSource = audioContext.createMediaStreamSource(myStream);
            const remoteAudioSource = audioContext.createMediaStreamSource(remoteStream);
            myAudioSource.connect(audioDestination);
            remoteAudioSource.connect(audioDestination);

            combinedStream.addTrack(audioDestination.stream.getAudioTracks()[0]);

            combinedStreamRef.current = combinedStream;

            const recorder = new MediaRecorder(combinedStream);
            recorder.ondataavailable = event => {
                if (event.data.size > 0) {
                    setRecordedChunks(prev => [...prev, event.data]);
                }
            };
            setMediaRecorder(recorder);

            const draw = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(videoRef.current!, 0, 0, canvas.width / 2, canvas.height);
                ctx.drawImage(remoteVideoRef.current!, canvas.width / 2, 0, canvas.width / 2, canvas.height);
                requestAnimationFrame(draw);
            };
            draw();

            recorder.start();
            console.log('Recording started');
        }
    };

    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            console.log('Recording stopped');
        }
    };

    const saveRecording = async () => {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const formData = new FormData();
        formData.append('file', blob, 'recording.webm');
        formData.append('userId', user);

        try {
            const response = await axios.post('http://localhost:3000/api/user/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Upload success:', response.data);
        } catch (error) {
            console.error('Upload error:', error);
        }
    };

    useEffect(() => {
        peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
        return () => {
            peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
        };
    }, [handleNegoNeeded]);

    useEffect(() => {
        peer.peer.addEventListener('track', async (ev) => {
            const [stream] = ev.streams;
            setRemoteStream(stream);
        });
    }, []);

    useEffect(() => {
        socket.on('user:joined', handleUserJoined);
        socket.on('incoming:call', handleIncomingCall);
        socket.on('call:accepted', handleCallAccepted);
        socket.on('peer:nego:needed', handleNegoNeedIncoming);
        socket.on('peer:nego:final', handleNegoNeedFinal);

        return () => {
            socket.off('user:joined', handleUserJoined);
            socket.off('incoming:call', handleIncomingCall);
            socket.off('call:accepted', handleCallAccepted);
            socket.off('peer:nego:needed', handleNegoNeedIncoming);
            socket.off('peer:nego:final', handleNegoNeedFinal);
        };
    }, [socket, handleUserJoined, handleIncomingCall, handleCallAccepted, handleNegoNeedIncoming, handleNegoNeedFinal]);

    useEffect(() => {
        if (videoRef.current && myStream) {
            videoRef.current.srcObject = myStream;
        }
    }, [myStream]);

    useEffect(() => {
        if (remoteVideoRef.current && remoteStream) {
            remoteVideoRef.current.srcObject = remoteStream;
        }
    }, [remoteStream]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-4 rounded shadow-md w-full max-w-4xl flex flex-col items-center">
                <h1 className="text-2xl font-bold mb-4">Room</h1>
                <h2 className="text-lg mb-6">{remoteSocketId ? 'Peer Connected' : 'waiting to connect peer...'}</h2>
                <div className="flex space-x-4 mb-6">
                    {myStream && <button onClick={sendStreams} className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700">Send Stream</button>}
                    {remoteSocketId && <button onClick={handleCallUser} className="py-2 px-4 bg-green-600 text-white font-semibold rounded-md shadow hover:bg-green-700">Call</button>}
                    {myStream && remoteStream && <button onClick={startRecording} className="py-2 px-4 bg-yellow-600 text-white font-semibold rounded-md shadow hover:bg-yellow-700">Start Recording</button>}
                    {mediaRecorder && mediaRecorder.state === 'recording' && <button onClick={stopRecording} className="py-2 px-4 bg-red-600 text-white font-semibold rounded-md shadow hover:bg-red-700">Stop Recording</button>}
                    {recordedChunks.length > 0 && <button onClick={saveRecording} className="py-2 px-4 bg-purple-600 text-white font-semibold rounded-md shadow hover:bg-purple-700">Save Recording</button>}
                </div>
                <div className="flex space-x-4">
                    {myStream && (
                        <div className="flex flex-col items-center">
                            <h3 className="text-lg font-bold mb-2">My Stream</h3>
                            <video ref={videoRef} muted autoPlay playsInline className="border border-gray-300 rounded-md" height='300px' width='500px' />
                        </div>
                    )}
                    {remoteStream && (
                        <div className="flex flex-col items-center">
                            <h3 className="text-lg font-bold mb-2">Remote Stream</h3>
                            <video ref={remoteVideoRef} autoPlay playsInline className="border border-gray-300 rounded-md" height='300px' width='500px' />
                        </div>
                    )}
                </div>
                <canvas ref={canvasRef} style={{ display: 'none' }} width={1000} height={600}></canvas>
            </div>
        </div>
    );
}

export default Room;

