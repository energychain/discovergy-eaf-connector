#!/usr/bin/env node

const axios = require("axios");
const EAC = require("eaf-amr-client");
require('dotenv').config();

const fetchMeters = async function() {
    let responds = await axios.get("https://api.discovergy.com/public/v1/meters",{
         auth: {
            username: process.env.DISCOVERGY_USERNAME,
            password: process.env.DISCOVERGY_PASSWORD
          }
    });
    let meters = [];
    for(let i=0;i<responds.data.length;i++) {
        meters.push({
            meterId: responds.data[i].meterId,
            fullSerialNumber: responds.data[i].fullSerialNumber,
            administrationNumber: responds.data[i].administrationNumber
        })
    }
    return meters;
}

const rerieveReading = async function(meter) {
    let responds = await axios.get("https://api.discovergy.com/public/v1/last_reading?meterId="+meter.meterId,{
         auth: {
            username: process.env.DISCOVERGY_USERNAME,
            password: process.env.DISCOVERGY_PASSWORD
          }
    });
    return responds.data;
}

const app = async function() {
    // Fetch list of meters
    const meters = await fetchMeters(); // Assuming there is a function to fetch the list of meters
    // Iterate meters and push it to metering endpoint of utilities EAF instance
    for (const meter of meters) {
        const discovegyReading = await rerieveReading(meter);
        let reading = -1;
        if(typeof discovegyReading.values.energy !== 'undefined') {
            if(!isNaN(discovegyReading.values.energy)) {
                reading = discovegyReading.values.energy;
            }
        }
        if(reading > 0) {
            let eafReading = {
                time: discovegyReading.time,
                reading: Math.round(reading/10000000)
            }
            const instance = new EAC({
                meterId:meter.fullSerialNumber,
                baseUrl:process.env.EAF_BASEURL,
                readingToken:process.env.EAF_CONCENTRATOR_TOKEN
            });
            const result = await instance.updateReading(eafReading.reading, eafReading.time);
            /*
            if(typeof instance.config.readingToken !== process.env.EAF_CONCENTRATOR_TOKEN) {
                throw new Error('Update of EAF_CONCENTRATOR_TOKEN required');
            }
            */
        }
    } 
}

app();