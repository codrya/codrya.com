const menuBtn = document.querySelector('.menu-btn')
const overlay = document.querySelector('.overlay')

menuBtn.addEventListener('click', () => {
  const isOpen = overlay.classList.toggle('active')
  menuBtn.classList.toggle('active')

  document.body.style.overflow = isOpen ? 'hidden' : 'auto'

  menuBtn.setAttribute('aria-expanded', isOpen)
  overlay.setAttribute('aria-hidden', !isOpen)
})

document.querySelectorAll('.nav-list a').forEach((link) => {
  link.addEventListener('click', () => {
    overlay.classList.remove('active')
    menuBtn.classList.remove('active')
    document.body.style.overflow = 'auto'
    menuBtn.setAttribute('aria-expanded', false)
    overlay.setAttribute('aria-hidden', true)
  })
})

const titles = [
  'Değer Katan',
  'Etki Odaklı',
  'Vizyon Sahibi',
  'Kurumsal Hafızalı',
  'Değer Odaklı',
  'Profesyonel',
  'Analiz Tabanlı',
  'Planlı ve Etkili',
  'Uzun Vadeli',
  'Ses Getiren',
  'Stratejik',
  'Güvenilir',
  'Fark Yaratan',
  'Yeni Nesil',
  'Özgün',
  'Marka Dostu',
  'Hedefe Yönelik',
  'Çözüm Sunan',
  'Bütçe Dostu',
  'Kreatif',
  'İz Bırakan',
  'İletişim Odaklı',
  'Markanızı Büyüten',
  'Yön Veren',
  'Zaman Kazandıran',
]
let currentTitleIndex = 0
const animatedTitleElement = document.getElementById('animatedTitle')

const typingSpeed = 70 // Her harfin yazılma hızı (milisaniye)
const deletingSpeed = 40 // Her harfin silinme hızı (milisaniye)
const pauseBetweenTitles = 500 // Başlıklar arası bekleme süresi (milisaniye)

// Mevcut başlığı harf harf silme fonksiyonu (backspace efekti)
function deleteTitle(callback) {
  let currentText = animatedTitleElement.textContent
  let i = currentText.length - 1

  function removeChar() {
    if (i >= 0) {
      currentText = currentText.substring(0, i)
      animatedTitleElement.textContent = currentText
      i--
      setTimeout(removeChar, deletingSpeed)
    } else {
      if (callback) callback() // Silme bittiğinde geri çağrıyı çalıştır
    }
  }
  removeChar()
}

// Yeni başlığı harf harf yazma fonksiyonu (typewriter efekti)
function typeTitle(title, callback) {
  let i = 0
  let currentText = ''

  function addChar() {
    if (i < title.length) {
      currentText += title.charAt(i)
      animatedTitleElement.textContent = currentText
      i++
      setTimeout(addChar, typingSpeed)
    } else {
      if (callback) callback() // Yazma bittiğinde geri çağrıyı çalıştır
    }
  }
  addChar()
}

// Başlıkları sırayla değiştiren ana fonksiyon
function changeTitle() {
  const currentTitleText = animatedTitleElement.textContent
  const nextTitle = titles[currentTitleIndex]

  if (currentTitleText.length > 0) {
    // Eğer ekranda bir başlık varsa, önce onu sil
    deleteTitle(() => {
      setTimeout(() => {
        // Silme bittikten sonra kısa bir süre bekle
        typeTitle(nextTitle, () => {
          // Yeni başlığı yaz
          currentTitleIndex = (currentTitleIndex + 1) % titles.length
          setTimeout(changeTitle, pauseBetweenTitles) // Başlık yazıldıktan sonra döngüyü başlat
        })
      }, pauseBetweenTitles) // Silme sonrası bekleme
    })
  } else {
    // Eğer ekranda hiç başlık yoksa (ilk çalıştırma), doğrudan yaz
    typeTitle(nextTitle, () => {
      currentTitleIndex = (currentTitleIndex + 1) % titles.length
      setTimeout(changeTitle, pauseBetweenTitles)
    })
  }
}

// Sayfa yüklendiğinde başlat
document.addEventListener('DOMContentLoaded', () => {
  // İlk başlığı doğrudan yazarak başlat
  typeTitle(titles[currentTitleIndex], () => {
    currentTitleIndex = (currentTitleIndex + 1) % titles.length
    setTimeout(changeTitle, pauseBetweenTitles) // İlk başlık yazıldıktan sonra döngüyü başlat
  })
})
;('use strict')

class Carousel3D {
  constructor() {
    this.cards = document.querySelectorAll('.card')
    this.prevBtn = document.getElementById('prevBtn')
    this.nextBtn = document.getElementById('nextBtn')
    this.dotsContainer = document.getElementById('dotsContainer')
    this.currentIndex = 0
    this.totalCards = this.cards.length
    this.isAnimating = false

    this.positions = [
      'center',
      'right-1',
      'right-2',
      'right-3',
      'hidden',
      'left-1',
      'left-2',
      'left-3',
    ]

    this.init()
  }

  init() {
    this.createDots()
    this.bindEvents()
    this.updateActiveStates()
  }

  createDots() {
    this.dotsContainer.innerHTML = ''
    for (let i = 0; i < this.totalCards; i++) {
      const dot = document.createElement('div')
      dot.classList.add('dot')
      if (i === this.currentIndex) {
        dot.classList.add('active')
      }
      dot.addEventListener('click', () => this.goToSlide(i))
      this.dotsContainer.appendChild(dot)
    }
  }

  bindEvents() {
    this.prevBtn.addEventListener('click', () => this.prev())
    this.nextBtn.addEventListener('click', () => this.next())

    // Mobile button events
    document
      .getElementById('prevBtnMobile')
      .addEventListener('click', () => this.prev())
    document
      .getElementById('nextBtnMobile')
      .addEventListener('click', () => this.next())

    // Touch events for mobile
    let startX = 0
    let endX = 0
    const carousel = document.querySelector('.carousel-wrapper')

    carousel.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX
    })

    carousel.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX
      this.handleSwipe(startX, endX)
    })

    // Mouse events for desktop
    let mouseStartX = 0
    let mouseEndX = 0
    let isDragging = false

    carousel.addEventListener('mousedown', (e) => {
      mouseStartX = e.clientX
      isDragging = true
    })

    carousel.addEventListener('mousemove', (e) => {
      if (!isDragging) return
      e.preventDefault()
    })

    carousel.addEventListener('mouseup', (e) => {
      if (!isDragging) return
      mouseEndX = e.clientX
      this.handleSwipe(mouseStartX, mouseEndX)
      isDragging = false
    })

    // Card click events
    this.cards.forEach((card, index) => {
      card.addEventListener('click', (e) => {
        if (!card.classList.contains('center')) {
          e.preventDefault()
          this.goToSlide(index)
        }
      })
    })
  }

  handleSwipe(startX, endX) {
    const threshold = 50
    const diff = startX - endX

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        this.next()
      } else {
        this.prev()
      }
    }
  }

  next() {
    if (this.isAnimating) return
    this.currentIndex = (this.currentIndex + 1) % this.totalCards
    this.updateCarousel()
  }

  prev() {
    if (this.isAnimating) return
    this.currentIndex =
      (this.currentIndex - 1 + this.totalCards) % this.totalCards
    this.updateCarousel()
  }

  goToSlide(index) {
    if (this.isAnimating || index === this.currentIndex) return
    this.currentIndex = index
    this.updateCarousel()
  }

  updateCarousel() {
    this.isAnimating = true

    this.cards.forEach((card, index) => {
      // Remove all position classes
      this.positions.forEach((pos) => card.classList.remove(pos))

      // Calculate new position
      let positionIndex =
        (index - this.currentIndex + this.totalCards) % this.totalCards
      let positionClass = this.positions[positionIndex]

      // Add new position class
      card.classList.add(positionClass)
      card.dataset.index = index
    })

    this.updateActiveStates()

    // Reset animation lock
    setTimeout(() => {
      this.isAnimating = false
    }, 800)
  }

  updateActiveStates() {
    // Update dots
    document.querySelectorAll('.dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentIndex)
    })
  }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Carousel3D()
})

window.addEventListener('DOMContentLoaded', (event) => {
  const wpLogo = document.getElementById('wp-logo')
  const wpYazi = document.getElementById('wp-yazi')
  const wpOk = document.getElementById('wp-ok')

  setTimeout(() => {
    wpYazi.classList.remove('gizli')
    wpYazi.classList.add('aktif')
  }, 2000)

  setTimeout(() => {
    wpOk.classList.remove('gizli')
    wpOk.classList.add('aktif')
  }, 2200)

  setTimeout(() => {
    wpLogo.classList.remove('gizli')
    wpLogo.classList.add('aktif')
  }, 2700)
})

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

const myInfoScrollBtn1 = document.getElementById('Hizmetler1')
const myInfoScrollBtn2 = document.getElementById('Hizmetler2')
const myInfoScrollBtn3 = document.getElementById('Hizmetler3')
const myInfo = document.querySelector('.carousel-container')

myInfoScrollBtn1.addEventListener('click', () => {
  myInfo.scrollIntoView({
    behavior: 'smooth',
  })
})

myInfoScrollBtn2.addEventListener('click', () => {
  myInfo.scrollIntoView({
    behavior: 'smooth',
  })
})

myInfoScrollBtn3.addEventListener('click', () => {
  myInfo.scrollIntoView({
    behavior: 'smooth',
  })
})

const wp = document.querySelector('.blob-content')
const phoneNumbers = ['905456496776', '905393718304', '905537472675']

wp.addEventListener('click', () => {
  const randomIndex = Math.floor(Math.random() * phoneNumbers.length)
  const selectedNumber = phoneNumbers[randomIndex]
  const whatsappURL = `https://wa.me/${selectedNumber}`

  window.open(whatsappURL, '_blank')
})

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

document.getElementById('logo').addEventListener('click', function () {
  window.location.href = '/'
})

particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle"
    },
    "opacity": {
      "value": 0.5,
      "random": false
    },
    "size": {
      "value": 5,
      "random": true
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab" /* Fare üzerine gelindiğinde etkileşim başlar */
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 200, /* Fare ile parçacıklar arasındaki etkileşim mesafesi */
        "line_linked": {
          "opacity": 1
        }
      },
      "push": {
        "particles_nb": 4
      }
    }
  }
});