# plug-nite-bot
A humble bot to echo Plug.dj activity in Discord

Shout out to [discord.js](https://discord.js.org) and [plugAPI](https://plugcubed.github.io/plugAPI/).

## Configure

Requires the following environment variables to be set:

* `PLUG_EMAIL` and `PLUG_PASSWORD`: credentials for a plug.dj account
* `PLUG_ROOM`: The plug.dj room to watch
* `DISCORD_BOT_TOKEN`: Discord Developer app bot API token
* `DISCORD_CHANNEL`: ID of Discord channel to output to

The Discord Bot needs to be invited to your server with at least send message and view channels permissions.

## Launch
```bash
$ node index.js
```
