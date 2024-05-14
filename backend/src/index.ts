
import { app } from "./infrastructure/config/app"; 
import dotenv from 'dotenv';
import connectDb from "./infrastructure/config/db";

dotenv.config();

const port = process.env.PORT || 8000;

const start = () => {
    console.log('Starting server...');

    app.get('/', (req, res) => {
        res.send('Hello from Express!');
    });

    app.listen(port, () => {
        connectDb()
        console.log(`Server is running on http://localhost:${port}`);
    });
};

start();