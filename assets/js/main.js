/* Maël Gras — Cordiste : interactions du site */
(function () {
  "use strict";

  /* Menu mobile */
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* Bandeau d'avis : on duplique le contenu pour un défilement sans couture */
  document.querySelectorAll(".marquee-track").forEach(function (track) {
    Array.prototype.slice.call(track.children).forEach(function (item) {
      var clone = item.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    });
  });

  /* Galerie : clic sur une photo = plein écran */
  var lightbox = document.querySelector(".lightbox");
  if (lightbox) {
    var stage = lightbox.querySelector(".lightbox-stage");
    var closeBtn = lightbox.querySelector(".lightbox-close");
    var lastFocus = null;

    var open = function (item) {
      lastFocus = item;
      stage.innerHTML = "";
      var img = item.querySelector("img");
      if (img) {
        var big = document.createElement("img");
        big.src = img.currentSrc || img.src;
        big.alt = img.alt;
        stage.appendChild(big);
      } else {
        var copy = item.cloneNode(true);
        copy.removeAttribute("aria-label");
        copy.removeAttribute("type");
        copy.className = item.className.replace(/\b(main)\b/, "");
        stage.appendChild(copy);
      }
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
      closeBtn.focus();
    };
    var close = function () {
      lightbox.classList.remove("open");
      document.body.style.overflow = "";
      if (lastFocus) lastFocus.focus();
    };

    document.querySelectorAll("[data-lightbox]").forEach(function (item) {
      item.addEventListener("click", function () { open(item); });
    });
    closeBtn.addEventListener("click", close);
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && lightbox.classList.contains("open")) close();
    });
  }

  /* Année du pied de page */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
