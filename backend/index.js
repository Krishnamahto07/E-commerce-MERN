const express = require('express')
const app = express();
const dotenv = require("dotenv");

const product = require("./routes/productRoute")
const connectDatabase = require("./config/database")
const errorMiddlerware = require("./middleware/error")


//Uncaught Error Handling
process.on("uncaughtException",(err) =>{
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
})
// console.log(Youtube);

dotenv.config({path:"backend/config/config.env"});

// connect database
connectDatabase();


//middlewares
app.use(express.json());
app.use(errorMiddlerware)


// routes
app.use("/api/v1",product);


app.get("/",(req,res)=>{
    res.send("<h1>Hlo world</h1>")
})

const server = app.listen(process.env.PORT,()=>{
    console.log(`server is runnit on ${process.env.PORT}`);
})

// Unhandled Promise Rejection
process.on("unhandledRejection",(err) =>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhadled Promise Reject`);

    server.close(()=>{
        process.exit(1);
    });
});