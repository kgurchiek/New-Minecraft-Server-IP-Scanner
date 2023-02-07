const file = require("./serverList.json");
const ipList = require("./masscan.json");

console.log("masscan found " + ipList.servers.length + " total servers");
console.log(file.totalServers + " total servers have been confirmed");
