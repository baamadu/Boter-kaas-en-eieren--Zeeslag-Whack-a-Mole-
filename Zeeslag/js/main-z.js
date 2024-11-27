// Alle boten ophalen
const boten = document.querySelectorAll('.bootje, .bootje2');
const vakken = document.querySelectorAll('.box');

// Voeg event listeners toe voor drag en drop
boten.forEach(boot => {
  boot.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('boot', boot.id); // Sla het boot id op bij het slepen
  });
});

vakken.forEach(vak => {
  vak.addEventListener('dragover', (event) => {
    event.preventDefault();  // Zorg ervoor dat we kunnen 'dropen' in het vak
  });

  vak.addEventListener('drop', (event) => {
    event.preventDefault();
    const bootId = event.dataTransfer.getData('boot'); // Verkrijg het boot id
    const boot = document.getElementById(bootId);

    // Controleer of de boot in de juiste vakken kan vallen
    const vakIndex = Array.from(vakken).indexOf(vak);
    placeBootInGrid(boot, vakIndex);
  });
});

function placeBootInGrid(boot, vakIndex) {
  const bootType = boot.classList.contains('bootje') ? 1 : 2; // Om de type boot te onderscheiden

  // Logica om de boot te plaatsen op het grid (bijvoorbeeld 2x2, 1x2, etc.)
  if (bootType === 1) { // 2x2 boot
    const vakkenInRij = 5; // Er zijn 5 vakken per rij
    const row = Math.floor(vakIndex / vakkenInRij);
    const col = vakIndex % vakkenInRij;

    // Zoek de vier vakken die de boot inneemt en voeg de boot erin
    const vakkenIngebruik = [
      vakIndex, vakIndex + 1, vakIndex + vakkenInRij, vakIndex + vakkenInRij + 1
    ];

    // Zorg ervoor dat de boten niet buiten de grid vallen
    if (vakkenIngebruik.every(i => i < vakken.length)) {
      vakkenIngebruik.forEach(i => {
        vakken[i].appendChild(boot);
      });
    }
  } else if (bootType === 2) { // 1x2 boot
    const row = Math.floor(vakIndex / 5); // Zelfde logica voor andere boten
    vakken[vakIndex].appendChild(boot);
  } else { // 1x1 boot
    vakken[vakIndex].appendChild(boot);
  }
}
