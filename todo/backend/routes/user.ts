const express= require("express");
const app= express();
const router = express.Router();
const getClient = require("../db");
const bcrypt = require("bcrypt");


const errors= {
    "server":500,
    "unavailable":401,
    "client":404

}

interface SignUpBody {
    email: String,
    password: String
}

router.post("/signup", async (req,res,next)=>{
    const body = req.body as SignUpBody

    if(!body.email || !body.password ){
        return res.status(errors.client).json({
            msg:"emailId or password is missing"
        })
    }
    const client = await getClient();

    try{
        const checkUserQuery =`SELECT id FROM users WHERE email = $1`;
        const existUser = await client.query(checkUserQuery, [body.email])

        if(existUser.rows.length>0){
            return res.status(409).json({
                msg:"user with this email alread exist"
            })
        }
        const insertUserText = `INSERT INTO users (email,password) VALUES($1,$2) RETURNING id`
        const userValues = [body.email,body.password]
        let response = await client.query(insertUserText,userValues);
        console.log("signup successfully");

        return res.status(201).json({
            msg: "Signup successful",
            userId: response.rows[0].id,
        });


    }catch(err){
        console.error("Signup error:", err);
        return res.status(500).json({ msg: "Internal server error" });
    }
})


router.post("/signin",async (req,res,next)=>{
    const body = req.body;
    

    if(!body.email || !body.password ){
        res.status(errors.client).json({
            msg:"emailId or password is missing"
        })
    }

    try{
        const client = await getClient();
        const query= `SELECT id,password FROM users where email = $1 `;
        const result = await client.query(query,[body.email]);
        if(result.rows.length===0){
            return res.status(errors.unavailable).json({ msg: "Invalid email or password" });
        }
        const user = result.rows[0];
        if(body.password !== user.password){
            return res.status(errors.unavailable).json({ msg: "Invalid email or password" });
        }

        return res.status(200).json({
            msg:'signin successfully',
            userId: user.id
        });

    }catch(err){
        console.error("Signin error:", err);
        return res.status(errors.server).json({ msg: "Internal server error" });
    }
    

})

module.exports = router;
