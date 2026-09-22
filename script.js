// Boutique Luma — interacciones del sitio (sin sistema propio de comentarios).
(function(){
  var menuBtn = document.getElementById('menuBtn');
  var nav = document.getElementById('siteNav');
  if(menuBtn && nav){
    menuBtn.addEventListener('click', function(){
      var open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ nav.classList.remove('open'); });
    });
  }

  // Filtro de catálogo
  var chips = document.querySelectorAll('.chip');
  var items = document.querySelectorAll('.catalog-item');
  chips.forEach(function(chip){
    chip.addEventListener('click', function(){
      chips.forEach(function(c){ c.classList.remove('active'); });
      chip.classList.add('active');
      var f = chip.getAttribute('data-filter');
      items.forEach(function(it){
        var cats = (it.getAttribute('data-cat') || '').split(' ');
        if(f === 'all' || cats.indexOf(f) !== -1){ it.classList.remove('hidden'); }
        else { it.classList.add('hidden'); }
      });
    });
  });

  // Navegación activa por scroll
  var links = document.querySelectorAll('.site-nav a[href^="#"]');
  var sections = Array.prototype.slice.call(links).map(function(a){
    return document.querySelector(a.getAttribute('href'));
  }).filter(Boolean);
  function setActive(){
    var y = window.scrollY + 120;
    var current = sections[0];
    sections.forEach(function(s){ if(s.offsetTop <= y) current = s; });
    links.forEach(function(a){
      a.classList.toggle('active', current && a.getAttribute('href') === '#' + current.id);
    });
  }
  window.addEventListener('scroll', setActive, {passive:true});
  setActive();

  // Reveal on scroll
  var revealEls = document.querySelectorAll('.card, .catalog-item, .look, .step, .info-card');
  revealEls.forEach(function(el){ el.classList.add('reveal'); });
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, {threshold:.12});
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('visible'); });
  }

  // Año
  var year = document.getElementById('year');
  if(year) year.textContent = String(new Date().getFullYear());
})();
