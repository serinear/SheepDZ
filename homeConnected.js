
// Scroll animation for objectives section
const objectivesObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, {threshold: 0.15});

// Observe objectives sections
document.querySelectorAll('.objectives, .objectives2').forEach(section => {
  objectivesObserver.observe(section);
});

// Process cards animation
const processObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cards = entry.target.querySelectorAll('.process-card1, .process-card2');
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('show-card');
        }, index * 200);
      });
    }
  });
}, {threshold: 0.1});

// Observe process steps container
const processContainer = document.querySelector('.process-steps');
if (processContainer) {
  processObserver.observe(processContainer);
}

// Smooth scroll to user guide when clicking "See our process"
document.querySelector('.learn-more')?.addEventListener('click', function(e) {
  e.preventDefault();
  const userGuide = document.querySelector('.objectives2');
  
  if (userGuide) {
    // First add show class to prepare for animation
    userGuide.classList.add('show');
    
    // Smooth scroll to section
    userGuide.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    
    // Animate process cards sequentially
    setTimeout(() => {
      const cards = userGuide.querySelectorAll('.process-card1, .process-card2');
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('show-card');
        }, index * 200);
      });
    }, 800);
  }
});
// Configuration
const animationConfig = {
  sections: '.animated-section',
  triggerButton: '.learn-more',
  targetSection: '.objectives2',
  scrollOptions: {
    behavior: 'smooth',
    block: 'start'
  },
  observerOptions: {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px' // Déclenche 50px avant d'atteindre l'élément
  }
};

// Fonction pour réinitialiser les animations
function resetAnimation(element) {
  element.classList.remove('animated');
  void element.offsetWidth; // Déclenche un reflow
}

// Gestionnaire d'intersection
function handleIntersection(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
    } else {
      // Réinitialise seulement si on scroll vers le haut (optionnel)
      if (window.scrollY < entry.boundingClientRect.top) {
        resetAnimation(entry.target);
      }
    }
  });
}

// Initialisation
function initAnimations() {
  const observer = new IntersectionObserver(handleIntersection, animationConfig.observerOptions);
  
  document.querySelectorAll(animationConfig.sections).forEach(section => {
    // Réinitialise au chargement
    resetAnimation(section);
    observer.observe(section);
  });

  // Gestion du clic
  const button = document.querySelector(animationConfig.triggerButton);
  if (button) {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(animationConfig.targetSection);
      if (target) {
        resetAnimation(target);
        target.scrollIntoView(animationConfig.scrollOptions);
      }
    });
  }
}

// Démarrer après chargement complet
window.addEventListener('load', initAnimations);
