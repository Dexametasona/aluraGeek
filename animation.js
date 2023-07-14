/*-------------------------------- slider animation */
let currentSlide = 0;
let timerBox;
function slide(direction) {
  clearInterval(timerBox);
  const slide = document.querySelector(".title__slider__slide");
  if (direction) {
    currentSlide = (currentSlide + 1) % 4;
  } else {
    currentSlide = (currentSlide - 1 + 4) % 4;
  }
  slide.style.transform = `translateX(-${currentSlide}00%)`;
  startTime();
}
function startTime() {
  timerBox = setInterval(() => {
    slide(true);
  }, 4000);
}
startTime();
