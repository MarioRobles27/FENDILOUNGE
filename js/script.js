// MAIN JS FENDI LOUNGE

// Aseguramos que GSAP y ScrollTrigger estén cargados
if (typeof gsap !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // Hero: animación de entrada
  gsap.from(".hero-content", {
    opacity: 0,
    y: 40,
    duration: 1.2,
    ease: "power3.out",
    delay: 0.2
  });

  // Animación genérica para los elementos con la clase .gsap-fade-up
  const fadeUpElements = document.querySelectorAll(".gsap-fade-up");
  fadeUpElements.forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none reverse"
      },
      opacity: 0,
      y: 40,
      duration: 0.9,
      ease: "power3.out"
    });
  });

  // -------- HERO: efecto tipográfico en bucle --------
  const heroLines = document.querySelectorAll(".hero-title-line");
  if (heroLines.length) {
    const tlHero = gsap.timeline({
      repeat: -1,
      yoyo: true
    });

    tlHero
      .to(".hero-title-line2", {
        duration: 1.4,
        letterSpacing: "0.25em",
        ease: "power2.inOut"
      })
      .to(
        ".hero-title-line3",
        {
          duration: 1.4,
          y: -6,
          scale: 1.04,
          ease: "power2.inOut"
        },
        "<0.1" // empieza casi a la vez
      )
      .to(".hero-title-line2", {
        duration: 1.2,
        letterSpacing: "0.05em",
        ease: "power2.inOut"
      })
      .to(
        ".hero-title-line3",
        {
          duration: 1.2,
          y: 0,
          scale: 1,
          ease: "power2.inOut"
        },
        "<"
      );
  }
}

// Año automático en el footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Evitar envío real del formulario de reservas (modo demo)
const reservaForm = document.querySelector(".reserva-form");
if (reservaForm) {
  reservaForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert(
      "Este formulario es una demo. Configura el envío real (email/API) cuando lo necesites."
    );
  });
}

// Navbar: resaltar enlace activo según scroll
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

// ---------- NAVBAR: efecto reducir al hacer scroll ----------

const navbar = document.querySelector(".navbar");

if (navbar) {
  const toggleNavbarSize = () => {
    if (window.scrollY > 80) {
      navbar.classList.add("navbar-shrink");
    } else {
      navbar.classList.remove("navbar-shrink");
    }
  };

  // ejecutar una vez al cargar (por si entras ya scrolleado)
  toggleNavbarSize();

  // escuchar el scroll
  window.addEventListener("scroll", toggleNavbarSize);
}

// ---------- COOKIE BANNER ----------

const cookieBanner = document.getElementById("cookieBanner");
const cookieAcceptBtn = document.getElementById("cookieAcceptBtn");
const cookieCloseBtn = document.getElementById("cookieCloseBtn");

const COOKIE_KEY = "fendi_cookies_accepted";

if (cookieBanner && cookieAcceptBtn && cookieCloseBtn) {
  const hasAccepted = localStorage.getItem(COOKIE_KEY);

  // Mostrar solo si no se ha aceptado antes
  if (!hasAccepted) {
    setTimeout(() => {
      cookieBanner.classList.add("visible");
    }, 800); // pequeño delay para que no sea agresivo
  }

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, "true");
    cookieBanner.classList.remove("visible");
  };

  const handleClose = () => {
    // Aquí podrías guardar otro estado si quisieras
    cookieBanner.classList.remove("visible");
  };

  cookieAcceptBtn.addEventListener("click", handleAccept);
  cookieCloseBtn.addEventListener("click", handleClose);
}

// ---------- GALERÍA HORIZONTAL SCROLL FENDI ----------

const scrollGalleryWrapper = document.querySelector(".fendi-scroll-gallery-wrapper");

if (scrollGalleryWrapper && typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
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

// ---------- HERO: degradado que sigue al ratón ----------

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
    // volvemos a una posición neutra cuando sales del hero
    heroSection.style.setProperty("--mouse-x", "50%");
    heroSection.style.setProperty("--mouse-y", "25%");
  });
}

// ---------- AOS (si está cargado) ----------


  AOS.init();
