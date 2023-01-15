// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input')

function main() {
    console.log("H A N G M A N");

    let score = {win_count: 0, lose_count: 0};

    while (true) {
        let query = input("Type \"play\" to play the game, \"results\" to show the scoreboard, and \"exit\" to quit:")

        switch (query) {
            case "play":
                playGame() ? score.win_count++ : score.lose_count++;
                break;
            case "results":
                console.log(`You won: ${score.win_count} times.\nYou lost: ${score.lose_count} times.`);
                break;
            case "exit":
                return;
        }
    }

}

// returns true if won, or false if lost
function playGame(){
    let word_list = ['python', 'java', 'swift', 'javascript'];

    let word = word_list[Math.floor(Math.random() * word_list.length)];
    let guesses = [];
    let attempts = 0;

    console.log("");

    while (attempts <= 8) {
        let curword = getMask(word, guesses);
        console.log(curword);

        let entry = input("Input a letter: ");

        if (!isValidLetter(entry, guesses)) continue;

        guesses.push(entry);

        if (!word.includes(entry)){
            console.log("That letter doesn't appear in the word.\n");
            guesses.push(entry);
            attempts++;
        }

        // check if all chars have been found
        if (getMask(word, guesses) === word) {
            console.log(`${word}\nYou guessed the word ${word}!\nYou survived!`);
            return true;
        }

        // attempts at 8 with no win -> lose
        if (attempts === 8){
            console.log("You lost!");
            return false;
        }

    }
}

function isValidLetter(entry, guesses){
    if (entry.length !== 1){
        console.log("Please, input a single letter.\n");
        return false;
    } else if (!entry.match(/[a-z]/)){
        console.log("Please, enter a lowercase letter from the English alphabet.\n");
        return false;
    } else if (guesses.includes(entry)){
        console.log("You've already guessed this letter.\n");
        return false;
    }

    return true;
}

function getMask(word, guessed){
    let display = "";
    for (let a = 0; a < word.length; a++) {
        if (guessed.includes(word[a])){
            display += word[a];
        } else {
            display += "-";
        }
    }
    return display;
}

main();