import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import auth from './routes/auth';
import passport from './passport';
import sequelize from "./sequelize";
dotenv.config();

const port = process.env.SERVER_PORT;
const app = express();

app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json
app.use(passport.initialize());
app.use('/auth', auth);

try {
    sequelize.authenticate().then(() => console.log('Connection has been established successfully.'));
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `Authentication server started at http://localhost:${ port }` );
} );