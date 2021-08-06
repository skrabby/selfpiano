import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(process.env.PG_SCHEMA, process.env.PG_LOGIN, process.env.PG_PASSWORD, {
    host: process.env.PG_HOST || 'localhost',
    port: parseInt(process.env.PG_PORT) || 5432,
    dialect: 'postgres'
});

export default sequelize;