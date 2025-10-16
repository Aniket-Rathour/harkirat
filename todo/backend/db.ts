const {Client} = require("pg");


async function getClient(){
    const client = new Client("postgresql://neondb_owner:npg_0VCOcPJKrl8s@ep-late-block-aes8p1e1-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require");
    await client.connect();
    return client;
}

module.exports = getClient;