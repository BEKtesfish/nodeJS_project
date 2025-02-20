import {app} from './src_jwt_bcrypt/express.js';
import DatabaseService from "./src_jwt_bcrypt/service/DatabaseService.js"

const port = process.env.PORT || 3000;

const server=app.listen(port,async ()=>{
   
        await DatabaseService.connect();
   
    
    console.log(`listening on http://localhost:${port}`);
})
async function shutDown(){
    server.close();
    await DatabaseService.closeConnection();
}

process.on('SIGINT', shutDown);
process.on(' SIGTERM', shutDown);
