import { Server } from 'http';
import app from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let server: Server;
const port = process.env.PORT;

function main() {
    try {
        mongoose.connect(`${process.env.DATABASE_URL}`);
        
        console.log('Server connected to mongoose database');
        
        server = app.listen(port, () => {
        console.log(`Library management system express server running on port ${port}`)
        })
    } catch (error) {
        console.log(error);
    }
}

main()

