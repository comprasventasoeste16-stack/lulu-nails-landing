// Interacciones de Lulu Nails: menú móvil, mensajes de WhatsApp y aparición suave.
(() => {
  const phone = "541150164853";
  const messages = {
    general: "Hola, Lulu Nails. Quería consultar disponibilidad para reservar un turno. ¿Me pasan los horarios disponibles?",
    gelificadas: "Hola, Lulu Nails. Quería consultar por uñas gelificadas y disponibilidad para un turno.",
    softgel: "Hola, Lulu Nails. Quería consultar por soft gel y disponibilidad para un turno.",
    kapping: "Hola, Lulu Nails. Quería consultar por kapping y disponibilidad para un turno.",
    semi: "Hola, Lulu Nails. Quería consultar por esmaltado semipermanente y disponibilidad para un turno.",
    depilacion: "Hola, Lulu Nails. Quería consultar por depilación definitiva Soprano Ice y disponibilidad para un turno."
  };
  document.querySelectorAll(".js-wa").forEach(link => {
    const text = messages[link.dataset.msg] || messages.general;
    link.href = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  });

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#nav");
  function closeMenu() {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menú");
    nav.classList.remove("open");
  }
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      nav.classList.toggle("open", open);
    });
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));
    document.addEventListener("keydown", e => { if (e.key === "Escape") closeMenu(); });
    window.addEventListener("resize", () => { if (innerWidth > 760) closeMenu(); });
  }

  const items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });
    items.forEach(item => observer.observe(item));
  } else {
    items.forEach(item => item.classList.add("visible"));
  }
  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();
})();
