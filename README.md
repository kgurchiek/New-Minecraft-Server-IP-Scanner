# Minecraft Server IP Scanner

<div align="center">
    <img src="https://img.shields.io/github/last-commit/kgurchiek/Minecraft-Server-IP-Scanner" alt="GitHub last commit"/>
    <img src="https://img.shields.io/github/languages/code-size/kgurchiek/Minecraft-Server-IP-Scanner" alt="GitHub code size in bytes"/>
</div>

## About
Scans the internet for Minecraft server ips. Used to gather the database for my server scanner discord bot (https://github.com/kgurchiek/Minecraft-Server-Scanner-Discord-Bot).

## Configuration
Configuration is handled via a json file, `config.json`. An example is provided in this repository.

There are two variables in config.json that you'll want to configure to your liking:
- **pingChunkSize:** how many ips are pinged at once. Larger numbers will make the scan faster, but will of course be harder on your computer. Make sure this number is below your max open files limit, otherwise you won't get any results.
- **pingTimeout:** how long to wait for a ping response before deciding it isn't an active server. 2000 - 3000 is recommended.

Unlike [my old scanner](https://github.com/kgurchiek/Minecraft-Server-IP-Scanner), this one is based on an existing masscan. Run a masscan of the ips you want to scan, then format the results to be a list of objects (eg. `[{ ip: 0.0.0.1, port:25565 }, { ip: 0.0.0.2, port:25565 }]`, and save that into the `masscan.json` file. To learn more, read [masscan's official README](https://github.com/robertdavidgraham/masscan/blob/master/README.md).

This code requires Node.js, so make sure you have that installed.

## Usage
When you're ready to start the scan, run `node scan.js`.

If you want to check how many servers you've gathered so far, run `node getTotalServers.js`.

All servers will be saved to serverList.json. The order of items in the list is synchronized, so successIPs[3]'s port will be successPorts[3]. 
