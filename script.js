// Создание плавающих элементов фона
function createFloatingElements() {
    const container = document.getElementById('floatingContainer');
    const elements = ['🌸', '🌺', '🌷', '🌹', '💕', '✨', '🦋', ''];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(function() {
            const element = document.createElement('div');
            element.className = 'floating-element';
            element.textContent = elements[Math.floor(Math.random() * elements.length)];
            element.style.left = Math.random() * 100 + '%';
            element.style.top = Math.random() * 100 + '%';
            element.style.fontSize = (Math.random() * 20 + 16) + 'px';
            element.style.animationDelay = (Math.random() * 4) + 's';
            container.appendChild(element);
        }, i * 200);
    }
}

// Индикатор прогресса прокрутки
function updateProgressBar() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = scrollPercent + '%';
    }
}

// Определение видимой секции
function updateActiveSection() {
    const sections = document.querySelectorAll('.page-section');
    const scrollPosition = window.pageYOffset + window.innerHeight / 2;
    
    sections.forEach(function(section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            sections.forEach(function(s) {
                s.classList.remove('active');
            });
            section.classList.add('active');
        }
    });
}

// Анимация появления элементов при прокрутке
function animateOnScroll() {
    const cards = document.querySelectorAll('.card');
    const qualityItems = document.querySelectorAll('.quality-item');
    
    cards.forEach(function(card) {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            card.classList.add('visible');
        }
    });
    
    qualityItems.forEach(function(item, index) {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            setTimeout(function() {
                item.classList.add('visible');
            }, index * 150);
        }
    });
}

// Плавная прокрутка к секциям (для навигации если понадобится)
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Инициализация при загрузке
function init() {
    createFloatingElements();
    
    // Обработчик прокрутки
    window.addEventListener('scroll', function() {
        updateProgressBar();
        updateActiveSection();
        animateOnScroll();
    });
    
    // Первичная проверка видимости
    setTimeout(animateOnScroll, 500);
}

// Запуск после загрузки страницы
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
