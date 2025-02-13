import {app} from './src/express.js';
import databaseService from "./src/service/DatabaseService.js"

const port = process.env.PORT || 3000;

app.listen(port,async ()=>{
    await databaseService.connect();
    console.log(`listening on http://localhost:${port}`);
})