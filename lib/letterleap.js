const fs = require('fs');
const path = require('path');

// 📄 Load words from file
const WORD_LIST = fs.readFileSync(path.join(__dirname, 'words.txt'), 'utf-8')
  .split('\n')
  .map(w => w.trim().toLowerCase())
  .filter(Boolean);

// 🚀 Dictionary as a Set for fast lookup
const DICTIONARY = new Set(WORD_LIST);

class LetterLeap {
    constructor(playerA, playerB = null) {
        this.playerA = playerA;
        this.playerB = playerB;
        this.words = [];
        this.currentTurn = false; // false = A, true = B
        this.usedWords = new Set();
        this.playerWordCounts = {
            [playerA]: 0,
            [playerB]: 0
        };
    }

    get currentPlayer() {
        return this.currentTurn ? this.playerB : this.playerA;
    }

    getMinWordLength() {
        const minWords = Math.min(
            this.playerWordCounts[this.playerA] || 0,
            this.playerWordCounts[this.playerB] || 0
        );

        const stage = Math.floor(minWords / 3); 
        return Math.min(2 + stage, 6); // cap at 6
    }

    isValidWord(word) {
    if (!/^[a-zA-Z]{2,}$/.test(word)) {
        return { ok: false, error: "❌ Word must contain only letters (A–Z) and be at least 2 characters." };
    }

    if (this.usedWords.has(word.toLowerCase())) {
        return { ok: false, error: "🔁 Word has already been used." };
    }

    if (this.words.length > 0) {
        const lastWord = this.words[this.words.length - 1];
        if (word[0].toLowerCase() !== lastWord.slice(-1).toLowerCase()) {
            return { ok: false, error: `🔗 Word must start with '${lastWord.slice(-1).toUpperCase()}'` };
        }
    }

    const minLength = this.getMinWordLength();
    if (word.length < minLength) {
        return { ok: false, error: `📏 Word is too short. Minimum length is ${minLength}` };
    }

    if (!DICTIONARY.has(word.toLowerCase())) {
        return { ok: false, error: `📚 '${word}' not found in dictionary.` };
    }

    return { ok: true };
}


    playWord(player, word) {
    if (player !== this.currentPlayer) {
        return { ok: false, error: '⛔ Not your turn!' };
    }

    const validation = this.isValidWord(word);
    if (!validation.ok) {
        return { ok: false, error: validation.error };
    }

    this.words.push(word);
    this.usedWords.add(word.toLowerCase());

    this.playerWordCounts[player] = (this.playerWordCounts[player] || 0) + 1;
    this.currentTurn = !this.currentTurn;

    return { ok: true, word };
}

getNextLetter() {
    if (this.words.length === 0) return null;
    return this.words[this.words.length - 1].slice(-1).toUpperCase();
}


    getHistory() {
        return this.words.join(' ➡️ ');
    }

    hasOpponent() {
        return !!this.playerB;
    }
}

module.exports = LetterLeap;
