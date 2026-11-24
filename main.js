/* M3 Tours & Travels – sample website by #Creators */
const CONFIG = {
  whatsapp: '918870757174',            // WhatsApp number (country code + number, no +). Taken from M3 brochure; change if needed.
  phones: ['+91 88707 57174', '+91 70107 33013', '+91 86751 32434', '0452-45545847'],
  email: 'm3toursandtravels@gmail.com',
  address: '202/3A, Pudur Vandi Padhai Road, Athikulam, Madurai - 625 014',
  hours: 'Business hours: 24/7',
  mapEmbed: 'https://maps.google.com/maps?q=9.950586,78.1384845&z=15&output=embed' // Google Maps embed URL
};
const TYPES = ['Family trip', 'Pilgrimage', 'Honeymoon', 'Group tour', 'Corporate', 'Airport transfer', 'Outstation'];
const VEHICLES = ['No preference', 'Hatchback', 'Sedan', 'SUV', 'Premium Car', 'Tempo Traveller'];
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const noMotion = matchMedia('(prefers-reduced-motion:reduce)').matches, touch = matchMedia('(hover:none)').matches;

const SERVICES = [
  ['Tour Packages', 'Pilgrim circuits, hill stations, beaches and international trips with stay, food and transport sorted.', 'temple', 'Family trip'],
  ['Outstation Trips', 'Comfortable cars and coaches for long-distance travel across South India.', 'bus', 'Outstation'],
  ['Airport Pickup & Drop', 'On-time transfers to and from Madurai, Chennai, Trichy and other airports.', 'air', 'Airport transfer'],
  ['Local City Tours', 'Guided sightseeing with qualified, experienced guides.', 'goachurch', 'Family trip'],
  ['Corporate Travel', 'Staff transport, business trips, rail, bus and air ticketing.', 'hotel', 'Corporate'],
  ['Wedding & Event Transportation', 'Cars and coaches for guests, families and celebrations.', 'car', 'Group tour']
];
const PACKAGES = [
  { n: 'Tirupati – Tirumala Balaji Darshan', d: '2 Nights / 3 Days', img: 'tirupati', cat: ['Family Trips', 'Group Tours'], demo: 0, s: 'Local Tirupati temples, Lord Balaji darshan with special entry ticket, then Srinivasa Mangapuram, Kanipakam and the Golden Temple (Vellore).', hl: ['Day 1: Padmavathi, Govindaraja Swamy, Kapila Theertham, ISKCON, Sri Kalahasti', 'Day 2: Tirumala darshan, Akasaganga, Venugopala Swamy, Papavinasanam, Silathoranam, Srivari Paadalu', 'Day 3: Srinivasa Mangapuram, Kanipakam, Vellore Golden Temple, drop at station or airport'], inc: 'Balaji special entry ticket, A/c or Non A/c deluxe rooms, pure veg breakfast, lunch and dinner, tax, toll, permit and driver batta.' },
  { n: 'South India Temple Circuit', d: '3 Days', img: 'temple', cat: ['Family Trips', 'Group Tours'], demo: 0, s: 'Madurai, Rameswaram and Kanyakumari in one trip.', hl: ['Madurai: Meenakshi Amman Temple, Thirumalai Naicker Mahal, Mariamman Theppakulam, Alagar Kovil, Gandhi Museum', 'Rameswaram: Pamban Bridge, Agni Theertham, Ramanathaswamy Temple, Panchamukhi Anjaneya, Floating Stone', 'Kanyakumari: Kumari Amman Temple, Vivekananda Rock Memorial, Gandhi Memorial, Vattakottai Fort, Sunrise and Sunset'], inc: 'Confirm inclusions with M3.' },
  { n: 'Kodaikanal Hill Escape', d: '4 Nights / 5 Days', img: 'hotel', cat: ['Adventure Trips', 'Honeymoon Trips', 'Weekend Getaways'], demo: 0, s: 'Lakes, viewpoints and waterfalls in the Princess of Hill Stations.', hl: ['Kodai Lake boating, Bryant Park, Coaker\'s Walk', 'Kurinji Andavar Temple, Telescope House, Green Valley View', 'Pillar Rocks, Bear Shola Falls, Silver Cascade, Dum Dum Rocks'], inc: 'Confirm inclusions with M3.' },
  { n: 'Kerala Backwaters & Hills', d: 'Duration on request', img: 'kerala', cat: ['Honeymoon Trips', 'Family Trips', 'Adventure Trips'], demo: 0, s: 'Thekkady, Munnar, Kochi, Alleppey and Trivandrum.', hl: ['Thekkady: Periyar National Park, bamboo rafting, trekking', 'Munnar: Hill View Park, Mattupetty Dam, Top Station, Kundala Lake', 'Alleppey: beach, Krishnapuram Palace, houseboat', 'Trivandrum: Padmanabhaswamy Temple, Kovalam Beach, Napier Museum'], inc: 'Confirm inclusions with M3.' },
  { n: 'Goa Package Tour', d: '5 Days', img: 'goa', cat: ['Honeymoon Trips', 'Group Tours', 'Weekend Getaways'], demo: 0, s: 'Beaches, churches and nightlife on a 5-day Goa package.', hl: ['Detailed itinerary to be supplied by M3'], inc: 'Confirm inclusions with M3.' },
  { n: 'Dubai Holiday', d: '5 Days', img: 'dubai', cat: ['Family Trips', 'Group Tours', 'Honeymoon Trips'], demo: 0, s: 'Dubai city, desert safari, Burj Khalifa and Abu Dhabi.', hl: ['Day 1: Arrival, Dhow cruise Marina with dinner', 'Day 2: Half-day city tour, desert safari with BBQ dinner', 'Day 3: Burj Khalifa 124-125th floor, Miracle Garden, Global Village', 'Day 4: Abu Dhabi city tour, Grand Mosque, BAPS Temple', 'Day 5: Departure'], inc: 'Inclusions icons: flights, tickets, sightseeing, transfers, hotel. Operated with partner Great Deal Tourism.' },
  { n: 'Thailand & Bangkok', d: 'Details on request', img: 'bangkok', cat: ['Group Tours', 'Honeymoon Trips'], demo: 1, s: 'Listed in M3\'s tour packages. Itinerary and duration to be added.', hl: ['Demo placeholder: itinerary pending'], inc: 'Pending.' },
  { n: 'Andaman Islands', d: 'Details on request', img: 'goachurch', cat: ['Honeymoon Trips', 'Adventure Trips'], demo: 1, s: 'Listed in M3\'s tour packages. Itinerary and duration to be added.', hl: ['Demo placeholder: itinerary pending'], inc: 'Pending.' }
];
const FLEET = [
  ['Hatchback', 'car', '4 + driver', '2 bags', ['A/c', 'City & short trips']],
  ['Sedan', 'car', '4 + driver', '3 bags', ['A/c', 'Comfortable highway ride']],
  ['SUV', 'car', '6 + driver', '4 bags', ['A/c', 'Family outstation']],
  ['Premium Cars', 'car', '4 + driver', '3 bags', ['A/c', 'Luxury car rental']],
  ['Tempo Traveller', 'bus', '12 to 17', 'Roof carrier', ['A/c', 'Group tours']]
];
const REVIEWS = [['Sample Customer 1', 'Placeholder review text. Replace with a genuine customer review.'], ['Sample Customer 2', 'Placeholder review text. Replace with a genuine customer review.'], ['Sample Customer 3', 'Placeholder review text. Replace with a genuine customer review.'], ['Sample Customer 4', 'Placeholder review text. Replace with a genuine customer review.']];
const GAL = [['tirupati', 'Destinations', 'Tirupati'], ['kerala', 'Destinations', 'Kerala'], ['goa', 'Destinations', 'Goa'], ['dubai', 'Destinations', 'Dubai'], ['bangkok', 'Destinations', 'Bangkok'], ['goachurch', 'Destinations', 'Old Goa'], ['temple', 'Group travel', 'Temple tours'], ['bus', 'Vehicles', 'Coaches'], ['car', 'Vehicles', 'Car rentals'], ['air', 'Road trips', 'Air tickets'], ['hotel', 'Group travel', 'Stays']];

const wa = text => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;
function toast(msg, kind = 'ok') { const t = document.createElement('div'); t.className = 'toast ' + kind; t.textContent = msg; $('#toasts').append(t); setTimeout(() => t.remove(), 4200); }
function modal(html) { $('#mBody').innerHTML = html; $('#modal').hidden = false; $('#modal .x').focus(); }
const closeModal = () => $('#modal').hidden = true;

/* build */
$$('select[name=type]').forEach(s => s.innerHTML = TYPES.map(t => `<option>${t}</option>`).join(''));
$('select[name=vehicle]').innerHTML = VEHICLES.map(t => `<option>${t}</option>`).join('');
$('#serviceGrid').innerHTML = SERVICES.map((s, i) => `<article class="card rv" data-tilt><div class="im"><img src="assets/${s[2]}.jpg" alt="${esc(s[0])}" loading="lazy"></div><div class="bd"><h3>${s[0]}</h3><p>${s[1]}</p><div class="acts"><button class="btn btn-s" data-svc="${i}">Explore More</button></div></div></article>`).join('');
const cats = ['All', 'Family Trips', 'Adventure Trips', 'Weekend Getaways', 'Honeymoon Trips', 'Group Tours'];
function filterBar(el, list, cb) { el.innerHTML = list.map((c, i) => `<button role="tab" aria-selected="${i === 0}" class="${i === 0 ? 'on' : ''}">${c}</button>`).join(''); el.onclick = e => { const b = e.target.closest('button'); if (!b) return; $$('button', el).forEach(x => { x.classList.remove('on'); x.setAttribute('aria-selected', 'false') }); b.classList.add('on'); b.setAttribute('aria-selected', 'true'); cb(b.textContent) }; }
function drawPk(c = 'All') { $('#pkgGrid').innerHTML = PACKAGES.map((p, i) => ({ p, i })).filter(({ p }) => c === 'All' || p.cat.includes(c)).map(({ p, i }) => `<article class="card" data-tilt><div class="im"><img src="assets/${p.img}.jpg" alt="${esc(p.n)}" loading="lazy"><span class="badge">${p.d}</span>${p.demo ? '<span class="demo">Demo content</span>' : ''}</div><div class="bd"><h3>${p.n}</h3><p>${p.s}</p><span class="price">Starting price: on request</span><div class="acts"><button class="btn btn-s" data-pk="${i}">View Details</button><a class="btn btn-w" target="_blank" rel="noopener" href="${wa('Hi M3 Tours & Travels, I would like to enquire about: ' + p.n + ' (' + p.d + ')')}">Enquire on WhatsApp</a></div></div></article>`).join(''); bindTilt(); }
filterBar($('#filters'), cats, drawPk); drawPk();
$('#fleetGrid').innerHTML = FLEET.map((f, i) => `<article class="card" data-tilt><div class="im"><img src="assets/${f[1]}.jpg" alt="${f[0]} (sample image)" loading="lazy"><span class="demo">Placeholder specs</span></div><div class="bd"><h3>${f[0]}</h3><div class="meta"><span>Seats: ${f[2]}</span><span>Luggage: ${f[3]}</span></div><p>${f[4].join(' · ')}</p><div class="acts"><button class="btn btn-o" data-fl="${i}">Enquire Now</button></div></div></article>`).join('');
$('#rTrack').innerHTML = REVIEWS.map(r => `<blockquote class="rev"><div class="stars" aria-label="Rating placeholder">★★★★★</div><p>${r[1]}</p><p><b>${r[0]}</b> <small style="color:#5b6f86">(placeholder)</small></p></blockquote>`).join('');
const gc = ['All', 'Destinations', 'Vehicles', 'Road trips', 'Group travel']; let gl = GAL;
function drawG(c = 'All') { gl = GAL.filter(g => c === 'All' || g[1] === c); $('#galGrid').innerHTML = gl.map((g, i) => `<figure data-g="${i}" tabindex="0" role="button" aria-label="Open ${g[2]}"><img src="assets/${g[0]}.jpg" alt="${g[2]}" loading="lazy"><figcaption>${g[2]}</figcaption></figure>`).join('') }
filterBar($('#gFilters'), gc, drawG); drawG();
const phoneLinks = CONFIG.phones.map(p => `<a href="tel:${p.replace(/[^+\d]/g, '')}">${p}</a>`).join(' / ');
const infoHTML = `<li>📍 ${CONFIG.address}</li><li>📞 ${phoneLinks}</li><li>✉️ <a href="mailto:${CONFIG.email}">${CONFIG.email}</a></li><li>🕘 ${CONFIG.hours}</li>`;
$('#info').innerHTML = infoHTML; $('#finfo').innerHTML = infoHTML;
$('#waCta').href = $('#waFloat').href = wa('Hi M3 Tours & Travels, I would like to know more about your tour packages.');
if (CONFIG.mapEmbed) $('.map').innerHTML = `<iframe src="${CONFIG.mapEmbed}" loading="lazy" title="M3 location map"></iframe>`;
$('#yr').textContent = new Date().getFullYear();
$$('[data-soon]').forEach(a => a.onclick = e => { e.preventDefault(); toast(a.dataset.soon + ' link not added yet.', 'bad') });

/* nav */
const burger = $('#burger'), menu = $('#menu');
const setMenu = o => { menu.classList.toggle('on', o); burger.classList.toggle('on', o); burger.setAttribute('aria-expanded', o); burger.setAttribute('aria-label', o ? 'Close menu' : 'Open menu') };
burger.onclick = () => setMenu(!menu.classList.contains('on')); $$('#menu a').forEach(a => a.onclick = () => setMenu(false));
addEventListener('scroll', () => { $('#nav').classList.toggle('sc', scrollY > 30); $('#top').classList.toggle('show', scrollY > 700); parallax() }, { passive: true });
$('#top').onclick = () => scrollTo({ top: 0 });
addEventListener('load', () => setTimeout(() => $('#loader').classList.add('off'), 500));

/* motion */
function bindTilt() { if (noMotion || touch) return; $$('[data-tilt]:not([data-b])').forEach(el => { el.dataset.b = 1; el.onmousemove = e => { const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; el.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-6px)` }; el.onmouseleave = () => el.style.transform = '' }) }
bindTilt();
const sc = $('#scene'), cube = $('.cube');
if (!noMotion && !touch) sc.onmousemove = e => { const r = sc.getBoundingClientRect(); cube.style.translate = `${((e.clientX - r.left) / r.width - .5) * 30}px ${((e.clientY - r.top) / r.height - .5) * 20}px` };
function parallax() { if (noMotion) return; const y = scrollY; $('.hills').style.transform = `translateY(${y * .12}px)`; $$('.cloud').forEach((c, i) => c.style.marginTop = y * (.08 + i * .04) + 'px') }
const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && (e.target.classList.add('in'), io.unobserve(e.target))), { threshold: .15 });
$$('.rv').forEach((el, i) => { el.style.transitionDelay = (i % 3) * 90 + 'ms'; io.observe(el) });

/* carousel */
const tr = $('#rTrack'); $('#rDots').innerHTML = REVIEWS.map(() => '<i></i>').join('');
const step = () => tr.firstElementChild.getBoundingClientRect().width + 19;
const mark = () => { const n = Math.round(tr.scrollLeft / step()); $$('#rDots i').forEach((d, i) => d.classList.toggle('on', i === Math.min(n, REVIEWS.length - 1))) };
$('#rNext').onclick = () => tr.scrollLeft + tr.clientWidth >= tr.scrollWidth - 4 ? tr.scrollTo({ left: 0 }) : tr.scrollBy({ left: step() });
$('#rPrev').onclick = () => tr.scrollBy({ left: -step() }); tr.onscroll = mark; mark();
$$('#rDots i').forEach((d, i) => d.onclick = () => tr.scrollTo({ left: i * step() }));
setInterval(() => !document.hidden && !noMotion && $('#rNext').click(), 6000);

/* gallery lightbox */
let li = 0; const lb = $('#lb'), show = i => { li = (i + gl.length) % gl.length; $('img', lb).src = `assets/${gl[li][0]}.jpg`; $('img', lb).alt = gl[li][2] };
$('#galGrid').onclick = e => { const f = e.target.closest('figure'); if (f) { show(+f.dataset.g); lb.hidden = false } };
$('#galGrid').onkeydown = e => { if (e.key === 'Enter') e.target.click() };
$('.nb.l', lb).onclick = e => { e.stopPropagation(); show(li - 1) }; $('.nb.r', lb).onclick = e => { e.stopPropagation(); show(li + 1) };
lb.onclick = e => { if (e.target === lb || e.target.classList.contains('x')) lb.hidden = true };

/* modals + clicks */
const book = $('#bookForm');
document.addEventListener('click', e => {
  const t = e.target;
  if (t.dataset.pk) { const p = PACKAGES[t.dataset.pk]; modal(`<img src="assets/${p.img}.jpg" alt="${esc(p.n)}"><h3 id="mTitle">${p.n}</h3><p><b>${p.d}</b>${p.demo ? ' · Demo content' : ''}</p><p>${p.s}</p><ul>${p.hl.map(h => `<li>${h}</li>`).join('')}</ul><p><b>Includes:</b> ${p.inc}</p><p class="price">Starting price: on request</p><div class="acts"><a class="btn btn-w" target="_blank" rel="noopener" href="${wa('Hi M3 Tours & Travels, I would like to enquire about: ' + p.n + ' (' + p.d + ')')}">Enquire on WhatsApp</a><button class="btn btn-o" data-plan="${esc(p.n)}">Plan this trip</button></div>`) }
  if (t.dataset.svc) { const s = SERVICES[t.dataset.svc]; modal(`<img src="assets/${s[2]}.jpg" alt="${esc(s[0])}"><h3 id="mTitle">${s[0]}</h3><p>${s[1]}</p><div class="acts"><button class="btn btn-o" data-type="${s[3]}">Enquire about this</button><a class="btn btn-w" target="_blank" rel="noopener" href="${wa('Hi M3 Tours & Travels, I need help with: ' + s[0])}">WhatsApp</a></div>`) }
  if (t.dataset.fl) { book.vehicle.value = FLEET[t.dataset.fl][0]; toBook('Vehicle selected: ' + FLEET[t.dataset.fl][0]) }
  if (t.dataset.plan) { closeModal(); book.notes.value = 'Interested in: ' + t.dataset.plan; toBook('Package added to your enquiry') }
  if (t.dataset.type) { closeModal(); book.type.value = t.dataset.type; toBook('Travel type set') }
  if (t.matches('#modal .x') || t.id === 'modal') closeModal();
});
function toBook(m) { $('#booking').scrollIntoView({ behavior: 'smooth' }); toast(m); setTimeout(() => book.name.focus({ preventScroll: true }), 700) }
addEventListener('keydown', e => { if (e.key === 'Escape') { closeModal(); lb.hidden = true; setMenu(false) } if (!lb.hidden) { if (e.key === 'ArrowRight') show(li + 1); if (e.key === 'ArrowLeft') show(li - 1) } });

/* forms */
const today = new Date().toISOString().slice(0, 10); $$('input[type=date]').forEach(d => d.min = today);
function bad(el, m) { const l = el.closest('label'); l.classList.add('err'); const s = $('small', l); if (s) s.textContent = m; return false }
function validate(f) {
  let ok = true; $$('label', f).forEach(l => { l.classList.remove('err'); const s = $('small', l); if (s) s.textContent = '' });
  $$('[required]', f).forEach(el => { if (!el.value.trim()) ok = bad(el, 'This field is required.') });
  if (f.phone && f.phone.value && !/^(\+?91[\s-]?)?[6-9]\d{9}$/.test(f.phone.value.replace(/\s/g, ''))) ok = bad(f.phone, 'Enter a valid 10-digit mobile number.');
  if (f.date && f.date.value && f.date.value < today) ok = bad(f.date, 'Travel date cannot be in the past.');
  if (f.ret && f.ret.value && f.date.value && f.ret.value < f.date.value) ok = bad(f.ret, 'Return date must be after the travel date.');
  if (f.pax && (f.pax.value < 1 || f.pax.value > 60)) ok = bad(f.pax, 'Choose 1 to 60 passengers.');
  if (!ok) { toast('Please fix the highlighted fields.', 'bad'); const e = $('.err input,.err textarea', f); e && e.focus() }
  return ok;
}
const msgOf = f => `*New enquiry via M3 website (demo)*\nName: ${f.name.value}\nPhone: ${f.phone.value}\nFrom: ${f.pickup.value}\nTo: ${f.drop.value}\nTravel date: ${f.date.value}\nReturn date: ${f.ret.value || '-'}\nPassengers: ${f.pax.value}\nVehicle: ${f.vehicle.value}\nTravel type: ${f.type.value}\nNotes: ${f.notes.value || '-'}`;
book.onsubmit = e => {
  e.preventDefault(); if (!validate(book)) return;
  const r = [['Name', book.name.value], ['Phone', book.phone.value], ['Route', book.pickup.value + ' → ' + book.drop.value], ['Travel date', book.date.value], ['Return date', book.ret.value || 'Not set'], ['Passengers', book.pax.value], ['Vehicle', book.vehicle.value], ['Travel type', book.type.value], ['Notes', book.notes.value || 'None']];
  modal(`<h3 id="mTitle">Check your enquiry</h3><dl class="sum">${r.map(x => `<dt>${x[0]}</dt><dd>${esc(x[1])}</dd>`).join('')}</dl><div class="acts"><button class="btn btn-o" id="subDemo">Submit Enquiry</button><a class="btn btn-w" id="subWa" target="_blank" rel="noopener" href="${wa(msgOf(book))}">Send Enquiry via WhatsApp</a></div>`);
  $('#subDemo').onclick = () => { modal(`<h3 id="mTitle">Demo enquiry received</h3><p>This is a frontend demo. Your enquiry was <b>not</b> sent or saved, and no booking is confirmed. Use “Send Enquiry via WhatsApp” to reach M3 directly.</p><div class="acts"><a class="btn btn-w" target="_blank" rel="noopener" href="${wa(msgOf(book))}">Send via WhatsApp</a><button class="btn btn-s" onclick="document.getElementById('modal').hidden=true">Close</button></div>`); toast('Demo only: nothing was saved or booked.') };
  $('#subWa').onclick = () => { closeModal(); toast('Opening WhatsApp…') };
};
$('#contactForm').onsubmit = e => { e.preventDefault(); const f = e.target; if (!validate(f)) return; window.open(wa(`Hi M3, message from website (demo)\nName: ${f.name.value}\nContact: ${f.contact.value}\n${f.msg.value}`), '_blank', 'noopener'); toast('Demo only: opening WhatsApp with your message.'); f.reset() };
$('#searchForm').onsubmit = e => {
  e.preventDefault(); const s = e.target; if (!validate(s)) return;
  ['pickup', 'drop', 'date', 'pax', 'type'].forEach(k => book[k].value = s[k].value);
  toBook('Trip details copied. Add your name and phone to continue.');
};
