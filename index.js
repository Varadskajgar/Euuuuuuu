import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Bot 1’s Discord ID (not token)
const BOT1_ID = process.env.BOT1_ID;

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

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

client.login(process.env.TOKEN);
