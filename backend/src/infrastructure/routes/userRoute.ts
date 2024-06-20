
// import express,{NextFunction,Request,Response} from 'express'
// import { userAdapter } from './injection/userInjection'
// import { Req } from '../types/expressTypes'


// const router = express.Router()


// router.post('/signup',(req:Request,res:Response,next:NextFunction)=>{
//     console.log('entered into route')
//     userAdapter.createUser(req,res,next)
// })
// router.post('/login',(req:Request,res:Response,next:NextFunction)=>{
    
//     userAdapter.loginUser(req,res,next)

// })  

// router.post('/sendEmail',(req:Request,res:Response,next:NextFunction)=>{

//     userAdapter.sendEmail(req,res,next)
// })

// router.post('/verifyEmail',(req:Request,res:Response,next:NextFunction)=>{
//     userAdapter.emailVerification(req,res,next)
    
// })
// router.post('/googleAuth',(req:Request,res:Response,next:NextFunction)=>{
//     userAdapter.googleAuth(req,res,next)

// })
// router.post('/logout',(req:Request,res:Response,next:NextFunction)=>{
//     console.log('entered g roteue')
 
//     userAdapter.logout(req,res,next)
 
// })
// router.post('/forgot-password',(req:Request,res:Response,next:NextFunction)=>{
//     userAdapter.forgotPassword(req,res,next)
// })

// router.post('/send-Forget-Pass-Otp',(req:Request,res:Response,next:NextFunction)=>{
//     userAdapter.sendforgetPassOtp(req,res,next)
// })

// router.post('/payment',(req:Request,res:Response,next:NextFunction)=>{
//     userAdapter.payment(req,res,next)
// })


// router.post('/webhook',(req:Request,res:Response,next:NextFunction)=>{
//     userAdapter.webhook(req,res,next)
// })



// import jwt from 'jsonwebtoken';
// import { v4 as uuidv4 } from 'uuid';

// const linkSecret = 'afasfasf';

// // Define the professionalAppointments array
// const professionalAppointments = [{
//     professionalsFullName: "Peter Chan, J.D.",
//     apptDate: Date.now() + 500000,
//     uuid: 1,
//     clientName: "Jim Jones",
// }, {
//     professionalsFullName: "Peter Chan, J.D.",
//     apptDate: Date.now() - 2000000,
//     uuid: 2,
//     clientName: "Akash Patel",
// }, {
//     professionalsFullName: "Peter Chan, J.D.",
//     apptDate: Date.now() + 10000000,
//     uuid: 3,
//     clientName: "Mike Williams",
// }];
// router.get('/user-link', (req, res) => { 
//     const apptData = professionalAppointments[0];
//     professionalAppointments.push(apptData);

//     const token = jwt.sign(apptData, linkSecret);
//     res.send('https://localhost:5173/join-video?token=' + token);
// });

// router.post('/validate-link', (req, res) => {
//     const token = req.body.token;
//     const decodedData = jwt.verify(token, linkSecret);
    
//     res.json(decodedData);
// });

// router.get('/pro-link', (req, res) => {
//     const userData = {
//         fullName: "Peter Chan, J.D.",
//         proId: 1234,
//     };
//     const token = jwt.sign(userData, linkSecret);
//     res.send(`<a href="https://localhost:5173/dashboard?token=${token}" target="_blank">Link Here</a>`);
// });



// export default router

import express, { NextFunction, Request, Response } from 'express';
import { userAdapter } from './injection/userInjection';
import jwt from 'jsonwebtoken';

const router = express.Router();
const linkSecret = 'linksecretttt';

router.post('/signup', (req: Request, res: Response, next: NextFunction) => {
    userAdapter.createUser(req, res, next);
});

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
    userAdapter.loginUser(req, res, next);
});

router.post('/sendEmail', (req: Request, res: Response, next: NextFunction) => {
    userAdapter.sendEmail(req, res, next);
});

router.post('/verifyEmail', (req: Request, res: Response, next: NextFunction) => {
    userAdapter.emailVerification(req, res, next);
});

router.post('/googleAuth', (req: Request, res: Response, next: NextFunction) => {
    userAdapter.googleAuth(req, res, next);
});

router.post('/logout', (req: Request, res: Response, next: NextFunction) => {
    userAdapter.logout(req, res, next);
});

router.post('/forgot-password', (req: Request, res: Response, next: NextFunction) => {
    console.log('route calld')
    userAdapter.forgotPassword(req, res, next);
});

router.post('/send-Forget-Pass-Otp', (req: Request, res: Response, next: NextFunction) => {
    userAdapter.sendforgetPassOtp(req, res, next);
});

router.post('/payment', (req: Request, res: Response, next: NextFunction) => {
    console.log('payment route called')
    userAdapter.payment(req, res, next);
});

router.post('/webhook', (req: Request, res: Response, next: NextFunction) => {
    console.log('webhook callllllllllllllllllllld')
    userAdapter.webhook(req, res, next);
});

const professionalAppointments = [{
    professionalsFullName: "Peter Chan, J.D.",
    apptDate: Date.now() + 500000,
    uuid: 1,
    clientName: "Jim Jones",
}, {
    professionalsFullName: "Peter Chan, J.D.",
    apptDate: Date.now() - 2000000,
    uuid: 2,
    clientName: "Akash Patel",
}, {
    professionalsFullName: "Peter Chan, J.D.",
    apptDate: Date.now() + 10000000,
    uuid: 3,
    clientName: "Mike Williams",
}];

router.get('/user-link', (req, res) => {
    console.log('entered the userlink')
    const apptData = professionalAppointments[0];
    professionalAppointments.push(apptData);

    const token = jwt.sign(apptData, linkSecret);
    res.send('http://localhost:5173/join-video?token=' + token);
});

router.post('/validate-link', (req, res) => {
    console.log('entererd validdddate')
    const token = req.body.token;
    const decodedData = jwt.verify(token, linkSecret);

    res.json(decodedData);
});

router.get('/pro-link', (req, res) => {
    const userData = {
        fullName: "Peter Chan, J.D.",
        proId: 1234,
    };
    const token = jwt.sign(userData, linkSecret);
    res.send(`<a href="http://localhost:5173/dashboard?token=${token}" target="_blank">Link Here</a>`);
});


import multer from 'multer';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import { Recording } from '../database/model/recordingModel';

dotenv.config();


const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), async (req: Request, res: Response) => {
  console.log('entered upld')
  const file = req.file;
  const userId = req.body.userId; // assuming userId is passed in the body

  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  const fileKey = `${uuidv4()}.webm`;

  const uploadParams = {
    Bucket: process.env.BUCKET_NAME!,
    Key: fileKey,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    await s3Client.send(new PutObjectCommand(uploadParams));
    const fileUrl = `https://${process.env.BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;

    // Save file URL to MongoDB
    const recording = new Recording({
      userId: userId,
      url: fileUrl,
    });
    await recording.save();

    res.status(200).send({ url: fileUrl });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error uploading file.');
  }
});




export default router;
    