import express from 'express';
import { getVinyls, getVinyl, createVinyl, updateVinyl } from "./db_connection.js";
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.get("/vinyls", async (req, res) => {
    const vinyls = await getVinyls();
    res.send(vinyls);
})

app.put("/vinyls/:id", async (req, res) => {
    try{
        const id = req.params.id;
        const body = req.body;

        const updatedVinyl = await updateVinyl(id, body);
        if (!updatedVinyl) {
            console.log("Vinyl not found with id:", id);
            return res.status(404).send({ error: "Vinyl not found" });
        }
        res.json(updatedVinyl);
    }
    catch(error){
        res.status(500).send({error: "Failed to update "});
    }
})

app.post("/vinyls", async (req, res) => {
    try{
        const body = req.body;
        const vinyl = await createVinyl(body);
        res.status(201).json(vinyl);
    }
    catch(error){
        res.status(500).send({error: "Failed to create vinyl"});
    }
})


app.listen(8080, () => {
    console.log('Server is running on port 8080');
})