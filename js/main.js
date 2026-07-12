(function () {
  const PROJECTS = {
    "automated-trading": {
      title: "Automated Trading Platform",
      tags: ["Python", "AWS EC2", "REST APIs", "TradingView Webhooks", "Exchange APIs"],
    },
    "amazon-device-provisioning": {
      title: "Amazon Device Provisioning Platform",
      tags: ["Java", "AWS", "CloudFormation", "REST APIs", "RBAC"],
    },
  };

  function renderProjectTags() {
    document.querySelectorAll("[data-project-tags]").forEach((list) => {
      const key = list.getAttribute("data-project-tags");
      const tags = PROJECTS[key]?.tags;
      if (!tags?.length) return;

      list.innerHTML = tags.map((tag) => `<li>${tag}</li>`).join("");
    });
  }

  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  renderProjectTags();

  const toggle = document.querySelector(".nav__toggle");
  const menu = document.querySelector(".nav__menu");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav__menu a");

  if (sections.length && navLinks.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            const isActive = link.getAttribute("href") === `#${id}`;
            link.style.color = isActive ? "var(--color-text)" : "";
          });
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
  }
})();
