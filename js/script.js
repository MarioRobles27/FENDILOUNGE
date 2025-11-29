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
