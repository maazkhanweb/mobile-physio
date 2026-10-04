
document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(".section-reveal");
  const statSection = document.querySelector(".stats-section");
  const statNumbers = document.querySelectorAll(".stat-number");

  // Reveal sections when they enter the viewport
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  }

  // Animate statistics from 1 to their final values
  let countersStarted = false;

  function animateCounter(element) {
    const target = Number(element.dataset.target);
    const suffix = element.dataset.suffix || "";
    const startValue = target > 1 ? 1 : target;
    const duration = 1800;
    const startTime = performance.now();

    // Display the starting value immediately
    element.textContent = startValue + suffix;

    function updateCounter(currentTime) {
      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      );

      // Smooth ease-out counting
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const currentValue = Math.min(
        target,
        startValue +
          Math.floor((target - startValue) * easedProgress)
      );

      element.textContent = currentValue + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target + suffix;
      }
    }

    requestAnimationFrame(updateCounter);
  }

  function startCounters() {
    if (countersStarted) return;

    countersStarted = true;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    statNumbers.forEach((element) => {
      if (reduceMotion) {
        element.textContent =
          element.dataset.target +
          (element.dataset.suffix || "");
      } else {
        animateCounter(element);
      }
    });
  }

  if (statSection && "IntersectionObserver" in window) {
    const statsObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startCounters();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    statsObserver.observe(statSection);
  } else {
    startCounters();
  }
});