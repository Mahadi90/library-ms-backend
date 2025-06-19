import express, { Application, Request, Response } from 'express';
import { bookRoute } from './app/controllers/book.controller';

const app : Application = express()

// middleware
app.use(express.json())
app.use('/api/books', bookRoute)

app.get('/', (req : Request, res : Response) => {
    res.send('Library management system server runnung.......')
})

export default app;