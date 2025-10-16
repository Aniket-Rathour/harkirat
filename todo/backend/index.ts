const express = require("express");
const client1 = require("./db")
const cors = require("cors")
const app = express();
const mainRouter = require("./routes/index");
app.use(cors());
app.use(express.json());

app.use("/api/v1", mainRouter);
app.listen(3000);

async function createTable(){
    
    const client = await client1();
    const createUserTableQuery = `
        CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL 
        );
    `;

    await client.query(createUserTableQuery);

    const createTodoQuery =`
        CREATE TABLE IF NOT EXISTS todos(
            id SERIAL PRIMARY KEY,
            title  TEXT NOT NULL,
            description TEXT,
            user_id INTEGER REFERENCES users(id),
            done BOOLEAN DEFAULT FALSE
        );
    `;
    await client.query(createTodoQuery);

    console.log("SERVER CONECTED SUCCEFFULY");
}

createTable();
