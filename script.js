const motionQuery = window.matchMedia("(prefers-reduced-motion: no-preference)");

if (motionQuery.matches) {
  const heroImage = document.querySelector(".hero__image img");
  const finalLines = [...document.querySelectorAll(".closing-field p")];

  const draw = () => {
    const scroll = window.scrollY;
    const height = window.innerHeight || 1;

    if (heroImage) {
      heroImage.style.transform = `translateY(${scroll * 0.08}px) scale(1.06)`;
    }

    finalLines.forEach((line, index) => {
      const rect = line.getBoundingClientRect();
      const progress = (rect.top - height * 0.5) / height;
      line.style.transform = `translateX(${progress * (index % 2 ? -28 : 24)}px)`;
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

    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.srcset = image.srcset;
    lightboxImage.alt = image.alt;
    lightboxImage.style.filter = getComputedStyle(image).filter;
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
