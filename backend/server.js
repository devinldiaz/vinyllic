import express from 'express'
import { getVinyls, getVinyl, createVinyl } from "./db_connection.js"

const cors = require('cors');
const app = express()

app.use(express.json())

app.get("/vinyls", async (req, res) => {
    const vinyls = await getVinyls();
    res.send(vinyls);
})

app.listen(8080, () => {
    console.log('Server is running on port 8080')
})