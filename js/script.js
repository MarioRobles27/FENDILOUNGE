


// MAIN JS FENDI LOUNGE

// Aseguramos que GSAP y ScrollTrigger estén cargados
if (typeof gsap !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // ---------------- HERO: animación de entrada general ----------------
  gsap.from(".hero-content", {
    opacity: 0,
    y: 40,
    duration: 1.2,
    ease: "power3.out",
    delay: 0.2
  });

   // ---------------- HERO CARTA: animación épica ----------------
  const cartaHero = document.querySelector(".page-hero--carta");

  if (cartaHero) {
    const titleEl = cartaHero.querySelector(".page-title");
    const subtitleEl = cartaHero.querySelector(".page-subtitle");

    // 1) Split del título en palabras para animarlas una a una
    if (titleEl) {
      const rawText = titleEl.textContent.trim();
      const words = rawText.split(" ");

      titleEl.innerHTML = ""; // vaciamos
      words.forEach((word, idx) => {
        const span = document.createElement("span");
        span.textContent = word;
        span.style.display = "inline-block";
        span.style.marginRight = idx === words.length - 1 ? "0" : "0.35em";
        span.classList.add("carta-title-word");
        titleEl.appendChild(span);
      });
    }

    const tlCarta = gsap.timeline({
      defaults: { ease: "power3.out" }
    });

    // 2) El hero en general aparece con ligera subida y escala
    tlCarta.from(cartaHero, {
      opacity: 0,
      y: 40,
      scale: 0.96,
      duration: 0.7
    });

    // 3) Cada palabra del título entra con blur y subida
    const titleWords = cartaHero.querySelectorAll(".carta-title-word");
    if (titleWords.length) {
      tlCarta.from(
        titleWords,
        {
          y: 30,
          opacity: 0,
          filter: "blur(8px)",
          duration: 0.8,
          stagger: 0.07
        },
        "-=0.3" // empieza mientras aún se anima el fondo
      );
    }

    // 4) El subtítulo entra después, también con blur suave
    if (subtitleEl) {
      tlCarta.from(
        subtitleEl,
        {
          y: 20,
          opacity: 0,
          filter: "blur(10px)",
          duration: 0.7
        },
        "-=0.25"
      );
    }
  }
  // ---------------- GALERÍA INDEX: animación mosaico ----------------
  const galleryItems = document.querySelectorAll("#fendiGallery .fendi-gallery-item");

  if (galleryItems.length) {
    gsap.from(galleryItems, {
      scrollTrigger: {
        trigger: "#gallery",
        start: "top 75%"
      },
      opacity: 0,
      y: 40,
      scale: 0.96,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.08
    });
  }

  // ---------------- EFECTO "FENDI LOUNGE" SUBE/BAJA ----------------
  const canadaEl = document.querySelector(".hero-canada.text5");

  if (canadaEl) {
    // Si ya existen spans .hero-word (FENDI / LOUNGE), trabajamos dentro de ellos.
    // Si no existen, usamos el comportamiento antiguo como fallback.
    const wordWrappers = canadaEl.querySelectorAll(".hero-word");
    let letters;

    if (wordWrappers.length) {
      // MODO NUEVO: FENDI y LOUNGE en contenedores separados
      wordWrappers.forEach((wordEl) => {
        const text = wordEl.textContent.trim();
        wordEl.textContent = "";

        text.split("").forEach((char) => {
          const span = document.createElement("span");
          span.textContent = char;
          wordEl.appendChild(span);
        });
      });

      // Todas las letras son los spans dentro de .hero-word
      letters = canadaEl.querySelectorAll(".hero-word span");
    } else {
      // MODO COMPATIBLE: estructura antigua, todo el texto plano dentro de .hero-canada
      const originalText = canadaEl.textContent.trim();

      canadaEl.textContent = "";
      originalText.split("").forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        canadaEl.appendChild(span);
      });

      letters = canadaEl.querySelectorAll("span");
    }

    // Estado base: más tenue
    gsap.set(letters, {
      opacity: 0.25,
      y: 0
    });

    const tl = gsap.timeline({ repeat: -1 });

    tl.to(letters, {
      duration: 0.5,
      opacity: 1,
      y: -12,              // suben
      ease: "power2.out",
      stagger: 0.06,
      delay: 0.3
    })
    .to(letters, {
      duration: 0.5,
      opacity: 0.25,
      y: 0,
      ease: "power2.inOut",
      stagger: 0.06,
      delay: 0.25
    });
  }

  // ---------------- GALERÍA HORIZONTAL SCROLL FENDI ----------------
  const scrollGalleryWrapper = document.querySelector(".fendi-scroll-gallery-wrapper");

  if (scrollGalleryWrapper && typeof ScrollTrigger !== "undefined") {
    const panels = gsap.utils.toArray(".fendi-scroll-gallery .fendi-scroll-panel");

    if (panels.length > 1) {
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: scrollGalleryWrapper,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1), // encaja en cada foto
          end: () => "+=" + window.innerHeight * (panels.length - 1)
        }
      });
    }
  }

  // ---------------- HERO: degradado que sigue al ratón ----------------
  const heroSection = document.querySelector(".hero-section");

  if (heroSection) {
    const updateHeroGradient = (event) => {
      const rect = heroSection.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      heroSection.style.setProperty("--mouse-x", `${x}%`);
      heroSection.style.setProperty("--mouse-y", `${y}%`);
    };

    heroSection.addEventListener("mousemove", updateHeroGradient);

    heroSection.addEventListener("mouseleave", () => {
      heroSection.style.setProperty("--mouse-x", "50%");
      heroSection.style.setProperty("--mouse-y", "25%");
    });
  }
}

// ---------------- Año automático en el footer ----------------
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ---------------- Formulario reservas (demo) ----------------
const reservaForm = document.querySelector(".reserva-form");
if (reservaForm) {
  reservaForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert(
      "Este formulario es una demo. Configura el envío real (email/API) cuando lo necesites."
    );
  });
}

// ---------------- Navbar: resaltar enlace activo ----------------
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

function onScroll() {
  const scrollPos = window.scrollY + 120; // compensa el header fijo

  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute("id");

    if (scrollPos >= top && scrollPos < bottom) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + id) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", onScroll);
onScroll();

// ---------------- Navbar: efecto reducir al hacer scroll ----------------
const navbar = document.querySelector(".navbar");

if (navbar) {
  const toggleNavbarSize = () => {
    if (window.scrollY > 80) {
      navbar.classList.add("navbar-shrink");
    } else {
      navbar.classList.remove("navbar-shrink");
    }
  };

  toggleNavbarSize();
  window.addEventListener("scroll", toggleNavbarSize);
}

// ---------------- Cookie banner ----------------
const cookieBanner = document.getElementById("cookieBanner");
const cookieAcceptBtn = document.getElementById("cookieAcceptBtn");
const cookieCloseBtn = document.getElementById("cookieCloseBtn");

const COOKIE_KEY = "fendi_cookies_accepted";

if (cookieBanner && cookieAcceptBtn && cookieCloseBtn) {
  const hasAccepted = localStorage.getItem(COOKIE_KEY);

  if (!hasAccepted) {
    setTimeout(() => {
      cookieBanner.classList.add("visible");
    }, 800);
  }

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, "true");
    cookieBanner.classList.remove("visible");
  };

  const handleClose = () => {
    cookieBanner.classList.remove("visible");
  };

  cookieAcceptBtn.addEventListener("click", handleAccept);
  cookieCloseBtn.addEventListener("click", handleClose);
}

// ---------------- AOS (si está cargado) ----------------
if (typeof AOS !== "undefined") {
  AOS.init();
}

// ---------- CARTA: efecto spotlight en las 3 columnas principales ----------
(function () {
  const cardsContainer = document.querySelector(".menu-cards");
  if (!cardsContainer) return; // solo en carta.html

  const cards = Array.from(cardsContainer.querySelectorAll(".menu-card"));
  const overlay = cardsContainer.querySelector(".menu-cards__overlay");

  if (!cards.length || !overlay) return;

  // sincroniza tamaño de cada card con su card clonada del overlay
  const observer = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      const index = cards.indexOf(entry.target);
      if (index === -1 || !overlay.children[index]) return;

      const { inlineSize, blockSize } = entry.borderBoxSize[0];
      overlay.children[index].style.width = `${inlineSize}px`;
      overlay.children[index].style.height = `${blockSize}px`;
    });
  });

  // crea las "copias" vacías dentro del overlay
  const initOverlayCard = (cardEl) => {
    const overlayCard = document.createElement("div");
    overlayCard.classList.add("menu-card");
    overlay.append(overlayCard);
    observer.observe(cardEl);
  };

  cards.forEach(initOverlayCard);

  // mueve el foco siguiendo el puntero dentro del bloque
  const applyOverlayMask = (e) => {
    const rect = cardsContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    overlay.style.setProperty("--opacity", "1");
    overlay.style.setProperty("--x", `${x}px`);
    overlay.style.setProperty("--y", `${y}px`);
  };

  const hideOverlay = () => {
    overlay.style.setProperty("--opacity", "0");
  };

  cardsContainer.addEventListener("pointermove", applyOverlayMask);
  cardsContainer.addEventListener("pointerleave", hideOverlay);
})();
