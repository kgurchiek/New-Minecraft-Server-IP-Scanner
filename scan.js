const { MinecraftServerListPing } = require("minecraft-status");
const fs = require("fs");
const ipList = require("./masscan.json");
var file = require("./serverList.json");
const config = require("./config.json");
const pingChunkSize = config.pingChunkSize;
const pingTimeout = config.pingTimeout;
const chunkCap = Math.floor(ipList.servers.length / pingChunkSize);
console.log("chunkCap: " + chunkCap + "(" + ipList.servers.length + "/" + pingChunkSize + ")");
var chunksScanned = 0;

function ping(ip, port) {
    MinecraftServerListPing.ping(0, ip, port, pingTimeout)
        .then(response => {
            //console.log("success: " + ip);
            if (!isInSuccesses(ip, port)) {
                file.successIPs.push(ip);
                file.successPorts.push(port);
            }
        })
        .catch(error => {
            //console.log(error);
        });
}

function isInSuccesses(ip, port) {
    for (let i in file.successIPs) {
        if (file.successIPs[i] == ip && file.successPorts[i] == port) return true;
    }

    return false;
}

function saveData() {
    console.log('saving data...');
    file.totalServers = file.successIPs.length;
  
    fs.writeFile("./serverList.json", JSON.stringify(file), 'utf8', function (err) {
        if (err) {
            console.log("error while saving data:");
            return console.log(err);
        }
 
        console.log("data saved");
    });
}

function pingChunk(start) {
    console.log(`${start} (chunk ${chunksScanned})`);

    for (var i = 0; i < pingChunkSize; i++) {
        ping(ipList.servers[start + i].ip, ipList.servers[start + i].port);
    }

    setTimeout(function() {
        chunksScanned++;

        if (chunksScanned < chunkCap) {
            if (chunksScanned % 2 == 0) {
                saveData();
            }

            pingChunk(start + pingChunkSize);
        } else {
            saveData();
        }
    }, pingTimeout)
}

pingChunk(0);
