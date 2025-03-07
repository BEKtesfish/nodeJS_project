import Guess from '../model/guessModel.js'
export const controller={}

controller.home =(req,res)=>{
    res.render('guess/home')
}
controller.init=(req,res,next)=>{
    const response = Guess.init()
    const number=response.number
    const numGuesses= response.numGuesses
    req.session.numGuesses=numGuesses;
    req.session.theNumberToGuess=number;
    res.redirect('./guess')
}

controller.guess = (req,res)=>{
    const lastguess = req.session.lastguess ?? null;
    const numGuesses =Guess.getNumGuess()
    req.session.lastguess = null;
    const data ={
        lastguess,
        numGuesses
    }
    res.render('guess/guess_form',data)
}

controller.guessCheck= (req , res) => {
    const theGuess= parseInt(req.body.guessedNumber);
    const response = Guess.guessCheck(theGuess);
    if(response){
        if(response.isWin){
            req.session.flashMessage = response.message;
            res.redirect('.')
        }else{
            req.session.flashMessage = response.message;
        }
      
    }else{
        req.session.flashMessage = "you have finished your 5 chance"
        res.redirect('.')
    }

    res.redirect('./guess')
    
   
}
controller.cheat=(req,res) => {
    req.session.flashMessage =`Cheater  the answer is ${req.session.theNumberToGuess}`
    res.redirect('./guess')
}