/**
 * Handles displaying output to the user via the terminal
 * @class
 */
class OutputHandler {
    /**
     * show the List of users
     * @params {Array} users -The list of all the users
     */
    showUsers(users){
        console.tabel(users);
    }
    /**
     * show a success message
     * @param {string} message - The message to be shown
     */
    showSuccess(message){
        console.log(`\x1b[32m${message}\x1b[0m`);
    }
    /**
     * show an error message
     * @param {string} message - The error message to be shown
     */
    showError(message,error){
        console.error(`\x1b[31m${message}\x1b[0m`);
        if(error) console.error(`\n${error}`);
    }
}

export default new OutputHandler()