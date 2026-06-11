(function () {
  const menuBtn = document.querySelector(".menu-btn");
  const menu = document.querySelector(".menu");
  const form = document.getElementById("form");
  const toast = document.getElementById("toast");

  menuBtn?.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });

  menu?.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      menu.classList.remove("open");
      menuBtn?.setAttribute("aria-expanded", "false");
    });
  });

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (toast) {
      toast.textContent = "Message sent — we'll sparkle back soon!";
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 4000);
    }
    form.reset();
  });

  /* Tabs */
  document.querySelectorAll(".tabs__btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tab = btn.dataset.tab;
      document.querySelectorAll(".tabs__btn").forEach((b) => {
        b.classList.toggle("is-active", b === btn);
        b.setAttribute("aria-selected", b === btn ? "true" : "false");
      });
      document.querySelectorAll(".tab-panel").forEach((panel) => {
        const show = panel.id === "tab-" + tab;
        panel.classList.toggle("is-active", show);
        panel.hidden = !show;
      });
      document.querySelectorAll("#tab-" + tab + " [data-compare]").forEach(initCompare);
    });
  });

  /* Before / after */
  function initCompare(el) {
    if (el.dataset.ready) return;
    el.dataset.ready = "1";

    const range = el.querySelector(".compare__range");
    const clip = el.querySelector(".compare__clip");
    const knob = el.querySelector(".compare__knob");
    const frame = el.querySelector(".compare__frame");
    const before = el.querySelector(".compare__before");
    if (!range || !clip || !knob || !frame || !before) return;

    function syncWidth() {
      before.style.width = frame.offsetWidth + "px";
    }

    function setPos(pct) {
      const v = Math.max(0, Math.min(100, pct));
      range.value = String(v);
      clip.style.width = v + "%";
      knob.style.left = v + "%";
    }

    syncWidth();
    setPos(Number(range.value));
    window.addEventListener("resize", syncWidth);

    range.addEventListener("input", () => setPos(Number(range.value)));

    let drag = false;
    const px = (e) => (e.touches ? e.touches[0].clientX : e.clientX);

    function move(e) {
      if (!drag) return;
      const r = frame.getBoundingClientRect();
      setPos(((px(e) - r.left) / r.width) * 100);
    }

    function end() {
      drag = false;
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", end);
      document.removeEventListener("touchmove", move);
      document.removeEventListener("touchend", end);
    }

    frame.addEventListener("mousedown", (e) => {
      drag = true;
      const r = frame.getBoundingClientRect();
      setPos(((e.clientX - r.left) / r.width) * 100);
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", end);
    });

    frame.addEventListener(
      "touchstart",
      (e) => {
        drag = true;
        const r = frame.getBoundingClientRect();
        setPos(((px(e) - r.left) / r.width) * 100);
        document.addEventListener("touchmove", move, { passive: true });
        document.addEventListener("touchend", end);
      },
      { passive: true }
    );
  }

  document.querySelectorAll("[data-compare]").forEach(initCompare);
})();
