
    document.addEventListener('DOMContentLoaded', () => {
  const visitorCounter = document.getElementById('visitorCount');

  // CountAPI ile ziyaretçi sayısını arttır ve çek
  fetch('https://api.countapi.xyz/hit/harunsanerozden.com/visits')
    .then(res => res.json())
    .then(data => {
      animateCount(visitorCounter, data.value);
    })
    .catch(err => {
      console.error('Ziyaretçi sayacı yüklenemedi', err);
    });

  // Sabit sayılar için animasyon (projeler, ay, kod satırı gibi)
  animateCount(document.getElementById('projectCount'), 14);
  animateCount(document.getElementById('monthsCount'), 1);
  animateCount(document.getElementById('codeLinesCount'), 12000);

  // Sayaç animasyonu fonksiyonu
  function animateCount(element, target) {
    let count = 0;
    const stepTime = Math.max(20, 2000 / target); // Animasyon süresi ayarı
    const timer = setInterval(() => {
      count++;
      element.textContent = count.toLocaleString();
      if (count >= target) clearInterval(timer);
    }, stepTime);
  }
});

    

    document.addEventListener('DOMContentLoaded', function() {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.slider-dot');
        const prevBtn = document.querySelector('.prev-arrow');
        const nextBtn = document.querySelector('.next-arrow');
        let currentSlide = 0;
        const slideCount = slides.length;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slideCount;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slideCount) % slideCount;
            showSlide(currentSlide);
        }

        // Event listeners
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);

        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });

        // Auto slide (optional)
        let slideInterval = setInterval(nextSlide, 5000);

        // Pause on hover
        const slider = document.querySelector('.slider');
        slider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        slider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });
    });
    
  
    window.addEventListener("scroll", function () {
      const header = document.getElementById("mainHeader");
      if (window.scrollY > 100) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  

    const slides = document.querySelectorAll('.slide');
    let current = 0;
    setInterval(() => {
      slides[current].classList.remove('active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('active');
    }, 5000);

    AOS.init({
      duration: 1000,
      once: true
    });

    const counters = document.querySelectorAll(".tech-item");

    counters.forEach(counter => {
      const percent = parseInt(counter.getAttribute("data-percent"));
      const display = counter.querySelector(".percent");
      const fill = counter.querySelector(".fill");
      let current = 0;

      const updateCount = () => {
        if (current <= percent) {
          display.textContent = current + "%";
          fill.style.width = current + "%";
          current++; // <- EKLENEN SATIR
          requestAnimationFrame(updateCount);
        } else {
          display.textContent = percent + "%";
          fill.style.width = percent + "%";
        }
      };

      updateCount();
    });
  

  
    AOS.init({
      once: true,
      easing: 'ease-out-quad'
    });

    // Kartların scroll ile görünür olması
    document.addEventListener('DOMContentLoaded', function () {
      const aiCards = document.querySelectorAll('.ai-card');

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      aiCards.forEach(card => {
        observer.observe(card);
        // Her bir karta farklı gecikme süreleri veriyoruz
        card.style.transitionDelay = `${Math.random() * 0.3}s`;
      });
    });
  
  
    // Sayfa yüklendiğinde efekti tetikle
    document.addEventListener('DOMContentLoaded', function () {
      document.body.classList.add('loaded');

      // Sayfa yenilenme efekti için
      window.addEventListener('beforeunload', function () {
        document.getElementById('refreshOverlay').classList.add('active');
      });
    });


    /* Animation for scroll */
    window.addEventListener('scroll', () => {
      document.querySelectorAll('.item-project').forEach(item => {
        if (item.getBoundingClientRect().top < window.innerHeight - 50) {
          item.classList.add('show');
        }
      });
    });
    document.addEventListener('DOMContentLoaded', function() {
    const galaxy = document.querySelector('.galaxy-rotation');
    const items = document.querySelectorAll('.cosmic-item');
    const totalItems = items.length;
    
    // 3D pozisyonlandırma
    function positionItems() {
        const radius = window.innerWidth < 768 ? 250 : 350;
        
        items.forEach((item, index) => {
            const angle = (Math.PI * 2 / totalItems) * index;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            
            item.style.transform = `translateX(${x}px) translateZ(${z}px) rotateY(${-angle * (180/Math.PI)}deg)`;
        });
    }
    
    // İlk pozisyonlandırma
    positionItems();
    
    // Fare hareketiyle etkileşim
    galaxy.addEventListener('mousemove', (e) => {
        const rect = galaxy.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        galaxy.style.transform = `rotateX(${-y * 0.05}deg) rotateY(${x * 0.1}deg)`;
    });
    
    galaxy.addEventListener('mouseleave', () => {
        galaxy.style.transform = 'rotateX(0) rotateY(0)';
    });
    
    // Dokunmatik kontrol
    let startX = 0;
    let startY = 0;
    let rotateY = 0;
    let rotateX = 0;
    
    galaxy.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        galaxy.style.animationPlayState = 'paused';
    }, {passive: true});
    
    galaxy.addEventListener('touchmove', (e) => {
        const x = e.touches[0].clientX;
        const y = e.touches[0].clientY;
        
        rotateY += (x - startX) * 0.2;
        rotateX += (y - startY) * 0.1;
        
        galaxy.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        
        startX = x;
        startY = y;
    }, {passive: true});
    
    galaxy.addEventListener('touchend', () => {
        galaxy.style.animationPlayState = 'running';
    }, {passive: true});
    
    // Pencere boyutu değiştiğinde yeniden konumlandır
    window.addEventListener('resize', positionItems);
    
    // Parıltı efekti
    setInterval(() => {
        const randomItem = items[Math.floor(Math.random() * items.length)];
        randomItem.classList.add('glow');
        
        setTimeout(() => {
            randomItem.classList.remove('glow');
        }, 1000);
    }, 3000);
});

    /* PARÇACIK OLUŞTURMA */
    function createParticles() {
      const section = document.querySelector('.about-section');
      const particleCount = 30;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Rastgele boyut ve pozisyon
        const size = Math.random() * 5 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const opacity = Math.random() * 0.6 + 0.1;
        const animationDuration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.opacity = opacity;
        particle.style.animation = `float ${animationDuration}s ease-in-out ${delay}s infinite`;

        section.appendChild(particle);
      }
    }
    /* EK GLOW ELEMENTLERİ */
    const glowColors = ['#ff8a00', '#e52e71', '#3a7bd5', '#00d2ff'];
    glowColors.forEach((color, index) => {
      const glow = document.createElement('div');
      glow.classList.add('glow');
      glow.style.background = `radial-gradient(circle, ${color} 0%, transparent 70%)`;
      glow.style.width = `${Math.random() * 200 + 100}px`;
      glow.style.height = glow.style.width;
      glow.style.left = `${Math.random() * 80 + 10}%`;
      glow.style.top = `${Math.random() * 80 + 10}%`;
      glow.style.animationDelay = `${index * 1}s`;
      document.querySelector('.about-section').appendChild(glow);
    });

    // Sayfa yüklendiğinde parçacıkları oluştur
    window.addEventListener('load', createParticles);

    document.addEventListener('DOMContentLoaded', function() {
  const techItems = document.querySelectorAll('.tech-item');
  
  techItems.forEach(item => {
    const percentElement = item.querySelector('.percent');
    const targetPercent = item.getAttribute('data-percent');
    let currentPercent = 0;
    
    const fillElement = item.querySelector('.fill');
    
    // Start animation after a slight delay for stagger effect
    setTimeout(() => {
      const interval = setInterval(() => {
        if (currentPercent >= targetPercent) {
          clearInterval(interval);
        } else {
          currentPercent++;
          percentElement.textContent = currentPercent + '%';
          fillElement.style.width = currentPercent + '%';
        }
      }, 20);
    }, item.dataset.delay || 300);
  });
});
