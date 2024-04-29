// Copyright (C) 2023 Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD

// Authors: Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD
// Maintainer: contact@junior-aei.com

// This file is part of LATIME.

// LATIME is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// LATIME is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with LATIME. If not, see <https://www.gnu.org/licenses/>.
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/routes";
import cors from "cors";
import { setupMessageHandling } from "./controller/bot.controller";

// import { sequelizeInit } from "./config/database.config";

const app = express();
app.use(cors());

app.use(bodyParser.json({ limit: "50mb" }));

app.use("/api", routes);
setupMessageHandling();


const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Express app listening on port ${port}`);
});

// sequelizeInit();
