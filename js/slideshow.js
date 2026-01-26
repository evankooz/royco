// Slideshow functionality
let slideIndex = 1;

function changeSlide(n) {
    showSlide(slideIndex += n);
}

function currentSlide(n) {
    showSlide(slideIndex = n);
}

function showSlide(n) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    
    slides.forEach(slide => slide.style.display = 'none');
    dots.forEach(dot => dot.classList.remove('active'));
    
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].style.display = 'flex';
    }
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].classList.add('active');
    }
}

// Auto advance slides every 5 seconds
function autoSlide() {
    changeSlide(1);
}

// Initialize slideshow on page load
document.addEventListener('DOMContentLoaded', () => {
    showSlide(slideIndex);
    
    const heroSlideshow = document.querySelector('.hero-slideshow');
    if (heroSlideshow) {
        setInterval(autoSlide, 5000);
    }
});
