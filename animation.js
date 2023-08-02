/*-------------------------------- slider animation */
let currentSlide = 0;
let timerBox;
function slide(direction) {
  clearInterval(timerBox);
  const slide = document.querySelector(".title__slider__slide");
  if (slide) {
    currentSlide = direction
      ? (currentSlide + 1) % 4
      : (currentSlide - 1 + 4) % 4;
    slide.style.transform = `translateX(-${currentSlide * 25}%)`;
    startTime();
  }
}
function startTime() {
  timerBox = setInterval(() => {
    slide(true);
  }, 4000);
}
startTime();
/* -------------------------------------menuNavbar */
function menuSlide() {
  const navBar = document.querySelector(".menu__nav__list");
  if (window.innerWidth < 800) {
    navBar.classList.toggle("menuIn");
  }
}
/* -----------------------------------menu sticky animation */
window.addEventListener("scroll", () => {
  var scrollPosition = window.scrollY;
  const menu = document.querySelector(".menu");
  if (scrollPosition > 50) {
    menu.classList.add("stickyStyle");
  } else {
    menu.classList.remove("stickyStyle");
  }
});

