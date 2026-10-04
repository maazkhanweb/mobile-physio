/* ========================================
   MOBILE PHYSIO - SHARED COMPONENTS
   Loads navbar/footer and creates one floating WhatsApp button.
======================================== */

document.addEventListener("DOMContentLoaded", async () => {
  const headerPlaceholder = document.querySelector("#navbar-placeholder");

  // Load shared navbar where a placeholder exists.
  if (headerPlaceholder) {
    try {
      const response = await fetch("components/navbar.html");
      if (!response.ok) throw new Error("Navbar could not be loaded.");

      headerPlaceholder.innerHTML = await response.text();
      initializeNavbar();
    } catch (error) {
      console.error("Navbar loading error:", error);
    }
  } else {
    initializeNavbar();
  }

  // Load the shared footer.
  await loadComponent("footer-placeholder", "components/footer.html");

  // Remove old placeholder content that displayed plain WhatsApp text links.
  const oldWhatsAppPlaceholder = document.querySelector("#whatsapp-placeholder");
  if (oldWhatsAppPlaceholder) oldWhatsAppPlaceholder.replaceChildren();

  // Create a single fixed WhatsApp button on every page.
  addWhatsAppButton();
});

async function loadComponent(placeholderId, filePath) {
  const placeholder = document.getElementById(placeholderId);
  if (!placeholder) return;

  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`Could not load ${filePath}`);

    placeholder.innerHTML = await response.text();

    const year = placeholder.querySelector("#footerYear");
    if (year) year.textContent = new Date().getFullYear();
  } catch (error) {
    console.error("Component loading error:", error);
  }
}

function initializeNavbar() {
  const header = document.querySelector("#siteHeader");
  const menu = document.querySelector("#navMenu");
  const toggle = document.querySelector("#menuToggle");

  if (!header || !menu || !toggle) return;

  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-link").forEach((link) => {
    const isActive = link.dataset.page === currentPage;
    link.classList.toggle("active", isActive);

    if (isActive) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });

  function closeMenu() {
    menu.classList.remove("open");
    toggle.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation menu");
    document.body.classList.remove("menu-open");
  }

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    toggle.classList.toggle("open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
    document.body.classList.toggle("menu-open", isOpen);
  });

  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  document.addEventListener("click", (event) => {
    if (
      menu.classList.contains("open") &&
      !menu.contains(event.target) &&
      !toggle.contains(event.target)
    ) closeMenu();
  });

  function updateHeader() {
    header.classList.toggle("scrolled", window.scrollY > 30);
  }

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();
}

function addWhatsAppButton() {
  // Avoid duplicates if the component script is accidentally included twice.
  if (document.querySelector(".whatsapp-float")) return;

  const button = document.createElement("a");
  button.className = "whatsapp-float";
  button.href = "https://wa.me/923088944136";
  button.target = "_blank";
  button.rel = "noopener noreferrer";
  button.setAttribute("aria-label", "Chat with Mobile Physio on WhatsApp");
  button.setAttribute("title", "Chat with us on WhatsApp");

  // Inline SVG means the icon works even without Font Awesome.
  button.innerHTML = `
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M16.02 3.2A12.7 12.7 0 0 0 5.1 22.38L3.4 28.6l6.37-1.67A12.7 12.7 0 1 0 16.02 3.2Zm0 23.1a10.35 10.35 0 0 1-5.27-1.44l-.38-.22-3.78.99 1.01-3.68-.25-.39a10.36 10.36 0 1 1 8.67 4.74Zm5.68-7.76c-.31-.16-1.83-.9-2.11-1-.28-.1-.49-.16-.7.16-.2.31-.8 1-1 1.2-.18.2-.36.23-.67.08-.31-.16-1.3-.48-2.47-1.52-.92-.82-1.54-1.83-1.72-2.14-.18-.31-.02-.48.14-.64.14-.14.31-.36.47-.54.16-.18.21-.31.31-.52.1-.2.05-.39-.03-.54-.08-.16-.7-1.69-.96-2.31-.25-.6-.51-.52-.7-.53h-.6c-.2 0-.54.08-.82.39-.28.31-1.07 1.05-1.07 2.57s1.1 2.98 1.25 3.19c.15.2 2.16 3.3 5.23 4.63.73.32 1.3.51 1.74.65.73.23 1.4.2 1.92.12.59-.09 1.83-.75 2.09-1.48.26-.72.26-1.34.18-1.47-.08-.13-.28-.21-.59-.36Z"/>
    </svg>
    <span class="whatsapp-tooltip">Chat with us</span>
  `;

  document.body.appendChild(button);
}

/* ========================================
   MOBILE PHYSIO - FLOATING WHATSAPP BUTTON
======================================== */

function addWhatsAppButton() {
  // Prevent duplicate buttons
  if (document.querySelector(".whatsapp-float")) return;

  const button = document.createElement("a");

  button.className = "whatsapp-float";
  button.href = "https://wa.me/923088944136";
  button.target = "_blank";
  button.rel = "noopener noreferrer";
  button.setAttribute("aria-label", "Chat with us on WhatsApp");

  // Inline SVG avoids Font Awesome dependency
  button.innerHTML = `
    <svg
      class="whatsapp-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M16 3.2A12.5 12.5 0 0 0 5.25 22.1L3.5 28.5l6.55-1.72A12.5 12.5 0 1 0 16 3.2Zm0 22.65c-2 0-3.95-.55-5.62-1.6l-.4-.24-3.88 1.02 1.04-3.78-.26-.4A10.1 10.1 0 1 1 16 25.85Zm5.55-7.56c-.3-.15-1.8-.9-2.08-1-.28-.1-.49-.15-.7.15-.2.3-.8 1-.98 1.2-.18.2-.36.23-.66.08-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.8-1.68-2.1-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.64-.93-2.25-.25-.6-.5-.52-.68-.53h-.58c-.2 0-.53.08-.8.38-.28.3-1.06 1.04-1.06 2.53 0 1.5 1.08 2.93 1.23 3.13.15.2 2.13 3.25 5.16 4.56.72.31 1.28.5 1.72.63.72.23 1.38.2 1.9.12.58-.09 1.8-.74 2.06-1.45.25-.72.25-1.33.17-1.46-.07-.13-.27-.2-.57-.35Z"
      />
    </svg>

    <span class="whatsapp-tooltip">Chat with us</span>
  `;

  document.body.appendChild(button);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", addWhatsAppButton);
} else {
  addWhatsAppButton();
}