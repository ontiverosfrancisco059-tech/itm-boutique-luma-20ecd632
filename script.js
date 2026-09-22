const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('mainNav');
if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
}

// Filtros catálogo
const chips = document.querySelectorAll('.chip');
const cards = document.querySelectorAll('.p-card');
chips.forEach(ch => ch.addEventListener('click', () => {
  chips.forEach(c => c.classList.remove('active'));
  ch.classList.add('active');
  const f = ch.dataset.filter;
  cards.forEach(card => card.classList.toggle('hide', f !== 'all' && card.dataset.cat !== f));
}));

// Guardados (wishlist local, sin backend)
const KEY = 'luma_favs_v1';
const getFavs = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } };
const setFavs = v => localStorage.setItem(KEY, JSON.stringify(v));
const counter = document.getElementById('favCounter');
const favList = document.getElementById('favList');
function renderFavs() {
  const favs = getFavs();
  if (counter) counter.textContent = 'Guardados: ' + favs.length;
  if (favList) favList.textContent = favs.length ? 'Tus guardados: ' + favs.join(' · ') : 'Aún no guardas prendas.';
  document.querySelectorAll('[data-fav]').forEach(b => {
    b.textContent = getFavs().includes(b.dataset.fav) ? 'Guardado ✓' : 'Guardar';
  });
}
document.querySelectorAll('[data-fav]').forEach(b => b.addEventListener('click', () => {
  let favs = getFavs();
  const name = b.dataset.fav;
  favs = favs.includes(name) ? favs.filter(x => x !== name) : [...favs, name];
  setFavs(favs); renderFavs();
}));
const showBtn = document.getElementById('showFavs');
if (showBtn) showBtn.addEventListener('click', () => {
  const favs = getFavs();
  alert(favs.length ? 'Guardados en Boutique Luma:\n- ' + favs.join('\n- ') + '\n\nMuestra esta lista en tienda.' : 'Aún no guardas prendas. Explora el catálogo.');
});
const clearBtn = document.getElementById('clearFavs');
if (clearBtn) clearBtn.addEventListener('click', () => { setFavs([]); renderFavs(); });
renderFavs();

// Reveal on scroll
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }), { threshold: 0.12 });
document.querySelectorAll('.card,.p-card,.about,.gallery figure,.reviews-shell').forEach(el => { el.classList.add('reveal'); io.observe(el); });
