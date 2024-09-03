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
    cardWidth = carouselCards.children[0].offsetWidth + 20; // Including margin

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
    const totalCards = carouselCards.children.length - (visibleCards * 2); // Adjust for cloned cards

    if (currentIndex <= 0) {
        currentIndex = totalCards;
        carouselCards.style.transition = 'none';
        carouselCards.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    } else if (currentIndex >= totalCards + visibleCards) {
        currentIndex = visibleCards;
        carouselCards.style.transition = 'none';
        carouselCards.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
}

// Event listeners for the buttons
prevButton.addEventListener('click', () => {
    currentIndex--;
    updateCarousel();
    setTimeout(checkIndex, 300); // Ensure index is checked after transition
});

nextButton.addEventListener('click', () => {
    currentIndex++;
    updateCarousel();
    setTimeout(checkIndex, 300); // Ensure index is checked after transition
});

// Update visible cards and initialize the carousel on load
window.addEventListener('load', () => {
    updateVisibleCards();

    // Clone the first and last visibleCards for infinite looping
    const totalCards = carouselCards.children.length;

    for (let i = 0; i < visibleCards; i++) {
        const cloneFirst = carouselCards.children[i].cloneNode(true);
        const cloneLast = carouselCards.children[totalCards - 1 - i].cloneNode(true);
        carouselCards.appendChild(cloneFirst);
        carouselCards.insertBefore(cloneLast, carouselCards.firstChild);
    }

    updateCarousel();
});

// Update visible cards on window resize
window.addEventListener('resize', () => {
    updateVisibleCards();
    updateCarousel();
});
