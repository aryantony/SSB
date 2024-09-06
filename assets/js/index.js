const carouselCards = document.querySelector('.carousel-sucess-story-people .carousel-cards');
const prevButton = document.querySelector('.carousel-sucess-story-people .prev');
const nextButton = document.querySelector('.carousel-sucess-story-people .next');

let currentIndex = 0;
let visibleCards = 3; // Default visible cards
let cardWidth;

// Function to update the visibleCards based on the viewport width
function updateVisibleCards() {
    const width = window.innerWidth;

    if (width <= 500) {
        visibleCards = 1;
    } else if (width <= 900) {
        visibleCards = 2;
    } else {
        visibleCards = 3;
    }

    // Update cardWidth based on the current visibleCards
    cardWidth = carouselCards.children[0].offsetWidth+20

    // Adjust the starting position of the carousel
    currentIndex = visibleCards;
    carouselCards.style.transform = `translateX(-${cardWidth * currentIndex}px)`;
}

function updateCarousel() {
    const offset = -currentIndex * cardWidth;
    carouselCards.style.transition = 'transform 0.3s ease';
    carouselCards.style.transform = `translateX(${offset}px)`;
}

function checkIndex() {
    const totalCards = carouselCards.children.length / 3; // Adjust for tripled cards

    if (currentIndex < visibleCards) {
        currentIndex = totalCards + currentIndex;
        carouselCards.style.transition = 'none';
        carouselCards.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    } else if (currentIndex >= totalCards * 2 + visibleCards) {
        currentIndex = currentIndex - totalCards;
        carouselCards.style.transition = 'none';
        carouselCards.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
}

// Event listeners for the buttons
prevButton.addEventListener('click', () => {
    console.log("ok")
    currentIndex--;
    updateCarousel();
    setTimeout(checkIndex, 300); 
});

nextButton.addEventListener('click', () => {
    currentIndex++;
    updateCarousel();
    setTimeout(checkIndex, 300);
});

// Update visible cards and initialize the carousel on load
window.addEventListener('load', () => {
    updateVisibleCards();

    // Clone all cards to create a 1-10-1-10-1-10 sequence
    const totalCards = carouselCards.children.length;

    const originalCards = Array.from(carouselCards.children);
    originalCards.forEach(card => carouselCards.appendChild(card.cloneNode(true))); // Clone 1-10
    originalCards.forEach(card => carouselCards.appendChild(card.cloneNode(true))); // Clone 1-10 again
    originalCards.forEach(card => carouselCards.appendChild(card.cloneNode(true)));
    originalCards.forEach(card => carouselCards.appendChild(card.cloneNode(true)));
    originalCards.forEach(card => carouselCards.appendChild(card.cloneNode(true)));
    originalCards.forEach(card => carouselCards.appendChild(card.cloneNode(true)));
    originalCards.forEach(card => carouselCards.appendChild(card.cloneNode(true)));
    originalCards.forEach(card => carouselCards.appendChild(card.cloneNode(true)));
    originalCards.forEach(card => carouselCards.appendChild(card.cloneNode(true)));
    originalCards.forEach(card => carouselCards.appendChild(card.cloneNode(true)));
    originalCards.forEach(card => carouselCards.appendChild(card.cloneNode(true)));
    currentIndex = totalCards; // Set the currentIndex to the first actual item after cloning
    carouselCards.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
});

// Update visible cards on window resize
window.addEventListener('resize', () => {
    updateVisibleCards();
    updateCarousel();
});
updateCarousel();



function countUp(element) {
    const target = +element.getAttribute('data-target');
    const speed = 200; // Lower value for faster counting

    const updateCount = () => {
        const current = +element.innerText;
        const increment = target / speed;

        if (current < target) {
            element.innerText = Math.ceil(current + increment);
            requestAnimationFrame(updateCount);
        } else {
            element.innerText = target;
        }
    };

    updateCount();
}

function handleScroll() {
    const section = document.getElementById('number-changer-achievement');
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight) {
        const numbers = document.querySelectorAll('.number-changer-achievement .number');
        numbers.forEach(number => countUp(number));
        window.removeEventListener('scroll', handleScroll);
    }
}

window.addEventListener('scroll', handleScroll);
