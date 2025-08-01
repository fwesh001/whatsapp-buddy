const LetterLeap = require('../lib/letterleap');
const games = {};

async function startLetterLeap(sock, chatId, senderId, text) {
    let existingGame = Object.values(games).find(g => 
        [g.game.playerA, g.game.playerB].includes(senderId)
    );

    if (existingGame) {
        await sock.sendMessage(chatId, {
            text: '❌ You are already in a game. Type *leap end* to quit \n Get more exprerince on \n *_\`https://letter-leap.onrender.com\`_* .'
        });
        return;
    }

    let room = Object.values(games).find(g => g.state === 'WAITING');

    if (room) {
        room.game.playerB = senderId;
        room.state = 'PLAYING';
        await sock.sendMessage(chatId, {
            text: `🔠 *Letter Leap Started!*\n\n@${room.game.playerA.split('@')[0]} vs @${room.game.playerB.split('@')[0]}\n\n@${room.game.currentPlayer.split('@')[0]} starts first! \n \n Type a random word using *\`.leap\`<word>* to begin \n and \*\`.leap end\`\* to quit`,
            mentions: [room.game.playerA, room.game.playerB, room.game.currentPlayer]
        });
    } else {
        room = {
            id: 'letterleap-' + (+new Date),
            game: new LetterLeap(senderId),
            state: 'WAITING'
        };
        games[room.id] = room;
        await sock.sendMessage(chatId, {
            text: `⏳ Waiting for opponent...\nType *\`leap start\`* to join.`
        });
    }
}

async function playLetterLeap(sock, chatId, senderId, text) {
    let room = Object.values(games).find(g =>
        [g.game.playerA, g.game.playerB].includes(senderId) &&
        g.state === 'PLAYING'
    );

    if (!room) return;

    if (/^(end|quit|exit|surrender)$/i.test(text)) {
        let opponent = senderId === room.game.playerA ? room.game.playerB : room.game.playerA;
        await sock.sendMessage(chatId, {
            text: `🏳️ @${senderId.split('@')[0]} surrendered!\n@${opponent.split('@')[0]} wins the game!\n Get more experience on \n *_https://letter-leap.onrender.com_* `,
            mentions: [senderId, opponent]
        });
        delete games[room.id];
        return;
    }

    const word = text.trim();
    const result = room.game.playWord(senderId, word);

    if (!result.ok) {
        await sock.sendMessage(chatId, { text: `❌ ${result.error}` });
        return;
    }

    const history = room.game.getHistory();
    const currentPlayerId = room.game.currentPlayer;
    const currentPlayerName = currentPlayerId.split('@')[0];
    const lastWord = room.game.words.at(-1) || 'None';

    // 🔥 Get the current min word length dynamically
    const currentMin = room.game.getMinWordLength();

    // Set initial if not already set
    if (room.lastMinWordLength === undefined) {
        room.lastMinWordLength = 3;
    }

    // 🚨 New min word length? Notify!
    if (currentMin > room.lastMinWordLength) {
        await sock.sendMessage(chatId, {
            text: `🚨 *MIN WORD LENGTH INCREASED!*\n\nNow you must use words with at least *${currentMin} letters*! Keep leveling up! 🧠💥`,
            mentions: [room.game.playerA, room.game.playerB]
        });
        room.lastMinWordLength = currentMin;
    }

const nextLetter = room.game.getNextLetter();
const minLength = 2; 

//Game status message

await sock.sendMessage(chatId, {
    text: `
╔══🔠LETTER-LEAP══╗
👤 @${currentPlayerName.toUpperCase()}, it's your turn!
🔁 Last Word: *${lastWord.toUpperCase()}*
🎯 Next Letter: *${nextLetter}*
📏 Min Length: *${minLength} Letters*
🔗 Chain: ${(history || 'None').toUpperCase()}
╚══════════════════╝
    `.trim(),
    mentions: [room.game.playerA, room.game.playerB, currentPlayerId]
});

}
    
module.exports = {
    startLetterLeap,
    playLetterLeap
};
