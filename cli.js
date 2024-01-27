#!/usr/bin/env node

const axios = require("axios");
const EAC = require("eaf-amr-client");
require('dotenv').config();
let clientMeta = {};

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
        clientMeta[responds.data[i].fullSerialNumber] = responds.data[i];
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
        const updateEAF = async function(discovegyReading,meter_sub) {
            if(( typeof meter_sub==='undefined') || (meter_sub == null)) {
                meter_sub = "energy";
            }
            let meter_identifier = meter_sub;
            if(meter_identifier == "energy") {
                meter_identifier = ""
            }
            if(typeof discovegyReading.values[meter_sub] !== 'undefined') {
                if(!isNaN(discovegyReading.values[meter_sub])) {
                    reading = discovegyReading.values[meter_sub];
                }
            }
        
            
            if(reading > 0) {
                let eafReading = {
                    time: discovegyReading.time,
                    reading: Math.round(reading/10000000)
                }
                const instance = new EAC({
                    meterId:meter.fullSerialNumber + meter_identifier,
                    baseUrl:process.env.EAF_BASEURL,
                    readingToken:process.env.EAF_CONCENTRATOR_TOKEN
                });
                const result = await instance.updateReading(eafReading.reading, eafReading.time);

                if(typeof process.env.UPDATE_META !== 'undefined') {
                    if(typeof clientMeta[meter.fullSerialNumber] !== 'undefined') {
                        clientMeta[meter.fullSerialNumber].meterId = meter.fullSerialNumber + meter_identifier;
                        console.log(await instance.updateAssetdata(clientMeta[meter.fullSerialNumber]));
                    }
                }   
                /*
                if(typeof instance.config.readingToken !== process.env.EAF_CONCENTRATOR_TOKEN) {
                    throw new Error('Update of EAF_CONCENTRATOR_TOKEN required');
                }
                */
            }
        }
        let reading = -1;
        await updateEAF(discovegyReading,"energy");
        await updateEAF(discovegyReading,"energyOut");
        await updateEAF(discovegyReading,"1.8.0");
        await updateEAF(discovegyReading,"2.8.0");
        await updateEAF(discovegyReading,"energy0");
        await updateEAF(discovegyReading,"energy1");
        await updateEAF(discovegyReading,"energy2");
        await updateEAF(discovegyReading,"energy3");
        await updateEAF(discovegyReading,"energy4");

    } 
}

app();