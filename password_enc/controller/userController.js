
export const controller ={}

controller.login = (req,res) => {
    res.send("hello world")
}

controller.validateLogin = (req,res) => {
    res.send("validated")
}

controller.getUser =(req,res) => {
    res.send("logged in")
}