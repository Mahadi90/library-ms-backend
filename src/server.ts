import { Server } from 'http';
import app from './app';
import mongoose from 'mongoose';

let server: Server;
const port = 5000;

function main() {
    try {
        mongoose.connect(`mongodb+srv://mahadimhs787:mongoosemaster@cluster0.wpfolqw.mongodb.net/library-management-system?retryWrites=true&w=majority&appName=Cluster0`);
        
        console.log('Server connected to mongoose database');
        
        server = app.listen(port, () => {
        console.log(`Library management system express server running on port ${port}`)
        })
    } catch (error) {
        console.log(error);
    }
}

main()

