document.addEventListener('DOMContentLoaded', function () {
  // --- Intersection Observer for Service Card Animations --- //
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2 // %20 görünürlükte tetikle
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Gözlemlenecek elemanları ayarla
  const elementsToAnimate = document.querySelectorAll('.hizmet-kart, .hizmet-kart-img');
  elementsToAnimate.forEach(element => {
    observer.observe(element);
  });
});

