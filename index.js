import express from "express";
import { Client, GatewayIntentBits, ActivityType } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

// 🟢 Create small web server to keep bot alive on Render
const app = express();
app.get("/", (req, res) => res.send("Bot is alive ✅"));
app.listen(3000, () => console.log("🌐 Web server running on port 3000"));

// 🧠 Create Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// ⚙️ Environment variables
const BOT1_ID = process.env.BOT1_ID;

// 🔔 When bot is ready
client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);

  // 🎯 Set custom bot status
  client.user.setPresence({
    activities: [
      {
        name: "Free Fire tournaments 🏆",
        type: ActivityType.Playing
      }
    ],
    status: "online"
  });
});

// 💬 Listen for messages
client.on("messageCreate", async (message) => {
  // Ignore Bot 2’s own messages
  if (message.author.id === client.user.id) return;

  // Only respond to Bot 1’s messages
  if (message.author.id === BOT1_ID) {
    // Check if Bot 1’s message mentions "tournament"
    if (message.content.toLowerCase().includes("tournament")) {
      await message.channel.send(
        "<a:point:1435226425514004511> || @everyone || **REGISTER FAST SLOT WILL END SOON**"
      );
    }
  }
});

// 🔐 Login the bot
client.login(process.env.TOKEN);
