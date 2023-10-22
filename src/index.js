const express = require("express");
const mongoose = require("mongoose")
// const {connection} = require("./config/connection")
const {apifyRouter} = require("./router/apifyrouter")
const { ApifyClient } = require('apify-client');

const {UserData} = require('./model/userData');

require("dotenv").config()

const app = express()

mongoose.connect(process.env.mongoDB).then(()=> console.log("db connected")).catch((err) => console.log("not connected", err))

app.use(express.json())
// app.use(apifyRouter)

const apifyClient = new ApifyClient({
    token: 'apify_api_rIly1RukC3Sh6Xga7UkfpFb55joFAj35dGcH' 
});



// Initialize the ApifyClient with API token
const client = new ApifyClient({
    token: 'apify_api_rIly1RukC3Sh6Xga7UkfpFb55joFAj35dGcH',
});

// Prepare Actor input
const input = {
    "username": [
        "rohit_sharma.86"
    ],
    "resultsLimit": 30
};




// apifyClient.acts.listActs().then((actsList) => {
//     actsList.items.forEach((actor) => {
//         console.log(`Actor name: ${actor.name}, ID: ${actor.id}`);
//     });
// }).catch((err) => {
//     console.error('Error fetching actors:', err);
// });

app.get('/getData', (req, res) => {
    (async () => {
        // Run the Actor and wait for it to finish
        const run = await client.actor("nH2AHrwxeTRJoN5hX").call(input);
    
        // Fetch and print Actor results from the run's dataset (if any)
        console.log('Results from dataset');
        const items  = await client.dataset(run.defaultDatasetId).listItems();
        console.log('items', items)
        // items.forEach((item) => {
        //     console.dir(item);
        //     let user = UserData({user: 'rohit'})
        // user.save()
        // });
    
        
        // let temp =`${items}`
        // const data  = {item: items}
        console.log(items)
        // await UserData.create({userData: items})
        res.send(items)
    })();
})

app.post('/instagram-data-v2', async (req, res) => {
    // 
    console.log('instagram_scrapper_1', req.body)
    try {
        //TODO get actor id
        // Starts an actor and waits for it to finish.
        const { defaultDatasetId } = await apifyClient.actor('apify/instagram-post-scraper').call();

        // Fetches results from the actor's dataset.
        const { items } = await apifyClient.dataset(defaultDatasetId).listItems();

        console.log("instagram_scrapper_2", items)

        // const run = await apifyClient.actor("apify/instagram-scraper").run();
        // console.log("rohitsharma", run)
        // const runDetails = await run.get();
        // const instagramData = runDetails.output.body;
        // console.log("instagram", instagramData)
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