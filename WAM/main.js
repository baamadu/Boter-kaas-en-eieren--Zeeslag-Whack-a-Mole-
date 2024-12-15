const circlesContainer = document.querySelector('.speelbord');
const messageBox = document.getElementById('messageBox');
const scoreDisplay = document.getElementById('scoreDisplay');

let score = 0;
let playerName = '';

// Lijst met verboden woorden die we willen blokkeren
const forbiddenWords = ['shit', 'fuck', 'sigma'];

// Functie om de naam van de speler in te voeren
function askName() {
    let name = prompt("Wat is je naam?");
    
    while (name === '' || containsForbiddenWords(name) || containsInvalidCharacters(name)) {
        if (name === '') {
            alert("Je hebt geen naam ingevuld.");
        } else if (containsForbiddenWords(name)) {
            alert("Je naam bevat ongepaste woorden. Probeer het opnieuw.");
        } else if (containsInvalidCharacters(name)) {
            alert("Je naam bevat ongewenste tekens. Alleen letters en spaties zijn toegestaan.");
        }
        name = prompt("Wat is je naam?");
    }

    playerName = name;
    alert("Welkom, " + playerName + "!");
    updateScoreDisplay();
}

// Functie om te controleren of de naam verboden woorden bevat
function containsForbiddenWords(name) {
    const lowerCaseName = name.toLowerCase();
    return forbiddenWords.some(word => lowerCaseName.includes(word));
}

// Functie om te controleren of de naam ongeldige tekens bevat
function containsInvalidCharacters(name) {
    const invalidCharacters = /[^a-zA-Z\s]/;
    return invalidCharacters.test(name);
}

// Functie om een bericht weer te geven in het berichtvak
function showMessage(message) {
    messageBox.textContent = `${message} Score: ${score}`;
    messageBox.style.display = 'block';
    setTimeout(() => {
        messageBox.style.display = 'none';
    }, 3000);
}

// Functie om de score van de speler bij te werken
function updateScoreDisplay() {
    scoreDisplay.textContent = `${playerName}: Score: ${score}`;
}

// Functie om de grootte van het speelbord aan te passen afhankelijk van de score
function updateBoardSize() {
    if (score >= 10) {
        createCircles(6);  // 6x6 bord
    } else if (score >= 8) {
        createCircles(5);  // 5x5 bord
    } else if (score >= 5) {
        createCircles(4);  // 4x4 bord
    }
}

// Functie om cirkels te genereren afhankelijk van het bordformaat
function createCircles(size) {
    circlesContainer.innerHTML = '';  // Leeg het bord voordat we nieuwe cirkels toevoegen

    // Pas de grid aan volgens de grootte
    circlesContainer.style.gridTemplateColumns = `repeat(${size}, 150px)`;
    circlesContainer.style.gridTemplateRows = `repeat(${size}, 150px)`;

    for (let i = 0; i < size * size; i++) {
        const circle = document.createElement('div');
        circle.classList.add('circle');
        circlesContainer.appendChild(circle);

        circle.addEventListener('click', function() {
            if (circle.classList.contains('filled')) {
                console.log('Deze cirkel is al gevuld');
                return;
            }

            const circleChild = circle.firstChild;  // Zoek het kind-element van de cirkel
            if (circleChild && circleChild.classList.contains('mole')) {
                // Als er een mol in de cirkel is, verhoog de score
                score++;
                showMessage('Je hebt de mol geraakt!');
            } else {
                // Als er geen mol in de cirkel is, verlaag de score
                score--;
                showMessage('Geen mol in dit veld!');
            }

            updateScoreDisplay();
            updateBoardSize();  // Pas de grootte van het bord aan op basis van de score

            circle.classList.add('filled');
            setTimeout(() => {
                circle.classList.remove('filled');
            }, 1000);
        });
    }
}

// Functie om een willekeurige cirkel te krijgen
function getRandomCircle() {
    const circles = document.querySelectorAll('.circle');
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
        randomCircle.removeChild(mole);
    }, randomTime);
}

// Start een interval om de mol te laten verschijnen
setInterval(showMole, Math.floor(Math.random() * 3000) + 2000);

// Vraag de naam van de speler
askName();

// Initialiseer het bord met 3x3
createCircles(3);
