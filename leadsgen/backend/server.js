const express = require('express');
const app = express();
const routes = require("./Routes/Routes")
require("dotenv").config();
const dbFn = require("./Utils/dbConnection")
dbFn()
app.use("/api/v1", routes);

app.use(express.json());

app.listen(3000, () => {
    console.log("Server running")
})