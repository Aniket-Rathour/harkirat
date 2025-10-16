const express= require("express");
const app= express();
const router = express.Router();
const getClient = require("../db")

interface todoBodyCheck{
    "id":string,
    "title":string;
    "description":string;
}

router.post("/add",async (req,res,next)=>{

    const body = req.body as todoBodyCheck;
    const client = await getClient();
    const insertTodoText = `INSERT INTO todos (title,description,user_id,done) VALUES ($1,$2,$3,$4) RETURNING id`
    const todoValues =[body.title,body.description,body.id,false]
    await client.query(insertTodoText,todoValues);
    return res.json({ success: true,msg:"add it succeffuly " });

})

router.put("/done", async (req,res,next)=>{
    const body = req.body;
    const client = await getClient();
    const updateTodoText = `UPDATE todos SET done = true WHERE id = $1`;
    const todoValues = [body.id];
    await client.query(updateTodoText, todoValues);
    res.json({ success: true, msg: "updated successfully" });
})

router.get('/get', async (req,res,next)=>{
    const userId = req.query.user_id; // Get user_id from query parameters
    const client = await getClient();

    const selectTodosText ='SELECT * FROM todos WHERE user_id = $1'
    const todoRes = await client.query(selectTodosText, [userId])

    console.log(`Todos for User Id `, userId)
    // Send the todos as a JSON response
    res.json({ success: true, todos: todoRes.rows });
})
module.exports = router;
