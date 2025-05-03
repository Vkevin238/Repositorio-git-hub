document.addEventListener('DOMContentLoaded', () => {
    // Inicializar AOS para animaciones al hacer scroll
    AOS.init({
      duration: 1200,
      once: true // La animación se ejecuta solo la primera vez
    });
  
    // Toggle para Dark Mode
    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const icon = darkModeToggle.querySelector('i');
      if (document.body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
      } else {
        icon.classList.replace('fa-sun', 'fa-moon');
      }
    });
  
    // Animación de las barras de habilidades usando Intersection Observer
    const progressBars = document.querySelectorAll('.skill-progress');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const progress = bar.getAttribute('data-progress');
          bar.style.transition = 'width 2s ease-in-out';
          bar.style.width = progress + '%';
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
      observer.observe(bar);
    });
  
    // Envío del formulario de contacto mediante AJAX
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(contactForm);
      fetch('/contact', {
        method: 'POST',
        body: formData
      })
      .then(response => {
        if (response.redirected) {
          window.location.href = response.url;
        }
      })
      .catch(error => console.error('Error:', error));
    });
  });
  
  // Menú móvil
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navUl = document.querySelector('nav ul');

mobileMenuToggle.addEventListener('click', () => {
    navUl.classList.toggle('show');
    
    // Cambiar ícono
    const icon = mobileMenuToggle.querySelector('i');
    if (navUl.classList.contains('show')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Cerrar menú al hacer clic en un enlace
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navUl.classList.remove('show');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});