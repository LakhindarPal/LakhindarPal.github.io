document.addEventListener('DOMContentLoaded', function() {
  const taglines = [
    "Full-stack Web Developer",
    "Mobile App Creator",
    "Discord Bot Engineer",
    "Web App Innovator"
  ];

  const htmlEl = document.querySelector("html");
  const darkModeButton = document.getElementById("sunMoonIcon");
  const typingText = document.getElementById('tagline-text');
  const hamburger = document.getElementById("hamburger");
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll("nav a");
  let activeLink = null;
  let taglineIndex = 0;

  const currentTheme = () => localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

  function typeTagline() {
    let currentTagline = taglines[taglineIndex];
    let charIndex = 0;

    function type() {
      if (charIndex < currentTagline.length) {
        typingText.textContent += currentTagline.charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
      } else {
        setTimeout(erase, 1500); // Delay before erasing
      }
    }

    function erase() {
      if (charIndex > 0) {
        typingText.textContent = currentTagline.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
      } else {
        taglineIndex = (taglineIndex + 1) % taglines.length;
        currentTagline = taglines[taglineIndex];
        setTimeout(type, 500);
      }
    }

    type(); // Start typing
  }

  typeTagline(); // initiate the typing

  hamburger.addEventListener("click", () => navbar.classList.toggle("responsive"));

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (activeLink) activeLink.classList.remove("active");
      link.classList.add("active");
      activeLink = link;
      navbar.classList.remove("responsive");
    });
  });

  const theme = currentTheme();
  htmlEl.dataset.theme = theme;
  darkModeButton.textContent = (theme === "light") ? "☀︎" : "🌜";

  darkModeButton.addEventListener("click", () => {
    const newTheme = (currentTheme() === "dark") ? "light" : "dark";
    htmlEl.dataset.theme = newTheme;
    localStorage.setItem("theme", newTheme);
    darkModeButton.textContent = (newTheme === "light") ? "☀︎" : "🌜";
  });
});