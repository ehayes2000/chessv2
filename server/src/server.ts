import express, {Express, Request, Response} from 'express';
import path from 'path';
const app: Express = express();
const port = 8080;
const root_dir = null;
const static_client = __dirname.split('/').slice(0,-2).join('/') + '/client/build'
app.use(express.static(static_client))


app.get('/', (req: Request, res: Response)=>{
    console.log('get made')
    res.sendFile(static_client + '/index.html');
   
});

app.listen(port, ()=> {
    console.log(static_client);
    console.log(`[Server]: I am running at https://localhost:${port}`);
});