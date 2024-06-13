const USERSCORE = document.querySelector(".js-user-score");
const COMPSCORE = document.querySelector(".js-computer-score");
const $APP = document.querySelector("#app");
const HANDS = {
    rock: "./assets/rock-hand.png",
    paper: "./assets/paper-hand.png",
    scissors: "./assets/scissors-hand.png",
}

let scoreUser = 0;
let scoreComp = 0;

/*Generate a random choice*/
function getComputerValue() {
    return ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)];
}

/*It uses the choice of computer and user and then decide who won the game and render the new game button.*/
async function handleGame(userValue) {
    debugger;
    const computerValue = getComputerValue();
    await renderAnimation();
    renderResult(userValue, computerValue);
    const heading = document.createElement("h2");
    heading.innerText = handleWinner(userValue, computerValue);
    $APP.appendChild(heading);
    renderNewGameButton($APP)

}

/*It decides who is the winner. The winner get after every game a point.*/
function handleWinner(user, computer) {
    if (user === computer) return "Equal"
    let result;

    if (user === "rock") {
        result = computer !== "paper"

    } else if (user === "scissors") {
        result = computer !== "rock"
    } else/*user === "paper"*/ {
        result = computer !== "scissors"
    }

    if (result) {
        scoreUser += 1;
        USERSCORE.innerHTML = Number(scoreUser);
        return "Congratulation, you won"

    }
    else {
        scoreComp += 1;
        COMPSCORE.innerHTML = Number(scoreComp);
        return "Sorry, you loose"
    }
}

/*Creates a new game button */
function renderNewGameButton(element) {

    const $btn = document.createElement('button');
    $btn.innerHTML = "New Game";
    $btn.classList = "btn";
    $btn.addEventListener("click", renderGameBoard);

    element.appendChild($btn);

}

/*It displays the choices (rock, paper, or scissors) and, with the click event, gets the user's choice and passes it to the handleGame function. */
function renderGameBoard() {
    const $container = document.createElement('div');
    $container.classList = "container"
    $container.innerHTML = `
    <div class="item">
     <img src="./assets/rock-hand.png" alt="rock" data-value ="rock"  />
    </div>
    <div class="item">
     <img src="./assets/paper-hand.png" alt="paper" data-value="paper" />
    </div>
    <div class="item">
     <img src="./assets/scissors-hand.png" alt="scissors" data-value="scissors" />
    </div>`


    $APP.innerHTML = `<h1> Choose one </h1>`;
    $APP.appendChild($container);
    $container.addEventListener('click', (event) => {
        if (event.target.dataset.value) {
            handleGame(event.target.dataset.value)
        }
    })
}

/*It waits 3 seconds until the animation is done*/
function renderAnimation() {
    $APP.innerHTML = `

    <div class="container">
        <div class="user animation">
         <img src="${HANDS.rock}" alt="rock"  />
        </div>
        <div class="computer animation">
         <img src="${HANDS.rock}" alt="rock"  />
       </div>
    </div>`

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, 3000)

    })
}

/*It displays the two choices at the end*/
function renderResult(userValue, computerValue) {
    let userImg = HANDS[userValue];
    let computerImg = HANDS[computerValue];
    $APP.innerHTML = `

    <div class="container">
        <div class="user">
         <img src="${userImg}" alt="rock"  />
        </div>
        <div class="computer">
         <img src="${computerImg}" alt="rock"  />
       </div>
    </div>
    `;

}

renderNewGameButton($APP);