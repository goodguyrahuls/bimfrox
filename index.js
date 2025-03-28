const express = require("express");
const app = express();

const port = 3000;

app.get("/webnova", (req, res) => {
    res.send("Working");
})







app.listen(port, () => {
    console.log("Server is now listening on local port");
})