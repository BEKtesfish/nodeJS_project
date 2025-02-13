import OutputHandler from '../view/OutputHandler.js';

import userModel from '../model/UserModel.js';

export const UserController= {}

UserController.verifyId = (req,res,next,id) =>{
    try{
        req.userId=  userModel.verifyUser(id)
    }catch(err){
        return res.status(400).json(err);
    }
    next();
}

UserController.showUsers = async (req,res)=>{
        try {
            const user = await userModel.getUsers(req.query.name, req.query.email);
            console.log(user)
            res.json(user);
        } catch (error) {
            res.status(404).send(error)
           
        }
}


UserController.addUser = async (req,res)=>{
        
        console.log(req.body)
        const id = await userModel.addUser(req.body.name, req.body.email, req.body.password);
        console.log(id)
        res.status(201).json({
            message: `User added successfully with id ${id}`
        })
        

}
UserController.searchUser= async (req, res) => {
    try{
        console.log("searching user", req.query)
        const user = await userModel.searchUser(req.query.name, req.query.email);
        console.log("search user", user)
        if(user.length > 0){
            res.status(200).json(user);
        }else{
            res.status(404).json(
                {
                    error: "No user found with that email or name",
                }
            )
        }
       
    }catch(err){
        res.status(500).json({
            error: err.message
        });
    }
}


UserController.updateUser = async (req,res)=>{
        try{
            const success = await userModel.updateUser(req.userId,req.body.name,req.body.email);
            if(success){
               res.status(201).json(
                {
                    success: "Successfully updated the user",
                }
            );
            }else{
                res.status(400).json(
                    {
                        error: "User not found",
                    }
                )
            }
            
        }catch(e){
            res.status(500).json({
                error: e.message
            });
        }
}

UserController.deleteUser= async (req,res)=>{
        try{
            const success = await userModel.deleteUser(req.userId);
            if(success){
                res.status(201).json(
                    {
                        success: "Successfully Deleted the user",
                    }
                );
            }else{
                res.status(400).json(
                    {
                        Error: `User with an ID ${req.userId} was not found`,
                    }
                );
            }
        }catch(e){
            res.status(500).json(
                {
                    Error: e.message,
                }
            );
        }
}

UserController.showUser= async (req,res)=>{
      
            
        try{
            const user = await userModel.getUser(req.userId);
          
          
            if(user){
                res.status(200).json(user);
            }else{
               res.status(404).json({
                error: `User with an ID ${req.userId} was not found`,
               })
            }
        }catch(e){
            res.status(500).json({
                error: e.message,
            });
        }
}

  





