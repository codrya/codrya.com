const menuBtn = document.querySelector('.menu-btn');
const overlay = document.querySelector('.overlay');

menuBtn.addEventListener('click', () => {
  const isOpen = overlay.classList.toggle('active');
  menuBtn.classList.toggle('active');
  document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  menuBtn.setAttribute('aria-expanded', isOpen);
  overlay.setAttribute('aria-hidden', !isOpen);
});

document.querySelectorAll('.nav-list a').forEach(link => {
  link.addEventListener('click', () => {
    overlay.classList.remove('active');
    menuBtn.classList.remove('active');
    document.body.style.overflow = 'auto';
    menuBtn.setAttribute('aria-expanded', false);
    overlay.setAttribute('aria-hidden', true);
  });
});

// --- Animated Title --- //
const animatedTitleElement = document.getElementById('animatedTitle');
if (animatedTitleElement) {
  const titles = [
    'Değer Katan', 'Etki Odaklı', 'Vizyon Sahibi', 'Kurumsal Hafızalı',
    'Değer Odaklı', 'Profesyonel', 'Analiz Tabanlı', 'Planlı ve Etkili',
    'Uzun Vadeli', 'Ses Getiren', 'Stratejik', 'Güvenilir', 'Fark Yaratan',
    'Yeni Nesil', 'Özgün', 'Marka Dostu', 'Hedefe Yönelik', 'Çözüm Sunan',
    'Bütçe Dostu', 'Kreatif', 'İz Bırakan', 'İletişim Odaklı',
    'Markanızı Büyüten', 'Yön Veren', 'Zaman Kazandıran',
  ];
  let currentTitleIndex = 0;
  const typingSpeed = 70;
  const deletingSpeed = 40;
  const pauseBetweenTitles = 500;

  function deleteTitle(callback) {
    let currentText = animatedTitleElement.textContent;
    let i = currentText.length - 1;
    function removeChar() {
      if (i >= 0) {
        animatedTitleElement.textContent = currentText.substring(0, i);
        i--;
        setTimeout(removeChar, deletingSpeed);
      } else if (callback) {
        callback();
      }
    }
    removeChar();
  }

  function typeTitle(title, callback) {
    let i = 0;
    function addChar() {
      if (i < title.length) {
        animatedTitleElement.textContent += title.charAt(i);
        i++;
        setTimeout(addChar, typingSpeed);
      } else if (callback) {
        callback();
      }
    }
    addChar();
  }

  function changeTitle() {
    deleteTitle(() => {
      currentTitleIndex = (currentTitleIndex + 1) % titles.length;
      setTimeout(() => typeTitle(titles[currentTitleIndex], () => setTimeout(changeTitle, pauseBetweenTitles)), pauseBetweenTitles);
    });
  }

  typeTitle(titles[currentTitleIndex], () => {
    currentTitleIndex = (currentTitleIndex + 1) % titles.length;
    setTimeout(changeTitle, pauseBetweenTitles);
  });
}

// --- Carousel 3D --- //
class Carousel3D {
  constructor() {
    this.cards = document.querySelectorAll('.card');
    if (this.cards.length === 0) return;
    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');
    this.dotsContainer = document.getElementById('dotsContainer');
    this.currentIndex = 0;
    this.totalCards = this.cards.length;
    this.isAnimating = false;
    this.positions = ['center', 'right-1', 'right-2', 'right-3', 'hidden', 'left-1', 'left-2', 'left-3'];
    this.init();
  }

  init() {
    this.createDots();
    this.bindEvents();
    this.updateActiveStates();
  }

  createDots() {
    this.dotsContainer.innerHTML = '';
    for (let i = 0; i < this.totalCards; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === this.currentIndex) dot.classList.add('active');
      dot.addEventListener('click', () => this.goToSlide(i));
      this.dotsContainer.appendChild(dot);
    }
  }

  bindEvents() {
    this.prevBtn.addEventListener('click', () => this.prev());
    this.nextBtn.addEventListener('click', () => this.next());
    document.getElementById('prevBtnMobile').addEventListener('click', () => this.prev());
    document.getElementById('nextBtnMobile').addEventListener('click', () => this.next());

    let startX = 0;
    const carousel = document.querySelector('.carousel-wrapper');
    carousel.addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
    carousel.addEventListener('touchend', e => { this.handleSwipe(startX, e.changedTouches[0].clientX); });

    let mouseStartX = 0;
    let isDragging = false;
    carousel.addEventListener('mousedown', e => { mouseStartX = e.clientX; isDragging = true; });
    carousel.addEventListener('mousemove', e => { if (isDragging) e.preventDefault(); });
    carousel.addEventListener('mouseup', e => { if (isDragging) { this.handleSwipe(mouseStartX, e.clientX); isDragging = false; } });

    this.cards.forEach((card, index) => {
      card.addEventListener('click', e => {
        if (!card.classList.contains('center')) {
          e.preventDefault();
          this.goToSlide(index);
        }
      });
    });
  }

  handleSwipe(startX, endX) {
    if (Math.abs(startX - endX) > 50) {
      if (startX - endX > 0) this.next(); else this.prev();
    }
  }

  next() { this.goToSlide((this.currentIndex + 1) % this.totalCards); }
  prev() { this.goToSlide((this.currentIndex - 1 + this.totalCards) % this.totalCards); }

  goToSlide(index) {
    if (this.isAnimating || index === this.currentIndex) return;
    this.currentIndex = index;
    this.updateCarousel();
  }

  updateCarousel() {
    this.isAnimating = true;
    this.cards.forEach((card, index) => {
      this.positions.forEach(pos => card.classList.remove(pos));
      let posIndex = (index - this.currentIndex + this.totalCards) % this.totalCards;
      card.classList.add(this.positions[posIndex]);
    });
    this.updateActiveStates();
    setTimeout(() => { this.isAnimating = false; }, 800);
  }

  updateActiveStates() {
    document.querySelectorAll('.dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentIndex);
    });
  }
}

// --- General Initializations on DOMContentLoaded --- //
document.addEventListener('DOMContentLoaded', function () {
  new Carousel3D();

  // --- WhatsApp Button Animations --- //
  const wpLogo = document.getElementById('wp-logo');
  if (wpLogo) {
    const wpYazi = document.getElementById('wp-yazi');
    const wpOk = document.getElementById('wp-ok');
    setTimeout(() => { wpYazi.classList.remove('gizli'); wpYazi.classList.add('aktif'); }, 2000);
    setTimeout(() => { wpOk.classList.remove('gizli'); wpOk.classList.add('aktif'); }, 2200);
    setTimeout(() => { wpLogo.classList.remove('gizli'); wpLogo.classList.add('aktif'); }, 2700);
  }

  // --- Logo Click --- //
  const logo = document.getElementById('logo');
  if (logo) {
    logo.addEventListener('click', () => { window.location.href = '/'; });
  }

  // --- Particles JS --- //
  if (document.getElementById('particles-js')) {
    particlesJS("particles-js", {
      "particles": {
        "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": "#ffffff" },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.5, "random": false },
        "size": { "value": 5, "random": true },
        "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 },
        "move": { "enable": true, "speed": 6, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
        "modes": { "grab": { "distance": 200, "line_linked": { "opacity": 1 } }, "push": { "particles_nb": 4 } }
      }
    });
  }
});

const head = document.querySelector('.header')
const tPage = document.querySelector('.turuncu-page')
const logoA = document.querySelector('.logoa')
const logoB = document.querySelector('.logob')
const logoC = document.querySelector('.logoc')

function handleScroll() {
  const scrollPos = window.scrollY
  const headHeight = 63
  const tPageTop = tPage.offsetTop
  const tPageBottom = tPageTop + tPage.offsetHeight - 45

  if (scrollPos + headHeight >= tPageTop && scrollPos < tPageBottom) {
    logoA.classList.add('cc-aktifc')
    logoB.classList.add('cc-aktif')
    logoC.classList.add('cc-aktifc')
    menuBtn.classList.add('cc-aktif')
    logoA.classList.remove('cc-pasif')
    logoB.classList.remove('cc-pasif')
    logoC.classList.remove('cc-pasif')
    menuBtn.classList.remove('cc-pasif')
  } else {
    logoA.classList.remove('cc-aktifc')
    logoB.classList.remove('cc-aktif')
    logoC.classList.remove('cc-aktifc')
    menuBtn.classList.remove('cc-aktif')
    logoB.classList.add('cc-pasif')
    menuBtn.classList.add('cc-pasif')
  }
}

window.addEventListener('scroll', handleScroll)


// --- Scroll to Sections --- //
const myInfo = document.querySelector('.carousel-container');
if (myInfo) {
  document.getElementById('Hizmetler1')?.addEventListener('click', () => myInfo.scrollIntoView({ behavior: 'smooth' }));
  document.getElementById('Hizmetler2')?.addEventListener('click', () => myInfo.scrollIntoView({ behavior: 'smooth' }));
  document.getElementById('Hizmetler3')?.addEventListener('click', () => myInfo.scrollIntoView({ behavior: 'smooth' }));
}

// --- WhatsApp Click --- //
const phoneNumbers = ['905456496776', '905393718304', '905537472675'];
function openWhatsApp() {
  const selectedNumber = phoneNumbers[Math.floor(Math.random() * phoneNumbers.length)];
  window.open(`https://wa.me/${selectedNumber}`, '_blank');
}

document.querySelector('.blob-content')?.addEventListener('click', openWhatsApp);
document.querySelector('.btn-v2')?.addEventListener('click', openWhatsApp);



document.addEventListener('DOMContentLoaded', function () {
  const leftElements = document.querySelectorAll(
    '.page-second-one p.animate-from-left'
  )

  const rightElements = document.querySelectorAll(
    '.page-second-two .object.animate-from-right'
  )

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  }

  function handleIntersect(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')       
       entry.target.classList.add('is-visible')

        observer.unobserve(entry.target)
      }
    })
  }

  const observer = new IntersectionObserver(handleIntersect, observerOptions)

  leftElements.forEach((element) => {
    observer.observe(element)
  })

  rightElements.forEach((element) => {
    observer.observe(element)
  })
})