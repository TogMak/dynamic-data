let slideIndex = 0;
  let slideTimeout;

  // Show a specific slide and update dot active class
  const showSlide = (n) => {
    const slides = document.getElementsByClassName("slide");
    const dots = document.getElementsByClassName("dot");
    if (n > slides.length) { n = 1; }
    if (n < 1) { n = slides.length; }
    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    // Remove active class from all dots
    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.remove("active");
    }
    slides[n - 1].style.display = "block";
    dots[n - 1].classList.add("active");
    slideIndex = n;
  };

  // Auto cycle slides every 4 seconds
  const autoShowSlides = () => {
    slideIndex++;
    const slides = document.getElementsByClassName("slide");
    if (slideIndex > slides.length) { slideIndex = 1; }
    showSlide(slideIndex);
    slideTimeout = setTimeout(autoShowSlides, 4000);
  };

  // Initialize slideshow on DOM content loaded
  document.addEventListener("DOMContentLoaded", () => {
    showSlide(slideIndex = 1);
    slideTimeout = setTimeout(autoShowSlides, 4000);

    // Attach click event to dots
    const dots = document.getElementsByClassName("dot");
    for (let i = 0; i < dots.length; i++) {
      dots[i].addEventListener("click", (e) => {
        // Clear the auto cycle timeout when a dot is clicked
        clearTimeout(slideTimeout);
        const index = parseInt(e.target.getAttribute("data-index"));
        showSlide(index);
        // Restart auto cycle after manual selection
        slideTimeout = setTimeout(autoShowSlides, 4000);
      });
    }
  });