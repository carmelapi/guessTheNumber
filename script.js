// set variables
let guesses;
let guessNumbers;

let $guesses = document.querySelector("#guesses");
let $guessInputEl = document.querySelectorAll("#numberInput");
let $greenNumber = document.querySelector("#greenCounter");
let $orangeNumber = document.querySelector("#orangeCounter");
let $messageEl = document.querySelector("#messages");
let $formEl = document.querySelector("#guessForm");
let $resetEl = document.querySelector("#resetButton");

// logical
function generateRandomNumber() {
  let result = [];
  let poolOfElement = [];
  // creare un'insieme di elementi unici
  for (let i = 0; i <= 9; i++) {
    poolOfElement.push(i);
  }
  // per 4 volte, generare un indice dall'insieme del pool
  for (let i = 0; i < 4; i++) {
    let randomIndex = Math.floor(Math.random() * poolOfElement.length);
    let randomElement = poolOfElement[randomIndex];
    result.push(randomElement);
    poolOfElement.splice(randomIndex, 1);
  }
  return result;
}

function guessTheNumber(e) {
  e.preventDefault();
  let inputEl = [];
  let greenCounter = 0;
  let orangeCounter = 0;
  // get input from user
  for (let i = 0; i < $guessInputEl.length; ++i) {
    inputEl.push(Number($guessInputEl[i].value));
    $guessInputEl[i].classList.remove("input--green", "input--orange");
  }
  console.log("inputEl", inputEl);
  console.log("guessNumbers", guessNumbers);
  // compare numbers
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (i === j && guessNumbers[j] === inputEl[i]) {
        greenCounter += 1;
        // la classe dell'input diventa verde
        $guessInputEl[j].classList.add("input--green");

        // print on html
      } else if (guessNumbers[j] === inputEl[i]) {
        orangeCounter += 1;
        $guessInputEl[j].classList.add("input--orange");
      }
    }
  }
  $greenNumber.innerHTML = greenCounter;
  $orangeNumber.innerHTML = orangeCounter;

  guesses -= 1;
  $guesses.innerHTML = guesses;
  if (guesses < 0) {
    renderMessage("Game over!");
    reset();
  }
  if (greenCounter === 4) {
    renderMessage("You win");
  }
}

function reset() {
  guesses = 6;
  $guesses.innerHTML = guesses;
  $greenNumber.innerHTML = 0;
  $orangeNumber.innerHTML = 0;

  for (let i = 0; i < $guessInputEl.length; ++i) {
    $guessInputEl[i].value = "";
    $guessInputEl[i].classList.remove("input--orange", "input--green");
  }
  guessNumbers = generateRandomNumber();
  console.log(guessNumbers);
}

function renderMessage(messages) {
  $messageEl.innerHTML = messages;
}

$formEl.addEventListener("submit", guessTheNumber);
$resetEl.addEventListener("click", reset);

for (let i = 0; i < $guessInputEl.length; ++i) {
  $guessInputEl[i].addEventListener("keydown", function (e) {
    if (e.keyCode === 8 || e.keyCode === 46) {
      return false;
    }
    if ($guessInputEl[i].value) {
      e.preventDefault();
    }
  });
}

reset();
