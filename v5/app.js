(function () {
  const toggle = document.querySelector(".toggle");
  const links = document.querySelector(".links");
  toggle?.addEventListener("click", () => links?.classList.toggle("open"));
  links?.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => links?.classList.remove("open")));

  document.getElementById("form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const p = document.getElementById("pop");
    if (p) { p.textContent = "✨ Magic request sent! A grown-up will reach out!"; p.classList.add("show"); setTimeout(() => p.classList.remove("show"), 4000); }
    e.target.reset();
  });
})();
