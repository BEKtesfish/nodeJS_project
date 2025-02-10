import databaseService from "./src/service/DatabaseService.js"
import menu from "./src/menu.js"

await databaseService.connect();

do{
    menu.show();
}while(await menu.handleInput());

await databaseService.closeConnection();
process.exit(0);