/* =========================================================
   EARTH MOVING & CONSTRUCTION MATERIALS — SCRIPT
   ========================================================= */

// WhatsApp business number (used for all enquiries)
const WHATSAPP_NUMBER = "919944251427";

/**
 * Opens WhatsApp with a pre-filled, URL-encoded message.
 * @param {string} message - The message to pre-fill in WhatsApp.
 */
function sendWhatsApp(message) {
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
  window.open(url, "_blank", "noopener");
}

/* ============ MOBILE NAVIGATION ============ */
(function initMobileNav() {
  const hamburger = document.getElementById("hamburgerBtn");
  const nav = document.getElementById("mainNav");

  if (!hamburger || !nav) return;

  hamburger.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", String(isOpen));
    hamburger.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  // Close menu when a nav link is clicked (mobile)
  nav.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
      hamburger.setAttribute("aria-label", "Open navigation menu");
    });
  });

  // Close menu on outside click
  document.addEventListener("click", (e) => {
    if (!nav.classList.contains("open")) return;
    if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
      nav.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    }
  });
})();

/* ============ ACTIVE NAV LINK ON SCROLL ============ */
(function initActiveNavLink() {
  const sections = document.querySelectorAll("main section[id], main#home");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { rootMargin: "-40% 0px -50% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
})();

/* ============ SCROLL REVEAL ANIMATIONS ============ */
(function initRevealAnimations() {
  const revealEls = document.querySelectorAll(".reveal");
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => observer.observe(el));
})();

/* ============ EQUIPMENT "ENQUIRE NOW" BUTTONS ============ */
(function initEquipmentEnquiry() {
  document.querySelectorAll(".enquire-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const equipmentName = btn.getAttribute("data-name") || "your equipment";
      const message = `Hello, I am interested in ${equipmentName}. Please share availability and rental details.`;
      sendWhatsApp(message);
    });
  });
})();

/* ============ MATERIAL "GET PRICE" BUTTONS ============ */
(function initMaterialPriceEnquiry() {
  document.querySelectorAll(".price-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const materialName = btn.getAttribute("data-name") || "this material";
      const message = `Hello, I would like to know the price and availability of ${materialName}.`;
      sendWhatsApp(message);
    });
  });
})();

/* ============ CONTACT FORM VALIDATION + WHATSAPP SUBMIT ============ */
(function initEnquiryForm() {
  const form = document.getElementById("enquiryForm");
  if (!form) return;

  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");
  const serviceSelect = document.getElementById("service");
  const equipmentInput = document.getElementById("equipmentMaterial");
  const messageInput = document.getElementById("message");

  const nameError = document.getElementById("nameError");
  const phoneError = document.getElementById("phoneError");
  const serviceError = document.getElementById("serviceError");
  const messageError = document.getElementById("messageError");

  function clearError(input, errorEl) {
    input.classList.remove("invalid");
    errorEl.textContent = "";
  }

  function setError(input, errorEl, msg) {
    input.classList.add("invalid");
    errorEl.textContent = msg;
  }

  function validatePhone(value) {
    // Accepts Indian numbers, optionally with +91, spaces or dashes; 10 digit core number
    const digits = value.replace(/\D/g, "");
    return digits.length >= 10 && digits.length <= 13;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    // Name validation
    if (!nameInput.value.trim()) {
      setError(nameInput, nameError, "Please enter your name.");
      isValid = false;
    } else {
      clearError(nameInput, nameError);
    }

    // Phone validation
    if (!phoneInput.value.trim()) {
      setError(phoneInput, phoneError, "Please enter your phone number.");
      isValid = false;
    } else if (!validatePhone(phoneInput.value)) {
      setError(phoneInput, phoneError, "Please enter a valid phone number.");
      isValid = false;
    } else {
      clearError(phoneInput, phoneError);
    }

    // Service validation
    if (!serviceSelect.value) {
      setError(serviceSelect, serviceError, "Please select a service.");
      isValid = false;
    } else {
      clearError(serviceSelect, serviceError);
    }

    // Message validation
    if (!messageInput.value.trim()) {
      setError(messageInput, messageError, "Please add a short message.");
      isValid = false;
    } else {
      clearError(messageInput, messageError);
    }

    if (!isValid) return;

    // Build WhatsApp message from form data
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const service = serviceSelect.value;
    const equipmentMaterial = equipmentInput.value.trim();
    const message = messageInput.value.trim();

    let waMessage = `Hello, my name is ${name}.\n`;
    waMessage += `Phone: ${phone}\n`;
    waMessage += `Service Required: ${service}\n`;
    if (equipmentMaterial) {
      waMessage += `Equipment / Material: ${equipmentMaterial}\n`;
    }
    waMessage += `Message: ${message}`;

    sendWhatsApp(waMessage);

    // Reset form after opening WhatsApp
    form.reset();
  });

  // Clear individual field errors as the user types/selects
  [nameInput, phoneInput, serviceSelect, messageInput].forEach((input) => {
    const evt = input.tagName === "SELECT" ? "change" : "input";
    input.addEventListener(evt, () => {
      if (input.value.trim()) {
        input.classList.remove("invalid");
        const errorEl = document.getElementById(`${input.id}Error`);
        if (errorEl) errorEl.textContent = "";
      }
    });
  });
})();

/* ============ HEADER SHADOW ON SCROLL ============ */
(function initHeaderScrollEffect() {
  const header = document.getElementById("siteHeader");
  if (!header) return;

  let lastScroll = 0;
  window.addEventListener("scroll", () => {
    const current = window.scrollY;
    header.style.boxShadow = current > 10
      ? "0 4px 16px rgba(11,31,51,0.18)"
      : "0 2px 8px rgba(11,31,51,0.08)";
    lastScroll = current;
  });
})();
