// Crystal Game
// The player will have to guess the answer, 
// just like in Word Guess. This time, though, 
// the player will guess with numbers instead of letters.

// Instructions
// There will be four crystals displayed as buttons on the page.
// 		-- created 4 cystals
// The player will be shown a random number at the start of the game.
// 		-- created random number generator from 100 - 1,000
// When the player clicks on a crystal, it will add a specific amount of points to the player's total score.
// 		-- add points to the players score, by clicking the gem
// Your game will hide this amount until the player clicks a crystal.
// 		-- Only show amount after the click
// When they do click one, update the player's score counter.
// 		-- update the players score counter, after click
// The player wins if their total score matches the random number from the beginning of the game.
// 		-- player wins if their score matches the random number
// The player loses if their score goes above the random number.
// 		-- the player looses if their score goes above the random number
// The game restarts whenever the player wins or loses.
// 		-- restart the game after they win or lose
// When the game begins again, the player should see a new random number. Also, all the crystals will have four new hidden values. Of course, the user's score (and score counter) will reset to zero.
// 		-- reinitialse the game with new numbers, set game mode to zero
// The app should show the number of games the player wins and loses. To that end, do not refresh the page as a means to restart the game.
// 		-- show game score wins and losses.

// delcare global variables
var userGuess;
var totalScore = 0;
var compuGenNumb;
var crystalNumb;
var wins = 0;
var loss = 0;
var gems = [];

// function on load call intialise game
window.onload = function() {

    initialiseGame();
}

// function generate random number each game
function randomGenerator() {
    compuGenNumb = 0;
    compuGenNumb = (Math.round(Math.random() * 100));
    displayGuessNumber();
}

// function to display computer guess
function displayGuessNumber() {
    $("#computerNumber").html(compuGenNumb);
}

// function gem number generater 
function randomGemNumbers() {
    var gemOneNumb = (Math.round((Math.random() * 5) + 1)); // range to 1 - 5
    console.log(gemOneNumb);
    gems.push(gemOneNumb); // push to gems array

    var gemTwoNumb = (Math.round((Math.random() * 5) + 10)); // range to 10 - 15
    console.log(gemTwoNumb);
    gems.push(gemTwoNumb); // push to gems array

    var gemThreeNumb = (Math.round((Math.random() * 5) + 20)); // range to 20 - 15
    console.log(gemThreeNumb);
    gems.push(gemThreeNumb); // push to gems array

    var gemFourNumb = (Math.round((compuGenNumb / 3))); // generated numb / 3
    console.log(gemFourNumb);
    gems.push(gemFourNumb); // push to gems array

    shuffleGems(gems);
}

// function to randomise Gems and order to 
function shuffleGems(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle
    while (0 !== currentIndex) {

        // Pick a remaining element
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    console.log(gems + " - random order");
}

// function listen to cystal click event
function crystalOnClick() {
    $("#gem-01").on("click", function() {
        userGuess = gems[0];
        addUserScore(userGuess);
    });
    $("#gem-02").on("click", function() {
        userGuess = gems[1];
        addUserScore(userGuess);
    });
    $("#gem-03").on("click", function() {
        userGuess = gems[2];
        addUserScore(userGuess);
    });
    $("#gem-04").on("click", function() {
        userGuess = gems[3];
        addUserScore(userGuess);
    });
}

// function add user score
function addUserScore(guess) {
    totalScore = totalScore + guess;
    $("#userNumber").text(totalScore);
    gameStatus();
}

// function game status - win & lose
function gameStatus() {
    if (totalScore === compuGenNumb) {
        console.log("winner");
        wins += 1
        initialiseGame();
    } else if (totalScore > compuGenNumb) {
        console.log("loser!");
        loss += 1
        initialiseGame();
    }

    $("#wins").html("Wins: " + wins);
    $("#loss").html("Loss: " + loss);
}

// intitalise the game setup
function initialiseGame() {

    // set user text to zero
    $("#userNumber").text("0");
    compuGenNumb = 0;
    $("#computerNumber").html("");

    // call function
    randomGenerator();
    randomGemNumbers();
    crystalOnClick();
    gameStatus();
}