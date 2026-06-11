(function () {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav");
  burger?.addEventListener("click", () => nav?.classList.toggle("open"));
  nav?.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => nav?.classList.remove("open")));

  document.getElementById("form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const t = document.getElementById("toast");
    if (t) { t.textContent = "Yay! A grown-up will call you back soon!"; t.classList.add("show"); setTimeout(() => t.classList.remove("show"), 4000); }
    e.target.reset();
  });
})();
