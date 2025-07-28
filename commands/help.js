const settings = require('../settings');
const fs = require('fs');
const path = require('path');

async function helpCommand(sock, chatId, channelLink) {
    const helpMessage = `

╔════════════════════╗
   🧑‍💻 USER:  @${message.key.participant ? message.key.participant.split('@')[0] : message.key.remoteJid.split('@')[0]}
   📅 Date: *${new Date().toLocaleString()}*
   🤖 *${settings.botName|| 'MAX👾🤖👾'}*  
   🌟 VERSION:   *${settings.version|| '2.0.0'}*
   🛠️ DEVELOPER: *${settings.botOwner|| '⚜𝒵𝒜𝐵_𝒟𝐼𝐸𝐿⚜'}*
   🧩 PREFIX: *.*
   🔗 GITHUB: *@FWESH001*
╚═════════════════════╝

\`\`\`
AVAILABLE COMMANDS:

╔═══════════════════╗
🧰 GENERAL COMMANDS:
➤
║ ✧ 🧭 .help 
║ ✧ 📶 .ping
║ ✧ 💡 .alive
║ ✧ 🔊 .tts <text>
║ ✧ 👑 .owner
║ ✧ 🤣 .joke
║ ✧ 🧘 .quote
║ ✧ 📚 .fact
║ ✧ 🌤️ .weather <city>
║ ✧ 🗞️ .news
║ ✧ 💥 .attp <text>
║ ✧ 🎤 .lyrics <song_title>
║ ✧ 🔮 .8ball <question>
║ ✧ 📌 .groupinfo
║ ✧ 🛡️ .staff or .admins 
║ ✧ ⚔️ .vv
║ ✧ 💘 .pair or .rent
║ ✧ 🈯 .trt <text> <lang>
║ ✧ 🖼️ .ss <link>
╚═══════════════════╝ 

╔═══════════════════╗
👮‍♂️ ADMIN COMMANDS:
➤
║ ✧ 🔴 .ban @user
║ ✧ 🟢 .unban @user
║ ✧ 🔺 .promote @user
║ ✧ 🔻 .demote @user
║ ✧ 🔇 .mute <minutes>
║ ✧ 🔊 .unmute
║ ✧ 🗑️ .delete or .del
║ ✧ 🚷  .kick @user
║ ✧ 📋  .warnings @user
║ ✧ ⚠️ .warn @user
║ ✧ 🔗 .antilink
║ ✧ 🛡️ .antibadword
║ ✧ 🧹 .clear
║ ✧ 📣 .tag <message>
║ ✧ 📢 .tagall
║ ✧ 🤖 .chatbot
║ ✧ ♻️ .resetlink
╚═══════════════════╝

╔═══════════════════╗
👑 OWNER COMMANDS:
➤
║ ✧ 🎛️ .mode
║ ✧ 🚀 .autostatus
║ ✧ 🧨 .clearsession
║ ✧ 🕵️‍♂️ .antidelete
║ ✧ 🧹 .cleartmp
║ ✧ 🖼️ .setpp <reply to image>
║ ✧ 🤖 .autoreact
╚═══════════════════╝

╔═══════════════════╗
🖌️ IMAGE/STICKER COMMANDS:
➤
║ ✧ 🌫️ .blur <image>
║ ✧ 🖼️ .simage <reply to sticker>
║ ✧ 🧊 .sticker <reply to image>
║ ✧ 🎨 .tgsticker <Link>
║ ✧ 😂 .meme
║ ✧ 🏷️ .take <packname>
║ ✧ ⚡ .emojimix <emj1>+<emj2>
╚═══════════════════╝  

╔═══════════════════╗
🕹️ GAME COMMANDS:
➤
║ ✧ ❌⭕ .tictactoe @user
║ ✧ 🧩 .hangman
║ ✧ 🔠 .guess <letter>
║ ✧ 🧠 .trivia
║ ✧ 🗯️ .answer <answer>
║ ✧ 🤫 .truth
║ ✧ 🎯 .dare
╚═══════════════════╝

╔═══════════════════╗
🤖 AI COMMANDS:
➤
║ ✧ 💡 .gpt <question>
║ ✧ 🧠 .gemini <question>
╚═══════════════════╝

╔═══════════════════╗
🎯 FUN COMMANDS:
➤
║ ✧ 😎 .compliment @user
║ ✧ 🔥 .insult @user
║ ✧ 💘 .flirt 
║ ✧ 🎭 .shayari
║ ✧ 💤 .goodnight
║ ✧ 🌸 .roseday
║ ✧ 🧝‍♂️ .character @user
║ ✧ 💀 .wasted @user
║ ✧ 💘 .ship @user
║ ✧ 🤤 .simp @user
║ ✧ 🧠 .stupid @user [text]
╚═══════════════════╝

╔═══════════════════╗
🔤 TEXTMAKER:
➤
║ ✧ ⚙️ .metallic <text>
║ ✧ 🧊 .ice <text>
║ ✧ 🌨️ .snow <text>
║ ✧ ✨ .impressive <text>
║ ✧ 🧬 .matrix <text>
║ ✧ 💡 .light <text>
║ ✧ 🌈 .neon <text>
║ ✧ 👿 .devil <text>
║ ✧ 💟 .purple <text>
║ ✧ ⚡ .thunder <text>
║ ✧ 🍃 .leaves <text>
║ ✧ 🎬 .1917 <text>
║ ✧ 🛡️ .arena <text>
║ ✧ 🧑‍💻 .hacker <text>
║ ✧ 🏝️ .sand <text>
║ ✧ 🎙️ .blackpink <text>
║ ✧ 💻 .glitch <text>
║ ✧ 🔥 .fire <text>
╚═══════════════════╝

╔═══════════════════╗
📥 DOWNLOADER:
➤
║ ✧ 🎶 .play <song_name>
║ ✧ 🎼 .song <song_name>
║ ✧ 📷 .instagram <link>
║ ✧ 📙 .facebook <link>
║ ✧ 🎥 .tiktok <link>
╚═══════════════════╝

╔═══════════════════╗
💻 GITHUB COMMANDS:
➤
║ ✧ 🧩 .git
║ ✧ 🛠️ .github
║ ✧ ⚙️ .sc
║ ✧ 📂 .script
║ ✧ 📁 .repo
╚═══════════════════╝
\`\`\`

✉️ Join our channel for updates:`;

    try {

        //Sent after the .menu cmd is used
        await sock.sendMessage(chatId, {
  text: "```👋 Hey\n🧑‍💻 USER: @"+(message.key.participant 
         ? message.key.participant.split('@')[0] 
         : message.key.remoteJid.split('@')[0])
         +"\n📜 Here's the help menu! (Use . as the prefix)```",
  mentions: [message.key.participant || message.key.remoteJid],
  quoted: null
});


        
        const imagePath = path.join(__dirname, '../assets/bot_image.jpeg');
        
        if (fs.existsSync(imagePath)) {
            const imageBuffer = fs.readFileSync(imagePath);
            
            await sock.sendMessage(chatId, {
                image: imageBuffer,
                caption: helpMessage,
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363422910625050@newsletter',
                        newsletterName: 'Made with 🤍 by ⚜𝒵𝒜𝐵_𝒟𝐼𝐸𝐿⚜',
                        serverMessageId: -1
                    }
                }
            });
        } else {
            console.error('Bot image not found at:', imagePath);
            await sock.sendMessage(chatId, { 
                text: helpMessage,
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363422910625050@newsletter',
                        newsletterName: 'Made with 🤍 by ⚜𝒵𝒜𝐵_𝒟𝐼𝐸𝐿⚜',
                        serverMessageId: -1
                    } 
                }
            });
        }
    } catch (error) {
        console.error('Error in help command:', error);
        await sock.sendMessage(chatId, { text: helpMessage });
    }
}

module.exports = helpCommand;