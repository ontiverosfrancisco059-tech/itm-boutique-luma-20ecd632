// Boutique Luma — interacciones propias (sin sistema de comentarios propio).
// Los comentarios, login, perfil y estrellas los renderiza comments.js vía contrato ITM.
(function(){
  var menuBtn = document.getElementById('menuBtn');
  var nav = document.getElementById('mainNav');
  if(menuBtn && nav){
    menuBtn.addEventListener('click', function(){
      var open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ nav.classList.remove('open'); });
    });
  }

  // Filtro catálogo
  var chips = document.querySelectorAll('.chip');
  var cards = document.querySelectorAll('#catalogGrid .card');
  chips.forEach(function(chip){
    chip.addEventListener('click', function(){
      chips.forEach(function(c){ c.classList.remove('active'); });
      chip.classList.add('active');
      var f = chip.getAttribute('data-filter');
      cards.forEach(function(card){
        var show = f === 'all' || card.getAttribute('data-cat') === f;
        card.style.display = show ? '' : 'none';
      });
    });
  });

  // Botón "Me interesa" → mensaje informativo, sin inventar contacto
  var note = document.getElementById('interestNote');
  var baseNote = note ? note.textContent : '';
  document.querySelectorAll('[data-interest]').forEach(function(btn){
    btn.addEventListener('click', function(){
      var name = btn.getAttribute('data-interest');
      if(note){
        note.textContent = 'Elegiste: ' + name + '. Visítanos en Hopelchén para probártelo, apartarlo o preguntar por tallas disponibles.';
      }
    });
  });

  // Resalta sección activa en nav
  var links = document.querySelectorAll('.nav a[href^="#"]');
  var sections = Array.prototype.map.call(links, function(a){
    return document.querySelector(a.getAttribute('href'));
  }).filter(Boolean);
  if('IntersectionObserver' in window){
    var obs = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          var id = '#' + e.target.id;
          links.forEach(function(a){ a.style.color = a.getAttribute('href') === id ? '#8f4f32' : ''; });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(function(s){ obs.observe(s); });
  }
})();
