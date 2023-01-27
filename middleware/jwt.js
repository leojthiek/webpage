const jwt=require('jsonwebtoken');


const verified=function(req,res,next){
    const token=req.cookies.jwt
    if(!token)return res.send('you are not authorised')

    try {
    jwt.verify(token,process.env.SECRET_KEY)
    } catch (error) {
        res.send(error)
    }
    next()
}
module.exports=verified;