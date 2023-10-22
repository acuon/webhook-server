const express = require("express")
// const {connection} = require("./config/connection")
const {apifyRouter} = require("./router/apifyrouter")
const { ApifyClient } = require('apify-client');
require("dotenv").config()

const app = express()
app.use(express.json())
// app.use(apifyRouter)

const apifyClient = new ApifyClient({
    token: 'apify_api_wbcHqR4sa12naomgrYsvPD72pgnWDx3uaPsp' 
});

// apifyClient.acts.listActs().then((actsList) => {
//     actsList.items.forEach((actor) => {
//         console.log(`Actor name: ${actor.name}, ID: ${actor.id}`);
//     });
// }).catch((err) => {
//     console.error('Error fetching actors:', err);
// });

app.get('/', (req, res) => {
    res.send("hi")
})

app.post('/instagram-data', async (req, res) => {
    // 
    console.log('rohitsharma', req.body)
    try {
        //TODO get actor id
        const run = await apifyClient.actor("apify/instagram-scraper").run();
        console.log("rohitsharma", run)
        const runDetails = await run.get();
        const instagramData = runDetails.output.body;
        console.log("instagram", instagramData)
        // res.json(instagramData);
        res.send("hi how are you")
    } catch (error) {
        console.error('Error fetching data from Apify:', error);
        res.status(500).send('Internal Server Error');
    }
});

const port = process.env.port || 1414 
app.listen(port, async () =>{
    try {
        // await connection
        // console.log({"message" : "connected to database"})        
    } catch (error) {
        // console.log({"message" : "something went wrong with database connection", "error" : error})
    }
    console.log({"message" : `server is running on port ${port}`, api : `http://localhost:${port}`})
})