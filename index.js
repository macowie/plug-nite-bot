const PlugAPI = require("plugapi")
const Discord = require("discord.js")

require('dotenv').config()

const config = {
  plugEmail: process.env.PLUG_EMAIL,
  plugPassword: process.env.PLUG_PASSWORD,
  plugRoom: process.env.PLUG_ROOM,
  discordBotToken: process.env.DISCORD_BOT_TOKEN,
  discordChannel: process.env.DISCORD_CHANNEL
}

const plugClient = new PlugAPI({ email: config.plugEmail, 
  password: config.plugPassword })
const discordClient = new Discord.Client()

discordClient.on("ready", () => {
  console.log("Discord ready.")
  
  const channel = discordClient.channels.get(config.discordChannel)
  channel.send("The sleeper has awoken!").catch(logError);
  
  plugClient.on ("advance", (data) => {
    if (data.media == null)
        return
    
    var message = [data.currentDJ, "played", buildMediaMessage(data.media)].join(" ")
    console.log(new Date().toLocaleString(), message)
    channel.send(message).catch(logError)
  })
})

plugClient.connect(config.plugRoom)

discordClient.login(config.discordBotToken)
  .then((token) => {
    console.log("Discord authenticated.")
  }).catch((error) => {
    console.error("Discord authentication failed:");
    console.error(error)
    process.exit(1)
  })

function logError(error) {
  console.error(error)
}

function buildMediaMessage(media) {
  return [media.author, "-", media.title, buildMediaUrl(media)].join(" ")
}

function buildMediaUrl(media) {
  if(media.format == 1) { // 1 == Youtube
      return "https://youtu.be/" + media.cid
  } else { // 2 == Soundcloud
      return "https://soundcloud.com/" + media.cid
  }
}
  