
function superSecret() {
  // What are you doing looking at my code ???! 
  // It's fine... I'm not angry, just disappointed... 
  // I always kinda knew you specifically were going to see this so it's no surprise

}


//This is the array of image file names representing my cards
var arrayImages = [ "Card01.png", "Card02.png", "Card03.png", "Card04.png", "Card05.png", "Card06.png", "Card07.png", "Card08.png", "Card09.png", "Card10.png", "Card11.png", "Card12.png", "Card13.png", "Card14.png", "Card15.png" ];
//I am duplicating my array to create a total set of cards concatenating it with itself
var totalCards = arrayImages.concat(arrayImages.slice());


//SHUFFLE THE CARDS
function shuffleCards() {
  var outcome;  // I have declared a variable 'outcome' to store the shuffled cards
  outcome = totalCards.sort(function() {   // // I'll use the sort method with a randomizing function to shuffle the cards
    return 0.5 - Math.random();  // The random function ensures that cards will be shuffled randoml
  });
  return outcome; // Return the shuffled array of cards
}

//DISTRIBUTES THE CARDS ON THE TABLE
function dealCards() { 
  var table = document.querySelector("#table");  //Get the HTML element with the ID 'table'
  table.innerHTML = ""; //Clean the content of the table to start with a clean slate
  var shuffledCards = shuffleCards();  //Shuffle the deck and store the result in the 'shuffledCards' var
  shuffledCards.forEach(function (e) {  //Go through each card in the deck
    var card = document.createElement("div");  //Create a new div element representing the card
    card.classList.add("card");  //Add the 'card' class to each card
    card.innerHTML =  //Set the inner HTML of the card)
      "<div class='contentCard'>" +
      "<img src='css/cards/" + e + "' />" +
      "</div>";
    table.appendChild(card);  //Append the card div to the table, making it visible in the UI
  });
//Add a click event listener to each card on the table, which triggers the revealCard function when clicked
  document.querySelectorAll(".card").forEach(function (card) {
    card.addEventListener("click", revealCard);
  });
}

//REVEALS THE CARDS ON CLICK
function revealCard() {
  var revealed;  // Declare a variable 'revealed' to keep track of the currently uncovered cards
  var totalUncovered = document.querySelectorAll(".uncoverCard:not(.correct"); // elements with the class 'uncoverCard' that are not marked as 'correct'

  if (totalUncovered.length > 1) {  // Check if there are more than one uncovered card
    return;    // If true, return and do nothing to prevent uncovering more than two cards simultaneously
  }

  this.classList.add("uncoverCard");  // Add the 'uncoverCard' class to the current card, marking it as uncovered.
  playCardRevealSound();  // Play a sound effect to indicate the uncovering of the card

  revealed = document.querySelectorAll(".uncoverCard:not(.correct"); // Update the 'revealed' variable with all uncovered cards that are not marked as 'correct'
  if (revealed.length < 2) {   // Check if the number of currently revealed cards is less than 2
    return;  // If true, return and do nothing
  }
compareCards(revealed);  // Call the 'compareCards' function to compare the currently revealed cards when two cards are uncovered
}

//COMPARES THE TWO REVEALED CARDS TO CHECK IF THEY MATCH
function compareCards(cardsToCompare) { 
  var imageSource1 = cardsToCompare[0].querySelector(".card img").src;  // Get the image source of the first card in the pair
  var imageSource2 = cardsToCompare[1].querySelector(".card img").src;  // Get the image source of the second card in the pair

  if (imageSource1 === imageSource2) {   // Check if the image sources of the two cards match
    correct(cardsToCompare);  // If the image sources match, call the 'correct' function to handle the correct match
  } else {
    incorrect(cardsToCompare);  // If the image sources do not match, call the 'incorrect' function to handle the incorrect match
  }
}

//WHAT TO DO IF THE CARDS MATCH
function correct (theCards) {
  theCards.forEach(function(e) {  // Iterate through each card in theCards array
    e.classList.add("correct");  // Adds the 'correct' class to the cards if they match
  });
  setTimeout(function () {  // Need the delay of 500ms there to allow the 'cardRevealSound' run first
    playCorrectSound();
  }, 500);
}

//WHAT TO DO IF THE CARDS DON'T MATCH
function incorrect (theCards) {
  theCards.forEach(function(e) {  // Iterate through each card in theCards array
    setTimeout(function(){  // Without this delay, the second clicked card does not turn at all
      e.classList.remove("uncoverCard");
    }, 800);
  });
  setTimeout(function () {  // Need the delay of 1000ms there to allow the 'cardRevealSound' run first
    playIncorrectSound();
  }, 1000); 
}

//THE SOUND EFFECTS
function playCorrectSound() {
  var correctAudio = new Audio('sounds/success.wav');
  correctAudio.play();
}

function playIncorrectSound() {
  var incorrectAudio = new Audio('sounds/seedsShake.wav');
  incorrectAudio.play();
}

function playCardRevealSound() {
  var revealAudio = new Audio('sounds/cardFlip.wav'); 
  revealAudio.play();
}



dealCards();  //With this, my cards are distributed on the table