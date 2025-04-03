// Game variables
let lives = 3;
let score = 0;
let correctColor = "";

// Get references to DOM elements
const rgbDisplay = document.querySelector(".rgb-display");
const optionsContainer = document.getElementById("options");
const feedback = document.getElementById("feedback");
const livesDisplay = document.getElementById("lives");
const scoreDisplay = document.getElementById("score");
const restartButton = document.getElementById("restart");

// Function to generate a random RGB color
function generateRandomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Function to start a new round
function newRound() {
    optionsContainer.innerHTML = ""; // Clear previous options
    feedback.textContent = ""; // Clear feedback

    // Generates correct color
    correctColor = generateRandomColor();
    rgbDisplay.textContent = correctColor.toUpperCase();

    // Creates an array of color options
    let colors = [correctColor];

    // Generates two random wrong colors
    while (colors.length < 3) {
        let newColor = generateRandomColor();
        if (!colors.includes(newColor)) {
            colors.push(newColor);
        }
    }

    // Shuffles the options array
    colors.sort(() => Math.random() - 0.5);

    // Creates color options and add to DOM
    colors.forEach(color => {
        const colorDiv = document.createElement("div");
        colorDiv.classList.add("color-option");
        colorDiv.style.backgroundColor = color;
        colorDiv.addEventListener("click", () => checkAnswer(color));
        optionsContainer.appendChild(colorDiv);
    });
}

// Function to check the user's answer
function checkAnswer(selectedColor) {
    if (selectedColor === correctColor) {
        feedback.textContent = "Correct!";
        feedback.style.color = "green";
        score++;
    } else {
        feedback.textContent = "Incorrect!";
        feedback.style.color = "red";
        lives--;
    }

    // Update lives and score display
    livesDisplay.textContent = lives;
    scoreDisplay.textContent = score;

    // Checks if the game is over
    if (lives > 0) {
        setTimeout(newRound, 1000); // Start a new round after delay
    } else {
        endGame();
    }
}

// Function to handle game over
function endGame() {
    feedback.textContent = `Game Over! Final Score: ${score}`;
    restartButton.classList.remove("hidden");
}

// Function to restart the game
restartButton.addEventListener("click", () => {
    lives = 3;
    score = 0;
    livesDisplay.textContent = lives;
    scoreDisplay.textContent = score;
    restartButton.classList.add("hidden");
    newRound();
});

// Starts the first round when the script loads
newRound();
