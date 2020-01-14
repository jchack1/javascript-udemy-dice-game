/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


// ---------defining variables and functions --------------------------//


var scores, roundScore, activePlayer, gamePlaying, previousRoll, currentRoll, scoreInput;

function initial(){
    scores = [0,0]
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    scoreInput = 100;
    document.querySelector(".dice").style.display = "none";
    //this changes the dice to display none, so when we open the game we don't see the dice yet
    
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";

    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");

    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");

    return;
}

function nextPlayer(){
    //next player, change active player
        //this changes the player, sets round score to 0
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;

        //this updates the screen to zero for both players
        document.getElementById("current-0").textContent = "0";
        document.getElementById("current-1").textContent = "0";

        //this switches which panel has active class, just basically switching to the opposite. this works because in the html one starts out as active and one does not have active, so they will always be different
        document.querySelector(".player-0-panel").classList.toggle("active");
        document.querySelector(".player-1-panel").classList.toggle("active");

        // document.querySelector(".dice").style.display = "none";
        
}

function getInputValue(){
    scoreInput = document.getElementById("score-to-win").value;
    return scoreInput;
}


//for dice, need to calulate random number

// dice = Math.floor(Math.random() * 6) + 1;
//needs plus 1 because otherwise it gives you a number between 0 and 5

//next, DOM manipulation
//document object gives us access to the DOM

// document.querySelector("#current-" + activePlayer).textContent = dice;
//querySelector most useful because you can select stuff the way you can in CSS, but only selects the first thing it finds, though there is a solution for that which we will see later

// document.querySelector("#current-" + activePlayer).innerHTML = "<em>" + dice + "</em>"; inner HTML is different than text.Content. if you put this into text content you would get <em> literally written on the screen

//can also use for reading. the below will log the text inside of score-0 to the console. called a "getter" because we get a value. above it's called a "setter" because we are setting a value
// var x = document.querySelector("#score-0").textContent;
// console.log(x);


initial();

document.querySelector(".btn-roll").addEventListener("click", function(){
    if (gamePlaying){
       //1. need random number, only need this when someone clicks
        var dice = Math.floor(Math.random() * 6) + 1;
        currentRoll = dice;

        //2. display the result
        var diceDOM =  document.querySelector(".dice");
        diceDOM.style.display = "block";
        diceDOM.src = "dice-" + dice + ".png";

        //3.update the round score IF the rolled number was not a 1
        if(dice !== 1 && (currentRoll !== 6 || previousRoll !== 6)){
            //add score
            roundScore += dice;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
            previousRoll = currentRoll;
            currentRoll = 0;

        }else if(currentRoll === 6 && previousRoll === 6){
            roundScore = 0;
            scores[activePlayer] = 0;
            document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
            nextPlayer();
        }
        else{
            nextPlayer(); 
        } 
    }
    
});


//my code, above I am using his
// roundScore = 0;

        // document.querySelector("#current-" + activePlayer).textContent = roundScore;

        // document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");

        // activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

        // document.querySelector(".player-" + activePlayer + "-panel").classList.add("active");

document.querySelector(".btn-hold").addEventListener("click", function(){
    if(gamePlaying){
        scores[activePlayer] += roundScore;
        
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
        
        
        //check if player won the game
        if (scores[activePlayer] >= scoreInput){
            document.querySelector("#name-" + activePlayer).textContent = "Winner!";
            document.querySelector(".dice").style.display = "none";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            gamePlaying = false;
        } else{
            nextPlayer();
        }  
    }
    
})

document.querySelector(".btn-new").addEventListener("click", initial)