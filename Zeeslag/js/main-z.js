let selectedBoat = null;

document.querySelectorAll(".bootje").forEach((boot) => {
  boot.addEventListener("click", function () {
    if (selectedBoat !== this) {
      selectedBoat = this;
      alert("Boot geselecteerd: " + this.id);
    } else {
      selectedBoat = null;
      alert("Boot gedeselecteerd");
    }
  });
});

document.querySelectorAll(".box").forEach((box) => {
  box.addEventListener("click", function () {
    if (selectedBoat) {
      const bootClone = selectedBoat.cloneNode(true);
      box.innerHTML = "";
      box.appendChild(bootClone);
    } else {
      alert("Selecteer eerst een boot!");
    }
    
  });
});


