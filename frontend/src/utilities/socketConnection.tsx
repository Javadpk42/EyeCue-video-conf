import { io } from 'socket.io-client'; 
export const socket=io.connect('https://localhost:3000')