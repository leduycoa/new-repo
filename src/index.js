// require('dotenv').config()
// const cron = require('node-cron');
// const axios = require('axios');
// const notifier = require('node-notifier');
// const fs = require('fs');
// const constants = require('./constants');
const express = require('express');
const app = express();
const port = 3000;
const handlebars = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const route = require('./routes');
const db = require('./config/db/index');
app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json())
db.connect();

// const TOTAL_IDS = [];
// const NEW_LINE = "\r\n";
// const TOKEN = "NTExOTI3NTM1NTk3MjU2NzA1.GqMl3E.WHpJwknfS2jC0sIvX6O6WneZMJ1UsccAqCys0Y"

// const MATCH_NAME = /\*\*\*\w+\*\*\*/;
// const MATCH_CP = /CP\d+/;
// const MATCH_LOCATION = /\*[\w\s\,]+\*$/;
// const MATCH_LV = /L\d+/;
// const MATCH_IV =/IV\d+/;
// const MATCH_DEX = /\:\d+\:/;

// const LOCATION_SEARCH = ['Anaheim', 'Utah', 'Salt Lake City', 'Caboolture', 'Pinellas County', 'Copenhagen', 'Pennsylvania', 'Lehigh County', 'Pafos', 'Gloucester County'];
// const NAME_SEARCH = ['Makuhita', 'Whirlipede', 'Murkrow', 'Eevee', 'Snubbull', 'Stufful','Oddish', 'Slakoth', 'Snivy'];

//
app.engine('hbs',handlebars.engine({
    extname: '.hbs'
  })
);
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'));

//
// Main function
// main()
// console.info("Application started")

// function main() {
//     // fs.mkdirSync("./logs"); // Create tmp logs folder.

//     cron.schedule('* * * * *', () => {
//         const current = new Date();
//         console.info(current.toISOString() + ' - running a task scan.');

//         // Input account Token.
//         const headers = {
//             Authorization: TOKEN
//         }
//         // IV100
//         axios.get('https://discord.com/api/v9/channels/' + constants.CHANNEL_IDS.IV100 + '/messages?limit=50', { headers })
//             .then((response) => {
//                 // handle success
//                 const data = response.data;
//                 const rs = [];
               
//                 for (const elm of data) {
//                     for (const elm1 of LOCATION_SEARCH) {
//                         if(elm.content.toLowerCase().includes(elm1.toLowerCase()))
//                         rs.push(elm)
//                     }
//                     for (const elm2 of NAME_SEARCH) {
//                         if(elm.content.toLowerCase().includes(elm2.toLowerCase()))
//                         rs.push(elm)
//                     }
//                 }
                
//                 const nYdata = rs   
//                 console.log("[IV100] Scan " + data.length + " records. Match " + nYdata.length + " items");
//                 if (nYdata && nYdata.length > 0) {
//                     let flags = false;
//                     for (const nY of nYdata) {
//                         const id = nYdata.id;
//                         if (!TOTAL_IDS.includes(id)) {
//                             flags = true;
//                             TOTAL_IDS.push(id)
//                             const link = nY.embeds[0].description;
//                             const { message, data } = buildNote(nY.content);
//                             // data.pkName === ""
//                             const content = "[IV100] " + new Date(nY.timestamp).toISOString() + " " + message;
//                             fs.writeFileSync('./logs/notes.txt', content + NEW_LINE + "Link: " + link + NEW_LINE, { flag: 'a' });
//                             console.log(content)
//                         }
//                     }
//                     if (flags) {
//                         // notifier.notify({
//                         //     title: 'Pocket Notifier',
//                         //     message: 'Have Pokemon 100IV in NY'
//                         // });
//                     }
//                 }
//             })
//             .catch(function (error) {
//                 // handle error
//                 console.log(error);
//             })
//             .finally(function () {
//                 // always executed
//             });
//     })
// }

// function buildNote(content) {
//     let pkName = null;
//     let pkDEX = null;
//     let pkIV = null;
//     let pkLV = null;
//     let pkCP = null;
//     let pkLocation = null;

//     const matchName = content.match(MATCH_NAME);
//     if (matchName && matchName.length > 0) {
//         pkName = matchName[0].replace(/\*/gm, "");
//     };

//     const matchDex = content.match(MATCH_DEX);
//     if (matchDex && matchDex.length > 0) {
//         pkDEX = matchDex[0].replace(/\:/gm, "");
//     };

//     const matchIvi = content.match(MATCH_IV);
//     if (matchIvi && matchIvi.length > 0) {
//         pkIV = matchIvi[0].replace(/\*/gm, "");
//     };

//     const matchLv = content.match(MATCH_LV);
//     if (matchLv && matchLv.length > 0) {
//         pkLV = matchLv[0].replace(/\*/gm, "");
//     };

//     const matchCp = content.match(MATCH_CP);
//     if (matchCp && matchCp.length > 0) {
//         pkCP = matchCp[0].replace(/\*/gm, "");
//     };

//     const matchLocation = content.match(MATCH_LOCATION);
//     if (matchLocation && matchLocation.length > 0) {
//         pkLocation = matchLocation[0].replace(/\*/gm, "");
//     };    
//     const message = `Found ${pkName}[${pkDEX}] ${pkIV} ${pkLV} ${pkCP} in ${pkLocation}`;

//     return {
//         message, data: { pkName, pkDEX, pkIV, pkCP, pkLV, pkLocation }
//     };
// }

route(app);

  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
  })
