const circles = document.querySelectorAll('.circle');
const messageBox = document.getElementById('messageBox');
const scoreDisplay = document.getElementById('scoreDisplay');

let score = 0;

// Lijst met verboden woorden die we willen blokkeren
const forbiddenWords = ['shit', 'fuck', 'sigma'];

// Functie om de naam van de speler in te voeren
function askName() {
    // Vraag de naam van de speler
    let name = prompt("Wat is je naam?");
    
    while (name === '' || containsForbiddenWords(name) || containsInvalidCharacters(name)) {
        if (name === '') {
            alert("Je hebt geen naam ingevuld.");
        } else if (containsForbiddenWords(name)) {
            alert("Je naam bevat ongepaste woorden. Probeer het opnieuw.");
        } else if (containsInvalidCharacters(name)) {
            alert("Je naam bevat ongewenste tekens. Alleen letters en spaties zijn toegestaan.");
        }
        // Vraag opnieuw om de naam als die niet geldig is
        name = prompt("Wat is je naam?");
    }

    // Als een geldige naam is ingevoerd, stel deze in
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
    console.log(message);
}

// Functie om de score van de speler bij te werken
function updateScoreDisplay() {
    scoreDisplay.textContent = `${playerName}: Score: ${score}`;
}

circles.forEach(function(circle) {
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
        circle.classList.add('filled');

        setTimeout(() => {
            circle.classList.remove('filled');
        }, 1000);
    });
});

// Functie om een willekeurige cirkel te krijgen
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
        randomCircle.removeChild(mole);
    }, randomTime);
}

setInterval(showMole, Math.floor(Math.random() * 3000) + 2000);

askName();
