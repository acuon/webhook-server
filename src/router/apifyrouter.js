// const express = require('express');
// const { ApifyClient } = require('apify');
// const app = express();

// const apifyClient = new ApifyClient({
//     token: 'apify_api_wbcHqR4sa12naomgrYsvPD72pgnWDx3uaPsp' 
// });

// // apifyClient.acts.listActs().then((actsList) => {
// //     actsList.items.forEach((actor) => {
// //         console.log(`Actor name: ${actor.name}, ID: ${actor.id}`);
// //     });
// // }).catch((err) => {
// //     console.error('Error fetching actors:', err);
// // });

// app.post('/instagram-data', async (req, res) => {
//     res.send("hi")
//     console.log('req', req)
//     try {
//         //TODO get actor id
//         const run = await apifyClient.actor("shu8hvrXbJbY3Eb9W").run();
//         const runDetails = await run.get();
//         const instagramData = runDetails.output.body;
//         res.json(instagramData);
//     } catch (error) {
//         console.error('Error fetching data from Apify:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });
