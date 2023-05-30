import { app } from './server';
import express, { Request, Response } from 'express';

const static_client = __dirname.split('/').slice(0,-2).join('/') + '/client/build'
app.use(express.static(static_client))

app.get('/', (req: Request, res: Response)=>{
    res.sendFile(static_client + '/index.html');
});