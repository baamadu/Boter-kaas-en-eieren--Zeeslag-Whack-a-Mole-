let selectedBoat = null;

document.querySelectorAll(".bootje").forEach((boot) => {
  boot.addEventListener("click", function () {
    if (selectedBoat === this) {
      selectedBoat = null;
      this.classList.remove("selected");
      alert("Boot gedeselecteerd");
    } else {
      if (selectedBoat) {
        selectedBoat.classList.remove("selected");
      }
      selectedBoat = this;
      this.classList.add("selected");
      alert("Boot geselecteerd: " + this.id);
    }
  });
});

document.querySelectorAll(".box").forEach((box) => {
  box.addEventListener("click", function () {
    if (selectedBoat) {
      const bootClone = selectedBoat.cloneNode(true);
      box.innerHTML = "";
      box.appendChild(bootClone);
      selectedBoat.classList.remove("selected");
      selectedBoat = null;
    } else {
      alert("Selecteer eerst een boot!");
    }
  });
});