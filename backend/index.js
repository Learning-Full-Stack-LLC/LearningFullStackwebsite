import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

MongoClient.connect(
    process.env.RESTLESSONS_DB_URI,
    {
        PoolSize: 50,
        wtimeout: 2500,
        useNewUrlParse: true
    })
    .catch(err =>{
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        app.listen(port, () => {
        ( `listening on port ${port}`)
    })
})