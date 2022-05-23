$(document).ready(() => {
  //var declaration
  let P1 = $(`#P1-name`); // Player 1's name
  let P2 = $(`#P2-name`); // Player 2's name
  let P1Current = $(`#P1-current`); // Player 1's current's score
  let P2Current = $(`#P2-current`); // Player 2's current's score
  let P1Total = $(`#P1-score`); // Player 1 total's score
  let P2Total = $(`#P2-score`); // Player 2 total's score
  // The following 3 variables must be in an Active-Player's object to allow more flexibility
  // They refer to the DOM of the active player
  let current = P1Current;
  let total = P1Total;
  let activePlayer = P1;
  let dice = 1; // Dice's result

  function askName(player, no) { // Ask player no's name
    let name = ``;

    while (name  === ``) {  // As long as the player does not enter anything
      name = prompt(`What's Player ${no}'s name ?`).toUpperCase(); //Ask his name and put it in upper case
    }
    player.html(`${name}&nbsp&nbsp&nbsp`);// Changes the html content of the Player's name tag
  }

  function setActivePlayer(active, unactive) { // Adds the "active" class to the "active" player and removes the "unactive" class. Reverse this for the other
    active.removeClass(`P-name-unactive`).addClass(`P-name-active`);
    unactive.removeClass(`P-name-active`).addClass(`P-name-unactive`);
    return (active);
  }

  function changeActivePlayer(active) { // Switch active player, Returns a reference to the active player
    current.html(`0`); // Set current's score of the old activ player to 0
    if (active === P1) { // If the actual's active player is 1 szitch to player 2
       current = P2Current;
       total = P2Total;
       return setActivePlayer(P2, P1);
     } else { // Else reverse
       current = P1Current;
       total = P1Total;
       return setActivePlayer(P1, P2);
     }
  }

  function changeDiceImg(number) { //load another img for dice
    $(`#dice-img`).attr(`src`, `../images/dice/dice_${number}.png`);// Change src attribute based on number
  }

  function newGame() { // Init a new game
    let startPlayer = Math.random() < 0.5 ? 1 : 2; //Random number (1-2) to define who starts
    // Set all score to 0 (fresh start)
    P1Current.html(`0`);
    P2Current.html(`0`);
    P1Total.html(`0`);
    P2Total.html(`0`);
    // Set P1 as active player
    current = P1Current;
    total = P1Total;
    activePlayer = P1;

    askName(P1, `1`);
    askName(P2, `2`);
    if (startPlayer === 2) { // if the random number is 2 set player 2 as active
      activePlayer = changeActivePlayer(P1);
    }
    dice = 1;
  }

  newGame(); // on page loaded start new game

  $(`#new-game-button`).click(() => { // If new Game's button is clicked start a new game
    newGame();
  });

  $(`#roll-button`).click(() => { //If the player click on roll, get a random number and stock it in current (ROUND)
    dice = Math.floor(Math.random() * (6) + 1); // Random number between 1 to 6
    changeDiceImg(dice);// change dice's sprite based on random number
    if (dice === 1) { // if dice's result is one, set current score to 0 and pass turn
      current.html(`0`);
      activePlayer = changeActivePlayer(activePlayer);
    } else { // Else add dice's result to the current's score
      let currentScore = parseInt(current.html());

      currentScore += dice;
      current.html(currentScore);
    }
  });

  $(`#hold-button`).click(() => {// If the player click on hold, put current(ROUND) value in total (GLOBAL)
    let curTotal = parseInt(total.html());

    curTotal += parseInt(current.html()); // Add curent score + total score
    total.html(curTotal);
    if (curTotal >= 100) { // if score is larger than 100 print a winning message and start a new game
      alert(`${activePlayer.html().substring(0,activePlayer.html().length - 18)} win this game !`);
      newGame();
    }
    activePlayer = changeActivePlayer(activePlayer);// pass turn
  });
});