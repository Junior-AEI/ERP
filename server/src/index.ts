import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/routes";
import dotenv from "dotenv";
import { populateDatabase } from "./config/database.config";

dotenv.config();
const app = express();

populateDatabase();

app.use(bodyParser.json({ limit: "50mb" }));

app.use("/api", routes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Express app listening on port ${port}`);
});
