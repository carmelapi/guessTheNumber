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

let $gifWrap = document.getElementById("winningGiphy");

// logical
function generateRandomNumber() {
  let result = [];
  let poolOfElement = [];
  // create a set of unique elements
  for (let i = 0; i <= 9; i++) {
    poolOfElement.push(i);
  }
  // 4 times: generate an index from the pool set
  for (let i = 0; i < 4; i++) {
    let randomIndex = Math.floor(Math.random() * poolOfElement.length);
    let randomElement = poolOfElement[randomIndex];
    result.push(randomElement);
    poolOfElement.splice(randomIndex, 1);
  }
  return result;
}

//function
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
        // input style became green
        $guessInputEl[j].classList.add("input--green");
        // input style became orange
      } else if (guessNumbers[j] === inputEl[i]) {
        orangeCounter += 1;
        $guessInputEl[i].classList.add("input--orange");
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
    generateGif();
    renderMessage("You win!");
    $gifWrap.classList.add("giphy--display");
  }
}
// reset values
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

// create a random gif (taken from google)
function generateGif() {
  // Initiate gifLoop for set interval
  let refresh;
  // Duration count in seconds
  const duration = 10000; // 1000 ms * 10

  // Giphy API defaults
  const giphy = {
    baseURL: "https://api.giphy.com/v1/gifs/",
    apiKey: "0UTRbFtkMxAplrohufYco5IY74U8hOes",
    tag: "victory",
    type: "random",
    rating: "pg-13",
  };

  // Giphy API URL
  let giphyURL = encodeURI(
    giphy.baseURL +
      giphy.type +
      "?api_key=" +
      giphy.apiKey +
      "&tag=" +
      giphy.tag +
      "&rating=" +
      giphy.rating
  );

  // Function to make a GET request using fetch
  const getGif = () => {
    fetch(giphyURL)
      .then((response) => response.json())
      .then((data) => renderGif(data.data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  // Display Gif in gif wrap container
  let renderGif = (_giphy) => {
    console.log(_giphy);
    // Set gif as bg image
    $gifWrap.style.backgroundImage =
      'url("' + _giphy.images.original.url + '")';
  };

  // Call Giphy API for new gif
  getGif();
}
