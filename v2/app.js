(function () {
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  const form = document.getElementById("contactForm");
  const toast = document.getElementById("toast");

  navToggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
  });

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      navToggle?.setAttribute("aria-expanded", "false");
    });
  });

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    showToast("Thanks, diva! We'll be in touch soon.");
    form.reset();
  });

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove("is-visible"), 4000);
  }

  /* Before / After sliders */
  document.querySelectorAll("[data-ba]").forEach((card) => {
    const range = card.querySelector(".ba-range");
    const clip = card.querySelector(".ba-clip");
    const handle = card.querySelector(".ba-handle");
    const compare = card.querySelector(".ba-card__compare");
    if (!range || !clip || !handle || !compare) return;

    const beforeImg = clip.querySelector(".ba-img");

    function syncBeforeWidth() {
      if (beforeImg) beforeImg.style.width = compare.offsetWidth + "px";
    }

    function setPosition(pct) {
      const val = Math.max(0, Math.min(100, pct));
      range.value = String(val);
      clip.style.width = val + "%";
      handle.style.left = val + "%";
    }

    syncBeforeWidth();
    setPosition(Number(range.value));
    window.addEventListener("resize", syncBeforeWidth);

    range.addEventListener("input", () => setPosition(Number(range.value)));

    let dragging = false;

    function pointerX(e) {
      return e.touches ? e.touches[0].clientX : e.clientX;
    }

    function onMove(e) {
      if (!dragging) return;
      const rect = compare.getBoundingClientRect();
      const pct = ((pointerX(e) - rect.left) / rect.width) * 100;
      setPosition(pct);
    }

    function onEnd() {
      dragging = false;
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onEnd);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", onEnd);
    }

    compare.addEventListener("mousedown", (e) => {
      dragging = true;
      const rect = compare.getBoundingClientRect();
      setPosition(((e.clientX - rect.left) / rect.width) * 100);
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onEnd);
    });

    compare.addEventListener(
      "touchstart",
      (e) => {
        dragging = true;
        const rect = compare.getBoundingClientRect();
        setPosition(((pointerX(e) - rect.left) / rect.width) * 100);
        document.addEventListener("touchmove", onMove, { passive: true });
        document.addEventListener("touchend", onEnd);
      },
      { passive: true }
    );
  });

  /* Scroll reveal */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".ba-card, .svc, .pkg, .reviews blockquote").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(el);
  });

  const style = document.createElement("style");
  style.textContent = ".is-visible { opacity: 1 !important; transform: translateY(0) !important; }";
  document.head.appendChild(style);
})();
