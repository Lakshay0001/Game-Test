const gameContainer = document.getElementById("game-container");
const player = document.getElementById("player");
const scoreDisplay = document.getElementById("score");
const gameOverText = document.getElementById("game-over");

let score = 0;
let gameOver = false;
let playerPositionX = gameContainer.offsetWidth / 2 - player.offsetWidth / 2;
const playerSpeed = 10;

function updatePlayerPosition() {
    player.style.left = `${playerPositionX}px`;
}

function movePlayer(event) {
    if (gameOver) return;
    if (event.key === "ArrowLeft" && playerPositionX > 0) {
        playerPositionX -= playerSpeed;
    }
    if (event.key === "ArrowRight" && playerPositionX < gameContainer.offsetWidth - player.offsetWidth) {
        playerPositionX += playerSpeed;
    }
    updatePlayerPosition();
}

document.addEventListener("keydown", movePlayer);

function generateFallingObject() {
    const object = document.createElement("div");
    object.classList.add("falling-object");
    object.style.left = `${Math.random() * (gameContainer.offsetWidth - 30)}px`;
    gameContainer.appendChild(object);

    let objectPositionY = 0;
    const objectSpeed = Math.random() * 2 + 2; // Random speed for variation
    const objectWidth = 30;
    
    function moveFallingObject() {
        if (gameOver) return;

        objectPositionY += objectSpeed;
        object.style.top = `${objectPositionY}px`;

        // Check collision with the player
        const objectRect = object.getBoundingClientRect();
        const playerRect = player.getBoundingClientRect();

        if (
            objectRect.bottom >= playerRect.top &&
            objectRect.left < playerRect.right &&
            objectRect.right > playerRect.left
        ) {
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
            object.remove(); // Remove the object when caught
        }

        // If the object falls out of the container
        if (objectPositionY > gameContainer.offsetHeight) {
            gameOver = true;
            gameOverText.style.display = "block";
        } else {
            requestAnimationFrame(moveFallingObject);
        }
    }

    moveFallingObject();
}

function startGame() {
    score = 0;
    gameOver = false;
    scoreDisplay.textContent = `Score: ${score}`;
    gameOverText.style.display = "none";

    // Generate new falling object every second
    setInterval(generateFallingObject, 1000);
}

startGame();
