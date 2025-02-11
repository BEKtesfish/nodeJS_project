import UserController from './controller/UserController.js';
import InputHandler from  './view/InputHandler.js';

class Menu {
    show(){
        console.log("\n--- Main Menu ---");
        console.log("1. Show Users");
        console.log("2. Show User");
        console.log("3. Add User");
        console.log("4. Update User");
        console.log("5. Delete User");
        console.log("6. Exit");
    }
    
    async handleInput(input){
        const userInput = await InputHandler.ask("Select an option: ")
        switch(userInput){
            case "1":
                await UserController.showUsers();
                break;

            case "2":
                const userId = parseInt(
                    await InputHandler.ask("Enter a user ID: "),
                    10
                )
                await UserController.showUser(userId)
                break;

            case "3":
                const nameToAdd = await InputHandler.ask("Enter username: ")
                const emailToAdd = await InputHandler.ask("Enter email: ")
                const passwordToAdd = await InputHandler.ask("Enter password: ")
                UserController.addUser(nameToAdd, emailToAdd, passwordToAdd);
                break;

            case "4":
                const idToUpdate =  parseInt(
                    await InputHandler.ask("Enter ID to update: "),
                    10
                )
                const newName = await InputHandler.ask("Enter new username: ")
                const newEmail = await InputHandler.ask("Enter new email: ")
                UserController.updateUser(idToUpdate, newName, newEmail);
                break;
            case "5":
                const idToDelete = parseInt(
                    await InputHandler.ask("Enter ID to delete: "),
                    10
                )
                await  UserController.deleteUser(idToDelete)
                break;
            case "6":
                console.log("Exiting the application ...");
                return false;
                break;
            default:
                console.log("Invalid option. Please try again.");
                
        }
        return true;
    }
}

export default new Menu();