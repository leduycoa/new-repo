require('dotenv').config()
const cron = require('node-cron');
const axios = require('axios');
const notifier = require('node-notifier');
const fs = require('fs');
const constants = require('./constants');

const TOTAL_IDS = [];
const NEW_LINE = "\r\n";
const TOKEN = "NTExOTI3NTM1NTk3MjU2NzA1.GqMl3E.WHpJwknfS2jC0sIvX6O6WneZMJ1UsccAqCys0Y"

const MATCH_NAME = /\*\*\*\w+\*\*\*/;
const MATCH_CP = /\*CP\d+\*/;
const MATCH_LOCATION = /\*[\w\s,]+\*$/;
const MATCH_LV = /\*L\d+\*/;
const MATCH_IV = /IV\d+/;
const MATCH_DEX = /:\d+:/;

const LOCATION_SEARCH = ["New York", "Utah"]

// Main function
main()
console.info("Application started")

function main() {
    fs.mkdirSync("./logs"); // Create tmp logs folder.

    cron.schedule('* * * * *', () => {
        const current = new Date();
        console.info(current.toISOString() + ' - running a task scan.');

        // Input account Token.
        const headers = {
            Authorization: TOKEN
        }
        // IV100
        axios.get('https://discord.com/api/v9/channels/' + constants.CHANNEL_IDS.IV100 + '/messages?limit=50', { headers })
            .then((response) => {
                // handle success
                const data = response.data;
                const nYdata = data.filter(d => LOCATION_SEARCH.some(l => d.content.toLowerCase().includes(l.toLowerCase())));
                console.log("[IV100] Scan " + data.length + " records. Match " + nYdata.length + " items");
                if (nYdata && nYdata.length > 0) {
                    let flags = false;
                    for (const nY of nYdata) {
                        const id = nYdata.id;
                        if (!TOTAL_IDS.includes(id)) {
                            flags = true;
                            TOTAL_IDS.push(id)
                            const link = nY.embeds[0].description;
                            const { message, data } = buildNote(nY.content);
                            const content = "[IV100] " + new Date(nY.timestamp).toISOString() + " " + message;
                            fs.writeFileSync('./logs/notes.txt', content + NEW_LINE + "Link: " + link + NEW_LINE, { flag: 'a' });
                            console.log(content)
                        }
                    }
                    if (flags) {
                        notifier.notify({
                            title: 'Pocket Notifier',
                            message: 'Have Pokemon 100IV in NY'
                        });
                    }
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });

        // Check lengends
        axios.get('https://discord.com/api/v9/channels/' + constants.CHANNEL_IDS.CP2000 + '/messages?limit=50', { headers })
            .then((response) => {
                // handle success
                const data = response.data;
                const nYdata = data.filter(d => constants.LENGENDS.some(l => d.content.toLowerCase().includes(l.toLowerCase())));
                console.log("[LG] Scan " + data.length + " records. Match " + nYdata.length + " items");
                if (nYdata && nYdata.length > 0) {
                    let flags = false;
                    for (const nY of nYdata) {
                        const id = nYdata.id;
                        if (!TOTAL_IDS.includes(id)) {
                            flags = true;
                            TOTAL_IDS.push(id)
                            const link = nY.embeds[0].description;
                            const { message, data } = buildNote(nY.content);
                            const content = new Date(nY.timestamp).toISOString() + " Lengends: " + message;
                            fs.writeFileSync('./logs/notes.txt', content + NEW_LINE + "Link: " + link + NEW_LINE, { flag: 'a' });
                            console.log(content)
                        }
                    }
                    if (flags) {
                        notifier.notify({
                            title: 'Pocket Notifier',
                            message: 'Have Pokemon Lengends'
                        });
                    }
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    });
}

function buildNote(content) {
    let pkName = null;
    let pkDEX = null;
    let pkIV = null;
    let pkLV = null;
    let pkCP = null;
    let pkLocation = null;

    const matchName = content.match(MATCH_NAME);
    if (matchName && matchName.length > 0) {
        pkName = matchName[0].replace(/\*/gm, "");
    }
    const matchDEX = content.match(MATCH_DEX);
    if (matchDEX && matchDEX.length > 0) {
        pkDEX = matchDEX[0].replace(/:/gm, "");
    }
    const matchLV = content.match(MATCH_LV);
    if (matchLV && matchLV.length > 0) {
        pkLV = matchLV[0].replace(/\*/gm, "");
    }
    const matchCP = content.match(MATCH_CP);
    if (matchCP && matchCP.length > 0) {
        pkCP = matchCP[0].replace(/\*/gm, "");;
    }
    const matchIV = content.match(MATCH_IV);
    if (matchIV && matchIV.length > 0) {
        pkIV = matchIV[0].replace(/\*/gm, "");
    }
    const matchLC = content.match(MATCH_LOCATION);
    if (matchLC && matchLC.length > 0) {
        pkLocation = matchLC[0].replace(/\*/gm, "");
    }

    const message = `Found ${pkName}[${pkDEX}] ${pkIV} ${pkLV} ${pkCP} in ${pkLocation}`;

    return {
        message, data: { pkName, pkDEX, pkIV, pkCP, pkLV, pkLocation }
    };
}
