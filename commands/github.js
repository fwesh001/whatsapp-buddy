async function githubCommand(sock, chatId) {
    const repoInfo = `*MAX👾🤖👾*

*📂 GitHub Repository:*
https://github.com/fwesh001/whatsapp-buddy
*📢 Official Youtube Channel:*
https://youtube.com/@zab.dfwesh

_Star ⭐ the repository if you like the bot!_`;

    try {
        await sock.sendMessage(chatId, {
            text: repoInfo,
            contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363422910625050@newsletter',
                    newsletterName: '⚜𝒵𝒜𝐵_𝒟𝐼𝐸𝐿⚜',
                    serverMessageId: -1
                }
            }
        });
    } catch (error) {
        console.error('Error in github command:', error);
        await sock.sendMessage(chatId, { 
            text: '❌ Error fetching repository information.' 
        });
    }
}

module.exports = githubCommand; 