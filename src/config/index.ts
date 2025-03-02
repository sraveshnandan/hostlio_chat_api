import { configDotenv } from "dotenv";

configDotenv();

const app_port = process.env.PORT;
const db_uri = process.env.MONGO_URI;

export { app_port, db_uri };
