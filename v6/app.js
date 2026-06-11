(function () {
  const ham = document.querySelector(".ham");
  const menu = document.querySelector(".menu");
  ham?.addEventListener("click", () => menu?.classList.toggle("open"));
  menu?.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => menu?.classList.remove("open")));

  document.getElementById("form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const s = document.getElementById("snack");
    if (s) { s.textContent = "RSVP sent! Your squad is gonna love it!"; s.classList.add("show"); setTimeout(() => s.classList.remove("show"), 4000); }
    e.target.reset();
  });
})();
