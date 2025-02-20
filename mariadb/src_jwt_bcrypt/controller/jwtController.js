

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
        
        try{
            const id = await userModel.addUser(req.body.name, req.body.email, req.body.password,req.body.role);
            console.log(id)
            res.status(201).json({
                message: `User added successfully with id ${id}`
         
           })
        }catch(err) {
            res.status(400).json({
                error: "User already exists and can not register again",
            })
        }
        
        
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
UserController.login = async (req,res)=> {
    try{
        const response =await userModel.login(req.body.name,req.body.password)
       res.setHeader("Authorization",`Bearer ${response}`)
       res.status(200).json({
        message: "loged in successfully"
       })
        
    }catch(e){
        res.status(500).send({
            message: e.message
        });
    }
        
}
UserController.token =  async (req,res)=>{
    try{
    if( res.locals.jwt){
        res.status(200).json({
            message: "Token is valid"
        });
    }
    }catch(e){
        res.status(403).json({
            message: "Token is not valid"
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
UserController.deleteAllUser= async (req, res)=>{
    try{
        const success = await userModel.deleteUsers()
        if(success){
            res.status(201).json(
                {
                    success: "Successfully deleted all users",
                }
            );
        }else{
            res.status(404).json(
                {
                    error: "No users found to delete",
                }
            )
        }

    }catch(err){
        res.status(500).json({
            error: err.message,
        });
    }
}

UserController.showUser= async (req,res)=>{
      
            
        try{
            
            const user = await userModel.getUser(req.query.name);
          
          
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
UserController.verifyHeader =async (req,res) => {
   
    const key = req.header('Authorization') || null;
    if(!key){
        return res.status(401).json({
            error: "Authorization header is required",
        });
    }
    res.status(200).json({
        result:"YES. You supplied a valid Key through the header!"
    })
}
UserController.verifyBody = async (req,res)=>{
    console.log(req.body)
    const result = await req.body.Authorization || null;
    if(!result){
        return res.status(401).json({
            error: "On body Authorization  is required in the body",
        });
    }
    res.status(200).json({
        result:"YES. You supplied a valid Key through the body!"
    })

}
UserController.verifyApiMeddleware = async (req, res) => {
    res.status(200).json({
        result:"YES. You supplied a valid Key through the body!"
    });
}

  





