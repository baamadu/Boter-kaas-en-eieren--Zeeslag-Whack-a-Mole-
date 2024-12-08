const circles = document.querySelectorAll('.circle');
const messageBox = document.getElementById('messageBox');
const scoreDisplay = document.getElementById('scoreDisplay');
let score = 0;

function askName() {
    const name = prompt("Wat is je naam?");
    if (name) {
      alert("Welkom, " + name + "!");
    } else {
      alert("Je hebt geen naam ingevuld");
    }
}
askName();

// Functie om berichten te tonen
function showMessage(message) {
    messageBox.textContent = `${message} Score: ${score}`; // Toon bericht met score
    messageBox.style.display = 'block';
    setTimeout(() => {
        messageBox.style.display = 'none';
    }, 3000);
}

function updateScoreDisplay() {
    scoreDisplay.textContent = `Score: ${score}`;
}

circles.forEach((circle, i) => {
    console.log(`Circle ${i + 1}:`, circle);
});

circles.forEach(function(circle) {
    circle.addEventListener('click', function() {
        if (circle.classList.contains('filled')) {
            console.log('Deze cirkel is al gevuld');
            return;
        }

        // Controleer of er een mol is
        if (circle.classList.contains('mole')) {
            score++;  // Verhoog de score bij het raken van een mol
            showMessage('Je hebt de mol geraakt!');
        } else {
            score--;  // Verlaag de score bij het missen
            showMessage('Geen mol in dit veld!');
        }

        updateScoreDisplay();
        circle.classList.add('filled');

        setTimeout(() => {
            circle.classList.remove('filled');
        }, 1000);
    });
});

function getRandomCircle() {
    const randomIndex = Math.floor(Math.random() * circles.length);
    return circles[randomIndex];
}

// Functie om een mol in een willekeurige cirkel te tonen
function showMole() {
    const randomCircle = getRandomCircle();
    const mole = document.createElement('div');
    mole.classList.add('mole');
    randomCircle.appendChild(mole);

    // Willekeurige tijd voor de mol om te verdwijnen
    const randomTime = Math.floor(Math.random() * 2000) + 1000;

    setTimeout(() => {
        randomCircle.removeChild(mole);  // Verwijder de mol na een tijd
    }, randomTime);
}

setInterval(showMole, Math.floor(Math.random() * 3000) + 2000);
