import express, { Application, Request, Response } from 'express';

const app : Application = express()

// middleware
app.use(express.json())

app.get('/', (req : Request, res : Response) => {
    res.send('Library management system server runnung.......')
})

export default app;