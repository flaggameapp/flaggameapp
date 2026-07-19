(function () {
  const SELECTORS = {
    navToggle: "[data-nav-toggle]",
    navList: "[data-nav-list]",
    sectionLink: "[data-section-link]",
    homepageLink: "[data-homepage-link]",
    platformCard: "[data-platform-card]",
    section: ".homepage-section"
  };

  const defaultHomepageLinks = {
    webGameUrl: "game/",
    publicWebGameUrl: "game/",
    googlePlayUrl: "",
    chromeWebStoreUrl: "https://chromewebstore.google.com/detail/flag-game/ebbjejglingjlbbkigfbbpedlplabchi",
    edgeAddonsUrl: "",
    firefoxAddonsUrl: "",
    githubUrl: ""
  };

  const configuredHomepageLinks =
    window.FlagGameHomepageConfig && window.FlagGameHomepageConfig.links
      ? window.FlagGameHomepageConfig.links
      : {};

  const homepageLinks = Object.freeze({
    ...defaultHomepageLinks,
    ...configuredHomepageLinks
  });

  window.FlagGameHomepageConfig = Object.freeze({
    links: homepageLinks
  });

  function applyConfiguredLinks() {
    document.querySelectorAll(SELECTORS.homepageLink).forEach(link => {
      const key = link.dataset.homepageLink;
      const configuredUrl = homepageLinks[key];
      const isChromeExtensionContext =
        window.location.protocol === "chrome-extension:";
      const isPublicWebLink = key === "publicWebGameUrl";
      const isAbsoluteWebUrl = /^https?:\/\//i.test(configuredUrl || "");
      const url =
        isPublicWebLink && isChromeExtensionContext && !isAbsoluteWebUrl
          ? ""
          : configuredUrl;

      if (url) {
        link.setAttribute("href", url);
        link.removeAttribute("aria-disabled");
        link.removeAttribute("tabindex");
        link.removeAttribute("hidden");
        return;
      }

      link.removeAttribute("href");
      link.setAttribute("aria-disabled", "true");
      link.setAttribute("tabindex", "0");

      if (link.hasAttribute("data-optional-link")) {
        link.setAttribute("hidden", "");
      }
    });
  }

  function detectBrowser() {
    const userAgent = navigator.userAgent || "";

    if (/Edg\//.test(userAgent)) {
      return "edge";
    }

    if (/Firefox\//.test(userAgent)) {
      return "firefox";
    }

    if (/Chrome\//.test(userAgent) || /CriOS\//.test(userAgent)) {
      return "chrome";
    }

    return "";
  }

  function setupBrowserOptions() {
    const currentBrowser = detectBrowser();

    document.querySelectorAll("[data-browser-option]").forEach(option => {
      const browser = option.dataset.browserOption;
      const key = option.dataset.homepageLink;
      const url = homepageLinks[key];
      const browserName =
        option.querySelector(".browser-option__name")?.textContent.trim() ||
        browser;

      option.classList.toggle(
        "is-current",
        Boolean(url && browser === currentBrowser)
      );
      option.toggleAttribute(
        "aria-current",
        Boolean(url && browser === currentBrowser)
      );

      if (!url) {
        option.setAttribute("aria-label", `${browserName} - Em breve`);
      }

      option.addEventListener("click", event => {
        if (!option.getAttribute("href")) {
          event.preventDefault();
        }
      });

      option.addEventListener("keydown", event => {
        if (
          !option.getAttribute("href") &&
          (event.key === "Enter" || event.key === " ")
        ) {
          event.preventDefault();
        }
      });
    });
  }

  function setupPlatformCards() {
    document.querySelectorAll(SELECTORS.platformCard).forEach(card => {
      const key = card.dataset.platformCard;
      const url = homepageLinks[key];

      if (url) {
        card.removeAttribute("hidden");
      } else {
        card.setAttribute("hidden", "");
      }
    });
  }

  function setupNavigation() {
    const toggle = document.querySelector(SELECTORS.navToggle);
    const list = document.querySelector(SELECTORS.navList);

    if (!toggle || !list) {
      return;
    }

    function setMenuState(isOpen, shouldReturnFocus) {
      toggle.setAttribute("aria-expanded", String(isOpen));
      list.classList.toggle("is-open", isOpen);

      if (!isOpen && shouldReturnFocus) {
        toggle.focus();
      }
    }

    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      setMenuState(!isOpen, false);
    });

    list.addEventListener("click", event => {
      if (event.target.closest("a")) {
        setMenuState(false, false);
      }
    });

    document.addEventListener("keydown", event => {
      if (
        event.key === "Escape" &&
        toggle.getAttribute("aria-expanded") === "true"
      ) {
        setMenuState(false, true);
      }
    });

    document.addEventListener("click", event => {
      const target = event.target;

      if (
        toggle.getAttribute("aria-expanded") === "true" &&
        target instanceof Element &&
        !target.closest("[data-homepage-header]")
      ) {
        setMenuState(false, false);
      }
    });
  }

  function setupCurrentSection() {
    const links = Array.from(
      document.querySelectorAll(SELECTORS.sectionLink)
    );

    if (!links.length) {
      return;
    }

    const sectionById = new Map(
      links
        .map(link => [link.getAttribute("href").slice(1), link])
        .filter(entry => entry[0])
    );

    function setCurrent(id) {
      links.forEach(link => {
        if (link.getAttribute("href") === `#${id}`) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    }

    if (!("IntersectionObserver" in window)) {
      const firstId = sectionById.keys().next().value;

      if (firstId) {
        setCurrent(firstId);
      }

      return;
    }

    const observer = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible && sectionById.has(visible.target.id)) {
        setCurrent(visible.target.id);
      }
    }, {
      rootMargin: "-30% 0px -55% 0px",
      threshold: [0.1, 0.35, 0.6]
    });

    sectionById.forEach((link, id) => {
      const section = document.getElementById(id);

      if (section) {
        observer.observe(section);
      }
    });
  }

  function setupSectionReveal() {
    const sections = Array.from(
      document.querySelectorAll(SELECTORS.section)
    );

    if (!sections.length) {
      return;
    }

    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      sections.forEach(section => section.classList.add("is-visible"));
      return;
    }

    if (!("IntersectionObserver" in window)) {
      sections.forEach(section => section.classList.add("is-visible"));
      return;
    }

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();

      if (rect.top < window.innerHeight && rect.bottom > 0) {
        section.classList.add("is-visible");
      }
    });

    document.documentElement.classList.add("motion-ready");

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.08
    });

    sections.forEach(section => observer.observe(section));
  }

  applyConfiguredLinks();
  setupBrowserOptions();
  setupPlatformCards();
  setupNavigation();
  setupCurrentSection();
  setupSectionReveal();
})();
