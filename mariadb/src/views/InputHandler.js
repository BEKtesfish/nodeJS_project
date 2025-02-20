import  readline from "readline/promises"
import {stdin as input , stdout as output} from "process"

/**
 * Handles user input in the terminal
 * @class
 */
class InputHandler {
    /**
     * Ask question to the user and return answer
     * @param {String} question - The question to ask
     * @param {Promise<string>} answer - The user input
     */
    async ask(question){
        const  rl =  readline.createInterface({input,output})
        const answer = await rl.question(question)
        rl.close()
        return answer
    }
}

export default new InputHandler()