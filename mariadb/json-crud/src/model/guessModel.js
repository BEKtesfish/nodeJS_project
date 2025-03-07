class Guess{
    #number;
    #numGuesses;
    
    init() {
        this.#numGuesses = 0;
        this.#number = Math.floor(Math.random()*100 +1)
        return {
            number: this.#number,
            numGuesses: this.#numGuesses
        };
    }
    guessCheck(guessedNumber){
        this.#numGuesses= this.#numGuesses + 1;
        if(this.#numGuesses < 6){
            if( this.#number === guessedNumber) {
                return {
                    isWin: true,
                    message:`Well done! you guessed it right. the number to gues was ${this.#number}`
                }
             }else if(this.#number < guessedNumber){
                 return {
                    isWin: true,
                    message:'Too high!'
                 }
             }
             else{
                 return {
                    isWin: true,
                    message: 'Too low!'
                 }
             }
        }else{
            return false
        }

    }
    getNumGuess(){
        return this.#numGuesses;
    }
   

}
export default new Guess()