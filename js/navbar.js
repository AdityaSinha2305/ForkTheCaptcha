document.addEventListener('DOMContentLoaded', function () {
  const menuIcon = document.querySelector('.menu-icon');
  const navLinks = document.querySelector('.nav-links');

  if (!menuIcon || !navLinks) return;

  menuIcon.addEventListener('click', function () {
    navLinks.classList.toggle('show');
  });

  // Close menu after clicking a link on small screens
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (navLinks.classList.contains('show')) {
        navLinks.classList.remove('show');
      }
    });
  });
});

