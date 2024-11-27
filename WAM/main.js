const circles = document.querySelectorAll('.circle')

circles.forEach((circle, i) => {
    console.log(`Circle ${i + 1}:`, circle);
});

circles.forEach(function(circle) {
    circle.addEventListener('click', function() {
        if (circle.classList.contains('filled')) {
            console.log('Deze cirkel is al gevuld');
        }
        
        //controleert of er een mol op het veld staat
        if (circle.classList.contains('mole')) {
            console.log('Je hebt de mol geraakt');
        } else {
            console.log('Geen mol in dit veld');
        }

        circle.classList.add('filled');

        if (circle.classList.contains('mole')) {
            console.log('Mol werd geraakt');
        }
        console.log('Veld gevuld!');
    });
});

//functie om een willekeurige hol te kiezen
function getRandomCircle() {
    const randomIndex = math.floor(Math.random()* circles.lenght);
    return circles[randomIndex];    
}













