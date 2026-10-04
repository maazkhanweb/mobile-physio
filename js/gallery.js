
document.addEventListener("DOMContentLoaded", () => {
  const filters = document.querySelectorAll(".gallery-filter");
  const items = [...document.querySelectorAll(".gallery-item")];

  const lightbox = document.getElementById("galleryLightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxCaption = document.getElementById("lightboxCaption");

  const closeButton = document.querySelector(".lightbox-close");
  const previousButton = document.querySelector(".lightbox-prev");
  const nextButton = document.querySelector(".lightbox-next");

  if (!lightbox || !lightboxImage || !lightboxCaption) return;

  let visibleItems = [...items];
  let currentIndex = 0;
  let lastFocusedElement = null;

  // FILTER GALLERY
  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      const category = filter.dataset.filter;

      filters.forEach((button) => {
        const isActive = button === filter;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
      });

      items.forEach((item) => {
        const shouldShow =
          category === "all" ||
          item.dataset.category === category;

        item.hidden = !shouldShow;
      });

      visibleItems = items.filter((item) => !item.hidden);
    });
  });

  // OPEN IMAGE
  function openLightbox(item) {
    visibleItems = items.filter((element) => !element.hidden);
    currentIndex = visibleItems.indexOf(item);

    if (currentIndex < 0) return;

    lastFocusedElement = document.activeElement;
    showImage(currentIndex);

    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeButton.focus();
  }

  // DISPLAY IMAGE
  function showImage(index) {
    if (!visibleItems.length) return;

    currentIndex =
      (index + visibleItems.length) % visibleItems.length;

    const item = visibleItems[currentIndex];
    const image = item.querySelector("img");

    lightboxImage.src = item.dataset.image || image.src;
    lightboxImage.alt = image.alt;

    lightboxCaption.textContent =
      item.dataset.title || image.alt;
  }

  // CLOSE IMAGE
  function closeLightbox() {
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.removeAttribute("src");
    document.body.style.overflow = "";

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  // GALLERY CLICK
  items.forEach((item) => {
    item.addEventListener("click", () => {
      openLightbox(item);
    });
  });

  closeButton.addEventListener("click", closeLightbox);

  previousButton.addEventListener("click", () => {
    showImage(currentIndex - 1);
  });

  nextButton.addEventListener("click", () => {
    showImage(currentIndex + 1);
  });

  // CLOSE ON BACKGROUND CLICK
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  // KEYBOARD CONTROLS
  document.addEventListener("keydown", (event) => {
    if (lightbox.getAttribute("aria-hidden") === "true") return;

    if (event.key === "Escape") {
      closeLightbox();
    } else if (event.key === "ArrowLeft") {
      showImage(currentIndex - 1);
    } else if (event.key === "ArrowRight") {
      showImage(currentIndex + 1);
    }
  });
});