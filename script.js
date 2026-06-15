const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox.querySelector("img");
const lightboxClose = lightbox.querySelector("button");

toggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }
});

document.querySelectorAll("[data-lightbox]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    lightboxImage.src = link.href;
    lightboxImage.alt = link.querySelector("img").alt;
    lightbox.hidden = false;
  });
});

const closeLightbox = () => {
  lightbox.hidden = true;
  lightboxImage.removeAttribute("src");
};

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !lightbox.hidden) {
    closeLightbox();
  }
});

document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const images = Array.from(carousel.querySelectorAll(".carousel-track img"));
  const dots = carousel.querySelector(".carousel-dots");
  let index = 0;

  if (images.length < 2 || !dots) return;

  images.forEach((_, dotIndex) => {
    const dot = document.createElement("span");
    if (dotIndex === 0) dot.classList.add("active");
    dots.appendChild(dot);
  });

  const dotItems = Array.from(dots.children);
  const show = (nextIndex) => {
    images[index].classList.remove("active");
    dotItems[index].classList.remove("active");
    index = nextIndex;
    images[index].classList.add("active");
    dotItems[index].classList.add("active");
  };

  window.setInterval(() => {
    show((index + 1) % images.length);
  }, 3600);
});
