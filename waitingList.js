
  document.addEventListener('DOMContentLoaded', function () {
    const showBtn = document.getElementById('showAppointmentBtn');
    const appointmentCard = document.getElementById('appointmentCard');

    // ➤ 1. Intersection Observer pour l'animation au scroll
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          appointmentCard.classList.add('visible');
          observer.unobserve(appointmentCard); // ne plus observer après animation
        }
      });
    }, {
      threshold: 0.2 // au moins 20% visible
    });

    observer.observe(appointmentCard);

    // ➤ 2. Animation quand on clique sur le bouton
    showBtn.addEventListener('click', () => {
      appointmentCard.classList.add('visible'); // assure qu'elle est visible
      appointmentCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

