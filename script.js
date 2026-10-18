/* ---------- Scroll reveal ---------- */
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => revealObserver.observe(el));
} else {
  revealEls.forEach(el => el.classList.add("in"));
}

/* ---------- Highlight the nav link of the section you are in ---------- */
const navLinks = document.querySelectorAll(".nav nav a");
const sections = [...navLinks].map(a => document.querySelector(a.getAttribute("href")));

if ("IntersectionObserver" in window) {
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a =>
          a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id)
        );
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  sections.forEach(s => s && navObserver.observe(s));
}

// At the very top of the page, no link should be highlighted
window.addEventListener("scroll", () => {
  if (window.scrollY < 100) navLinks.forEach(a => a.classList.remove("active"));
}, { passive: true });

/* ---------- Copy email ---------- */
const copyBtn = document.getElementById("copyBtn");
const mailBtn = document.getElementById("mailBtn");
const copied  = document.getElementById("copied");

copyBtn.addEventListener("click", async () => {
  const email = mailBtn.textContent.trim();
  try {
    await navigator.clipboard.writeText(email);
    copied.textContent = "Email copied.";
  } catch (e) {
    copied.textContent = "Could not copy. Please copy it manually: " + email;
  }
  setTimeout(() => { copied.textContent = ""; }, 3000);
});

/* ---------- Footer year ---------- */
document.getElementById("year").textContent = new Date().getFullYear();