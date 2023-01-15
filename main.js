// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input')

function main() {
    console.log("H A N G M A N");

    let score = {
        win_count: 0,
        lose_count: 0
    }

    while (true) {
        let query = input("Type \"play\" to play the game, \"results\" to show the scoreboard, and \"exit\" to quit:")

        switch (query) {
            case "play":
                playGame(score);
                break;
            case "results":
                console.log(`You won: ${score.win_count} times.\nYou lost: ${score.lose_count} times.`);
                break;
            case "exit":
                return;
        }
    }

}

function playGame(score){

    let word_list = ['python', 'java', 'swift', 'javascript'];

    let picked = word_list[Math.floor(Math.random() * word_list.length)];
    let guesses = [];
    let attempts = 0;

    console.log("");

    while (attempts <= 8) {
        let curword = getMask(picked, guesses);
        console.log(curword);

        let entry = input("Input a letter: ");

        if (entry.length !== 1){
            console.log("Please, input a single letter.\n");
            continue;
        } else if (!entry.match(/[a-z]/)){
            console.log("Please, enter a lowercase letter from the English alphabet.\n");
            continue;
        } else if (guesses.includes(entry)){
            console.log("You've already guessed this letter.\n");
            continue;
        }

        guesses.push(entry);

        // if our guess is not correct -> increase attempts
        if (!picked.includes(entry)){
            console.log("That letter doesn't appear in the word.\n");
            guesses.push(entry);
            attempts++;
        }

        // check if all chars have been found
        if (getMask(picked, guesses) === picked) {
            console.log(picked);
            console.log(`You guessed the word ${picked}!`);
            console.log("You survived!");
            score.win_count++;
            return;
        }

        // attempts at 8 with no win -> lose
        if (attempts === 8){
            console.log("You lost!");
            score.lose_count++;
            return;
        }

    }
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