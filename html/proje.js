document.addEventListener('DOMContentLoaded', function () {

    // --- Değişken Tanımlamaları ---
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Testimonial Slider Değişkenleri
    const testimonials = document.querySelectorAll('.testimonial');
    const prevButton = document.querySelector('.prev');
    const nextButton =querySelector('.next');
    let currentSlide = 0;

    // --- Scroll Top Butonu ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    // Global scope'a fonksiyonu ekle
    window.scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    
    // Butonun onclick event'ini JS ile ata
    if(scrollTopBtn) {
       scrollTopBtn.onclick = window.scrollToTop;
    }


    // --- Timeline Animasyonu için Intersection Observer ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    timelineItems.forEach(item => {
        observer.observe(item);
    });


    // --- Testimonial (Referans) Slider Fonksiyonları ---
    function showSlide(index) {
        testimonials.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonials.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
        showSlide(currentSlide);
    }

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);
    }
    
    // İlk slaytı göster
    if(testimonials.length > 0) {
       showSlide(currentSlide);
    }

});