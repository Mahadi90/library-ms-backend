import express, { Application, Request, Response } from 'express';
import cors from 'cors'
import { bookRoute } from './app/controllers/book.controller';
import { borrowRoute } from './app/controllers/borrow.controller';

const app : Application = express()

// middleware
app.use(express.json());
app.use(cors())
app.use('/api/books', bookRoute);
app.use('/api/borrow', borrowRoute)

app.get('/', (req : Request, res : Response) => {
    res.send('Library management system server runnung.......')
})

export default app;