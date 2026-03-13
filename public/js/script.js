// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('show');
      // Change toggle text based on menu state
      if (navMenu.classList.contains('show')) {
        menuToggle.textContent = '✕';
      } else {
        menuToggle.textContent = '☰';
      }
    });
  }
});