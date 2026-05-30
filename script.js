const motionQuery = window.matchMedia("(prefers-reduced-motion: no-preference)");

if (motionQuery.matches) {
  const heroImage = document.querySelector(".hero__image img");
  const poemLines = [...document.querySelectorAll(".poem-lines p")];

  const draw = () => {
    const scroll = window.scrollY;
    const height = window.innerHeight || 1;

    if (heroImage) {
      heroImage.style.transform = `translateY(${scroll * 0.08}px) scale(1.06)`;
    }

    poemLines.forEach((line, index) => {
      const rect = line.getBoundingClientRect();
      const progress = (rect.top - height * 0.58) / height;
      const direction = index % 2 ? -1 : 1;
      line.style.transform = `translateX(${progress * direction * 14}px)`;
    });
  };

  let ticking = false;

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          draw();
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );

  window.addEventListener("resize", draw);
  draw();
}

const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox__image");
const lightboxClose = document.querySelector(".lightbox__close");
const imageTriggers = [...document.querySelectorAll(".image-trigger")];
const navLinks = [...document.querySelectorAll(".glyph-strip a")];
const poemSections = [...document.querySelectorAll(".poem-work")];
const linkById = new Map(
  navLinks.map((link) => [link.getAttribute("href")?.slice(1), link])
);

const updateActiveNavigation = () => {
  if (!navLinks.length || !poemSections.length) return;

  const targetY = window.innerHeight * 0.46;
  const activeSection =
    poemSections.find((section) => {
      const rect = section.getBoundingClientRect();
      return rect.top <= targetY && rect.bottom >= targetY;
    }) ||
    poemSections
      .map((section) => ({
        section,
        distance: Math.abs(section.getBoundingClientRect().top - targetY)
      }))
      .sort((left, right) => left.distance - right.distance)[0]?.section;

  navLinks.forEach((link) => link.classList.remove("is-active"));
  linkById.get(activeSection?.id)?.classList.add("is-active");
};

const closeLightbox = () => {
  if (!lightbox || !lightboxImage) return;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.removeAttribute("src");
  lightboxImage.removeAttribute("srcset");
  lightboxImage.style.filter = "";
  document.body.style.overflow = "";
};

imageTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const image = trigger.querySelector("img");
    if (!lightbox || !lightboxImage || !image) return;

    lightboxImage.src = image.dataset.full || image.currentSrc || image.src;
    lightboxImage.removeAttribute("srcset");
    lightboxImage.alt = image.alt;
    lightboxImage.style.filter = "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    lightboxClose?.focus();
  });
});

lightboxClose?.addEventListener("click", closeLightbox);

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox?.classList.contains("is-open")) {
    closeLightbox();
  }
});

let navigationTicking = false;

window.addEventListener(
  "scroll",
  () => {
    if (!navigationTicking) {
      window.requestAnimationFrame(() => {
        updateActiveNavigation();
        navigationTicking = false;
      });
      navigationTicking = true;
    }
  },
  { passive: true }
);

window.addEventListener("resize", updateActiveNavigation);
updateActiveNavigation();
