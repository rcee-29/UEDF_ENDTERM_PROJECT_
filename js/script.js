let currentSlideIndex = 0;
let slides;
let dots;
let autoSlideTimer;
 
document.addEventListener("DOMContentLoaded", function () {
  slides = document.querySelectorAll(".slide");
  dots = document.querySelectorAll(".dot");
 
  if (slides.length > 0) {
    startAutoSlide();
  }
});
 
function showSlide(index) {
  slides.forEach(function (slide) {
    slide.classList.remove("active");
  });
  dots.forEach(function (dot) {
    dot.classList.remove("active");
  });
 
  slides[index].classList.add("active");
  dots[index].classList.add("active");
  currentSlideIndex = index;
}
 
function nextSlide() {
  let newIndex = (currentSlideIndex + 1) % slides.length;
  showSlide(newIndex);
  restartAutoSlide();
}
 
function prevSlide() {
  let newIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
  showSlide(newIndex);
  restartAutoSlide();
}
 
function goToSlide(index) {
  showSlide(index);
  restartAutoSlide();
}
 
function startAutoSlide() {
  autoSlideTimer = setInterval(nextSlide, 5000);
}
 
function restartAutoSlide() {
  clearInterval(autoSlideTimer);
  startAutoSlide();
}