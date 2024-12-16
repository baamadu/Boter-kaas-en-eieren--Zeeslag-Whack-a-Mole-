let selectedBoat = null;
let boot1Count = 0;
let boot2Count = 0;
let boot3Count = 0;
let computerBoot1Count = 0;
let computerBoot2Count = 0;
let computerBoot3Count = 0;
let computerBoatCount = 0;
let playerBoatCount = 0;
let playerTurn = true;
let playerScore = 0;  // Score van de speler
let computerScore = 0;  // Score van de computer
let gameStarted = false; // Vlag die aangeeft of het spel gestart is (na het plaatsen van boten)

const messageBox = document.getElementById("messagebox");
const messageText = document.getElementById("message-text");

function showMessage(msg) {
  messageText.textContent = msg;
  messageBox.classList.add("show");
  setTimeout(() => {
    messageBox.classList.remove("show");
  }, 3000); // Verberg de messagebox na 3 seconden
}

// Selecteer een boot
document.querySelectorAll(".bootje").forEach((boot) => {
  boot.addEventListener("click", function () {
    if (selectedBoat === this) {
      selectedBoat = null;
      this.classList.remove("selected");
      showMessage("Boot gedeselecteerd");
    } else {
      if (selectedBoat) {
        selectedBoat.classList.remove("selected");
      }
      selectedBoat = this;
      this.classList.add("selected");
      showMessage("Boot geselecteerd: " + this.id);
    }
  });
});

// Plaats boten voor de speler
document.querySelectorAll(".box").forEach((box) => {
  box.addEventListener("click", function () {
    if (selectedBoat && playerTurn && !gameStarted) {
      // Controleer de limieten voor het aantal boten
      if (selectedBoat.id === "boot1" && boot1Count >= 2) {
        showMessage("Je kunt maximaal 2 boten van boot 1 plaatsen.");
        return;
      }
      if (selectedBoat.id === "boot2" && boot2Count >= 3) {
        showMessage("Je kunt maximaal 3 boten van boot 2 plaatsen.");
        return;
      }
      if (selectedBoat.id === "boot3" && boot3Count >= 4) {
        showMessage("Je kunt maximaal 4 boten van boot 3 plaatsen.");
        return;
      }

      // Boot plaatsen
      const bootClone = selectedBoat.cloneNode(true);
      box.innerHTML = ""; // Maak het vakje leeg
      box.appendChild(bootClone); // Plaats de geselecteerde boot in het vakje
      selectedBoat.classList.remove("selected");
      selectedBoat = null; // Zet de geselecteerde boot terug naar null

      // Verhoog de teller voor het juiste type boot
      if (bootClone.id === "boot1") {
        boot1Count++;
      } else if (bootClone.id === "boot2") {
        boot2Count++;
      } else if (bootClone.id === "boot3") {
        boot3Count++;
      }

      showMessage("Boot geplaatst!");

      // Controleer of de speler klaar is met plaatsen (max 9 boten in totaal)
      if (boot1Count + boot2Count + boot3Count === 9) {
        showMessage("Alle boten zijn geplaatst. Nu is het de beurt van de computer.");
        playerTurn = false;
        setTimeout(computerTurn, 1000); // Start de computer beurt na 1 seconde vertraging
      }
    } else if (!playerTurn) {
      // Als het de beurt van de computer is, wordt de computer beurt automatisch gestart.
      showMessage("De computer plaatst zijn boten...");
    } else {
      showMessage("Selecteer eerst een boot!");
    }
  });
});

// Computer beurt om boten te plaatsen
function computerTurn() {
  const boxes = document.querySelectorAll(".box1"); 
  const emptyBoxes = Array.from(boxes).filter(box1 => box1.innerHTML === "");

  if (emptyBoxes.length > 0) {
    // Probeer eerst een boot van boot1 te plaatsen (maximaal 2 boten)
    if (computerBoot1Count < 2) {
      placeBoatInRandomBox("boot1", emptyBoxes);
      computerBoot1Count++;
    } 
    // Probeer dan een boot van boot2 te plaatsen (maximaal 3 boten)
    else if (computerBoot2Count < 3) {
      placeBoatInRandomBox("boot2", emptyBoxes);
      computerBoot2Count++;
    }
    // Plaats een boot van boot3 (maximaal 4 boten)
    else if (computerBoot3Count < 4) {
      placeBoatInRandomBox("boot3", emptyBoxes);
      computerBoot3Count++;
    }

    // Als er nog boten zijn om te plaatsen, blijf dan de beurt herhalen
    if (computerBoatCount < 9) {
      setTimeout(() => computerTurn(), 1000); // Wacht 1 seconde voor de volgende beurt
    } else {
      showMessage("Alle computer boten zijn geplaatst. Nu kan je de computer boten vernietigen.");
      gameStarted = true;  // Het spel is nu gestart
      playerTurn = true; // Zet de beurt naar speler
    }
  } else {
    showMessage("Geen lege vakken meer voor de computer om te plaatsen.");
  }
}

// Plaats een boot van het opgegeven type in een willekeurig leeg vak
function placeBoatInRandomBox(bootId, emptyBoxes) {
  const randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
  const computerBoot = document.querySelector(`#${bootId}`); 
  const computerBootClone = computerBoot.cloneNode(true);
  randomBox.innerHTML = ""; 
  randomBox.appendChild(computerBootClone);
  computerBoatCount++;

  showMessage(`De computer heeft een boot van ${bootId} geplaatst!`);
  emptyBoxes.splice(emptyBoxes.indexOf(randomBox), 1); // Verwijder de gebruikte box uit de lijst van lege vakken
}

// Aanval logica (spelers kunnen aanvallen na het plaatsen van boten)
document.querySelectorAll(".box").forEach((box) => {
  box.addEventListener("click", function () {
    if (gameStarted && playerTurn) {
      // De speler probeert een vak van de computer te raken
      if (box.innerHTML.includes("boot") && !box.classList.contains("attacked")) {
        playerScore++;
        showMessage("Je hebt een boot van de computer geraakt! Score: " + playerScore);
        box.innerHTML = "";  // Verwijder de boot van de computer
        box.classList.add("attacked"); // Markeer als aangevallen
      }
      playerTurn = false;
      setTimeout(computerTurnAttack, 1000); // De computer is nu aan de beurt om een vak van de speler aan te vallen
    }
  });
});

// Computer beurt om een vak van de speler aan te vallen
function computerTurnAttack() {
  const boxes = document.querySelectorAll(".box"); 
  const emptyBoxes = Array.from(boxes).filter(box1 => box1.innerHTML === "" || box1.classList.contains("attacked"));

  if (emptyBoxes.length < boxes.length) { // Als er nog vakken over zijn die niet aangevallen zijn
    const randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    if (randomBox.innerHTML.includes("boot") && !randomBox.classList.contains("attacked")) {
      computerScore++;
      showMessage("De computer heeft een boot van jou geraakt! Score van de computer: " + computerScore);
      randomBox.innerHTML = "";  // Verwijder de boot van de speler
      randomBox.classList.add("attacked"); // Markeer als aangevallen
    }
    playerTurn = true;
  }
}
