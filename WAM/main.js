const circles = document.querySelectorAll('.circle');

// Loop through circles to attach event listeners
circles.forEach((circle, i) => {
    console.log(`Circle ${i + 1}:`, circle);
});

circles.forEach(function(circle) {
    circle.addEventListener('click', function() {
        // Check if the circle is already filled
        if (circle.classList.contains('filled')) {
            console.log('Deze cirkel is al gevuld');
            return; // Prevent further actions
        }

        // Check if a mole is on the field
        if (circle.classList.contains('mole')) {
            console.log('Je hebt de mol geraakt');
        } else {
            console.log('Geen mol in dit veld');
        }

        // Mark the circle as filled
        circle.classList.add('filled');

        // If a mole was hit
        if (circle.classList.contains('mole')) {
            console.log('Mol werd geraakt');
        }
        console.log('Veld gevuld!');
    });
});

// Function to get a random circle
function getRandomCircle() {
    const randomIndex = Math.floor(Math.random() * circles.length);
    return circles[randomIndex];    
}

// Function to show a mole on a random circle
function showMole() {
    const randomCircle = getRandomCircle();
    const mole = document.createElement('div');
    mole.classList.add('mole');
    randomCircle.appendChild(mole);

    // Random timer for the mole to disappear
    const randomTime = Math.floor(Math.random() * 2000) + 1000;

    // Set a timeout for the mole to disappear
    setTimeout(() => {
        randomCircle.removeChild(mole);
    }, randomTime);
}

// Call showMole at random intervals
setInterval(showMole, Math.floor(Math.random() * 3000) + 2000);















