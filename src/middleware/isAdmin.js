

const isAdmin = (req , res , next) =>{
    if (!req.user.isAdmin){
        res.status(403).json({message : "admins only"})
    }
    next()
}

export default isAdmin