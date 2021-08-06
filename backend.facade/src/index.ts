import express from "express";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.SERVER_PORT;
const app = express();

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `Server started at http://localhost:${ port }` );
} );