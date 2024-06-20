
import http from 'http';
import { Server, Socket } from 'socket.io'; 
import { app } from "./infrastructure/config/app";
import dotenv from 'dotenv'; 
import connectDb from "./infrastructure/config/db";

dotenv.config(); 

const port = process.env.PORT || 8000;

const expressServer = http.createServer( app);

const io = new Server(expressServer, {
    cors: {
        origin: ['http://localhost:5173', 'https://localhost:3001', 'https://localhost:3002'],
        methods: ["GET", "POST"]
    } 
});

const emailToSocketIdMap=new Map()
const socketIdToEmailMap=new Map()


io.on('connection', (socket: Socket) => {
        console.log(`${socket.id} has connected`);
        socket.on("room:join",(data)=>{
            console.log(data)
            const {email,room}=data
            emailToSocketIdMap.set(email,socket.id)
            socketIdToEmailMap.set(socket.id,email)
            io.to(room).emit("user:joined", {email,id:socket.id})
            socket.join(room) 
            io.to(socket.id).emit("room:join", data)
        })
        socket.on('user:call',({to,offer})=>{
            io.to(to).emit('incoming:call',{from:socket.id,offer})
        })
        socket.on('call:accepted',({to,ans})=>{
            io.to(to).emit('call:accepted',{from:socket.id,ans})
        })
        socket.on('peer:nego:needed',({to,offer})=>{ 
            io.to(to).emit('peer:nego:needed',{from:socket.id,offer})
        })
        socket.on('peer:nego:done',({to,ans})=>{
            io.to(to).emit('peer:nego:final',{from:socket.id,ans})
        })

})

const start = () => {
    console.log('Starting server...');
    expressServer.listen(port, () => {
        connectDb();
        console.log(`Server is running on http://localhost:${port}`);
    }); 
}; 

start();
  



// io.on('connection', (socket: Socket) => {
    //     console.log(`${socket.id} has connected`); // Log when a new client connects
    
    //     const handshakeData = socket.handshake.auth.jwt;
    //     let decodedData: JwtPayload;
    //     try {
    //         decodedData = jwt.verify(handshakeData, linkSecret) as JwtPayload;
    //     } catch (err) {
    //         console.log(err);
    //         socket.disconnect();
    //         return;
    //     }
    
    //     const { fullName, proId } = decodedData;
    //     console.log(`User ${fullName} (${proId ? 'Professional' : 'Client'}) connected`); // Log user type
    
    //     if (proId) {
    //         // Handle professional connections
    //         console.log(`Professional ${fullName} (${proId}) connected`);
    //         const connectedPro = connectedProfessionals.find(cp => cp.proId === proId);
    //         if (connectedPro) {
    //             connectedPro.socketId = socket.id;
    //         } else {
    //             connectedProfessionals.push({ socketId: socket.id, fullName, proId });
    //         }
    //         const professionalAppointments = app.get('professionalAppointments');
    //         socket.emit('apptData', professionalAppointments.filter((pa: any) => pa.professionalsFullName === fullName));
    //         for (const key in allKnownOffers) {
    //             if (allKnownOffers[key].professionalsFullName === fullName) {
    //                 io.to(socket.id).emit('newOfferWaiting', allKnownOffers[key]);
    //             }
    //         }
    //     } else { 
    //         // Handle client connections
    //         console.log(`Client ${fullName} connected`);
    //         const { professionalsFullName, uuid, clientName } = decodedData;
    //         const clientExist = connectedClients.find(c => c.uuid == uuid);
    //         if (clientExist) {
    //             clientExist.socketId = socket.id;
    //         } else {
    //             connectedClients.push({ clientName, uuid, professionalMeetingWith: professionalsFullName, socketId: socket.id });
    //         }
    //         const offerForThisClient = allKnownOffers[uuid];
    //         if (offerForThisClient) {
    //             io.to(socket.id).emit('answerToClient', offerForThisClient.answer);
    //         }
    //     }
    
    //     socket.on('newAnswer', ({ answer, uuid }) => {
    //         console.log(`Received new answer from ${decodedData.proId ? 'client' : 'professional'} for UUID ${uuid}`);
    //         const socketToSendTo = decodedData.proId ? 
    //             connectedClients.find(c => c.uuid == uuid) :
    //             connectedProfessionals.find(cp => cp.fullName === decodedData.professionalsFullName);
    //         if (socketToSendTo) {
    //             socket.to(socketToSendTo.socketId).emit('answerToClient', answer);
    //         }
    //         const knownOffer = allKnownOffers[uuid];
    //         if (knownOffer) {
    //             knownOffer.answer = answer;
    //         }
    //     });
    
    //     socket.on('newOffer', ({ offer, apptInfo }) => {
    //         console.log(`Received new offer for appointment UUID ${apptInfo.uuid}`);
    //         allKnownOffers[apptInfo.uuid] = {
    //             ...apptInfo,
    //             offer,
    //             offererIceCandidates: [],
    //             answer: null,
    //             answerIceCandidates: [],
    //         };
    //         const professionalAppointments = app.get('professionalAppointments');
    //         const pa = professionalAppointments.find((pa: any) => pa.uuid === apptInfo.uuid);
    //         if (pa) {
    //             pa.waiting = true;
    //         }
    //         const p = connectedProfessionals.find(cp => cp.fullName === apptInfo.professionalsFullName);
    //         if (p) {
    //             socket.to(p.socketId).emit('newOfferWaiting', allKnownOffers[apptInfo.uuid]);
    //             socket.to(p.socketId).emit('apptData', professionalAppointments.filter((pa: any) => pa.professionalsFullName === apptInfo.professionalsFullName));
    //         }
    //     });
    
    //     socket.on('getIce', (uuid, who, ackFunc) => {
    //         console.log(`Received ICE request from ${who} for UUID ${uuid}`);
    //         const offer = allKnownOffers[uuid];
    //         let iceCandidates = [];
    //         if (offer) {
    //             if (who === "professional") {
    //                 iceCandidates = offer.offererIceCandidates;
    //             } else if (who === "client") {
    //                 iceCandidates = offer.answerIceCandidates;
    //             }
    //             ackFunc(iceCandidates);
    //         }
    //     });
    
    //     socket.on('iceToServer', ({ who, iceC, uuid }) => {
    //         console.log(`Received ICE from ${who === 'client' ? 'client' : 'professional'} for UUID ${uuid}`);
    //         const offerToUpdate = allKnownOffers[uuid];
    //         if (offerToUpdate) {
    //             if (who === "client") {
    //                 offerToUpdate.offererIceCandidates.push(iceC);
    //                 const socketToSendTo = connectedProfessionals.find(cp => cp.fullName === decodedData.professionalsFullName);
    //                 if (socketToSendTo) {
    //                     socket.to(socketToSendTo.socketId).emit('iceToClient', iceC);
    //                 }
    //             } else if (who === "professional") {
    //                 offerToUpdate.answerIceCandidates.push(iceC);
    //                 const socketToSendTo = connectedClients.find(cp => cp.uuid == uuid);
    //                 if (socketToSendTo) {
    //                     socket.to(socketToSendTo.socketId).emit('iceToClient', iceC);
    //                 }
    //             }
    //         }
    //     });
    // });