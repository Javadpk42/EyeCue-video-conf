// import React, { useCallback, useState ,useEffect} from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useSocket } from '../../context/socketProvider'
// import { data } from '@/components/Chart'

// function Lobby() {
//     const navigate=useNavigate()
//     const [email,setEmail]=useState('')
//     const [room,setRoom]=useState('')
//     const socket=useSocket()
//     console.log(socket)
//     const handleSubmitForm=useCallback((e)=>{
//         e.preventDefault();
//         socket.emit("room:join",{email,room})
//     },[email,room,socket])

//     const handleJoinRoom=useCallback((data)=>{
//         const {email,room}=data
//         navigate(`/user/room/${room}`)
//     },[])

//     useEffect(()=>{
//     socket.on("room:join",handleJoinRoom)
//     return ()=>{
//         socket.off("room:join", handleJoinRoom)
//     }
//     },[socket])

//   return (
//     <div>
//       <h1>lobby</h1> 
//       <form action="" onSubmit={handleSubmitForm}>
//         <label htmlFor="email">Email ID</label>
//         <input className='border border-spacing-1' type="email" id='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
//         <br />
//         <label htmlFor="room">room</label>
//         <input className='border border-spacing-1' type="text" id='room' value={room} onChange={(e)=>setRoom(e.target.value)}/>
//         <br />
//         <button className='bg-gray-300'>join</button>
//       </form>
//     </div>
//   )
// }

// export default Lobby


import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../context/socketProvider';

function Lobby() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [room, setRoom] = useState('');
    const socket = useSocket();

    const handleSubmitForm = useCallback((e) => {
        e.preventDefault();
        socket.emit("room:join", { email, room });
    }, [email, room, socket]);

    const handleJoinRoom = useCallback((data) => {
        const { email, room } = data;
        navigate(`/user/room/${room}`);
    }, [navigate]);

    useEffect(() => {
        socket.on("room:join", handleJoinRoom);
        return () => {
            socket.off("room:join", handleJoinRoom);
        };
    }, [socket, handleJoinRoom]);

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6">Join a Room</h1>
                <form onSubmit={handleSubmitForm} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email ID</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="room" className="block text-sm font-medium text-gray-700">Room</label>
                        <input
                            type="text"
                            id="room"
                            value={room}
                            onChange={(e) => setRoom(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700">
                        Join
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Lobby;
