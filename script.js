(function () {
  "use strict";

  var header = document.getElementById("siteHeader");
  var navToggle = document.getElementById("navToggle");
  var primaryNav = document.getElementById("primaryNav");
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");

  /* ---------- Header state ---------- */
  function onScroll() {
    if (window.scrollY > 24) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav ---------- */
  navToggle.addEventListener("click", function () {
    var open = primaryNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  primaryNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      primaryNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", function (event) {
    if (
      primaryNav.classList.contains("is-open") &&
      !primaryNav.contains(event.target) &&
      !navToggle.contains(event.target)
    ) {
      primaryNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && primaryNav.classList.contains("is-open")) {
      primaryNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  /* ---------- Active nav link on scroll ---------- */
  var sections = Array.prototype.slice.call(
    document.querySelectorAll("main section[id]")
  );
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll(".nav-link[href^='#']")
  );

  function setActive(id) {
    navLinks.forEach(function (link) {
      var target = link.getAttribute("href").slice(1);
      link.classList.toggle("is-active", target === id);
    });
  }

  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach(function (section) {
      spy.observe(section);
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealTargets = document.querySelectorAll(
    ".about-grid, .section-head, .product-card, .g-item, .reviews-layout, .contact-grid, .cta-strip"
  );

  if ("IntersectionObserver" in window) {
    var revealer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealTargets.forEach(function (el) {
      el.classList.add("reveal");
      revealer.observe(el);
    });
  }

  /* ---------- Gallery lightbox ---------- */
  var galleryItems = Array.prototype.slice.call(
    document.querySelectorAll(".g-item")
  );
  var currentIndex = 0;

  function openLightbox(index) {
    var items = galleryItems.filter(function (item) {
      return item.getAttribute("data-src");
    });
    if (items.length === 0) {
      return;
    }
    currentIndex = (index + items.length) % items.length;
    lightboxImg.src = items[currentIndex].getAttribute("data-src");
    lightboxImg.alt = items[currentIndex].querySelector("figcaption")
      ? items[currentIndex].querySelector("figcaption").textContent
      : "";
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function stepLightbox(direction) {
    var items = galleryItems.filter(function (item) {
      return item.getAttribute("data-src");
    });
    if (items.length === 0) {
      return;
    }
    currentIndex = (currentIndex + direction + items.length) % items.length;
    lightboxImg.src = items[currentIndex].getAttribute("data-src");
  }

  galleryItems.forEach(function (item, index) {
    item.addEventListener("click", function () {
      openLightbox(index);
    });
  });

  document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
  document.getElementById("lightboxPrev").addEventListener("click", function () {
    stepLightbox(-1);
  });
  document.getElementById("lightboxNext").addEventListener("click", function () {
    stepLightbox(1);
  });

  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (lightbox.hidden) {
      return;
    }
    if (event.key === "Escape") {
      closeLightbox();
    } else if (event.key === "ArrowLeft") {
      stepLightbox(-1);
    } else if (event.key === "ArrowRight") {
      stepLightbox(1);
    }
  });
})();