const os = require('os');
const settings = require('../settings.js');

function formatTime(seconds) {
    const days = Math.floor(seconds / (24 * 60 * 60));
    seconds = seconds % (24 * 60 * 60);
    const hours = Math.floor(seconds / (60 * 60));
    seconds = seconds % (60 * 60);
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);

    let time = '';
    if (days > 0) time += `${days}d `;
    if (hours > 0) time += `${hours}h `;
    if (minutes > 0) time += `${minutes}m `;
    if (seconds > 0 || time === '') time += `${seconds}s`;

    return time.trim();
}

// Show processing message
        await sock.sendMessage(chatId, {
            react: { text: '🤖', key: message.key }
        });

async function pingCommand(sock, chatId, message) {
    try {
        // 😎 Fun random loading messages
        const loadingMessages = [
            '```🛰️ Contacting intergalactic servers...```',
            '```⚙️ Spinning up hamsters...```',
            '```🚀 Boosting warp drive...```',
            '```🧠 Summoning neural network magic...```',
            '```📡 Checking how woke I am...```',
            '```🐢 Measuring slowness... please wait...```',
            '```🔍 Pinging reality...```',
            '```👾 Bot is flexing its latency muscles...```',
            '```🏃 Catching latency like it owes me money...```',
            '```🔧 Doing 1337 tech stuff...```',
            '```⏱️ Stopwatch go brrr...```',
            '```🐉 Asking ChatGPT for speed stats...```',
            '```🧪 Running diagnostics...```',
            '```🛰️ Beam me the ping, Scotty!```',
            '```👟 Calculating how fast I tripped...```'
        ];
        const randomMsg = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];

        // 💬 Send the random loading message
        const start = Date.now();
        await sock.sendMessage(chatId, { text: randomMsg });
        const end = Date.now();

        // 🧠 Do the math
        const ping = Math.round((end - start) / 2);
        const uptimeInSeconds = process.uptime();
        const uptimeFormatted = formatTime(uptimeInSeconds);

        // 📊 Build the final bot status
        const botInfo = `
\`\`\`
╭────────────────────────╮
│---| MAX👾🤖👾 STATUS |---
├────────────────────────┤
│ ⚡ Ping     : ${ping} ms
│ ⌛ Uptime   : ${uptimeFormatted}
│ 📀 Version  : v${settings.version}
╰────────────────────────╯
\`\`\`
`.trim();

//Channel info 
await sock.sendMessage(chatId, {
    text: botInfo,
    quoted: message,
    contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363422910625050@newsletter',
            newsletterName: '⚜𝒵𝒜𝐵_𝒟𝐼𝐸𝐿⚜',
            serverMessageId: -1
        }
    }
});



    } catch (error) {
        console.error('❌ Error in ping command:', error);
        await sock.sendMessage(chatId, { text: '💀 Oops, couldn\'t fetch the bot status. It tripped over its own wires.' });
    }
}

module.exports = pingCommand;
