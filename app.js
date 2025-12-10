
// Popup offer + scroll animations + nav active + CSV helpers
const OFFERS = [
  {title:"2‑for‑1 Mojitos", note:"Today 18:00–19:00 · Members", cta:"Reserve Now", href:"book.html"},
  {title:"Wine Wednesday 12% Off", note:"Selected bottles all night", cta:"See Specials", href:"specials.html"},
  {title:"Live Acoustic Tonight 21:00", note:"Unplugged set · Rooftop vibes", cta:"Book a Table", href:"book.html"},
  {title:"Champagne Friday", note:"Celebrate with a bottle deal", cta:"View Menu", href:"menu.html"},
  {title:"Snack Combo Deal", note:"Truffle Fries + Mini Burgers", cta:"See Menu", href:"menu.html"}
];
function showPopupOnce(){
  try{
    if(sessionStorage.getItem('NOB_POPUP_SHOWN')) return;
    sessionStorage.setItem('NOB_POPUP_SHOWN','1');
  }catch(e){}
  const o = OFFERS[Math.floor(Math.random()*OFFERS.length)];
  const backdrop = document.createElement('div');
  backdrop.className='popup-backdrop';
  backdrop.innerHTML = `
  <div class="popup" role="dialog" aria-modal="true" aria-label="Special Offer">
    <div class="head"><strong>Tonight’s Offer</strong><button class="x" aria-label="Close">✕</button></div>
    <div class="body">
      <p class="deal">🍸 ${o.title}</p>
      <p class="note">${o.note}</p>
      <div class="actions">
        <a class="btn" href="${o.href}">${o.cta}</a>
        <button class="btn ghost x">Close</button>
      </div>
    </div>
  </div>`;
  document.body.appendChild(backdrop);
  backdrop.style.display = 'flex';
  requestAnimationFrame(()=> backdrop.querySelector('.popup').classList.add('in'));
  function close(){ backdrop.remove(); }
  backdrop.addEventListener('click', (e)=>{ if(e.target===backdrop) close(); });
  backdrop.querySelectorAll('.x').forEach(b=> b.addEventListener('click', close));
}
function initScrollAnim(){
  const els = document.querySelectorAll('[data-animate]');
  if(!('IntersectionObserver' in window)){ els.forEach(el=> el.classList.add('in')); return; }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
  }, {threshold:.12});
  els.forEach(el=> io.observe(el));
}
function setActiveNav(){
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(a=>{
    if(a.getAttribute('href')===path) a.classList.add('active');
  });
}
// CSV helpers (Excel)
function toCSV(rows){
  if(!rows || !rows.length) return '';
  const keys = Object.keys(rows[0]);
  const esc = v => ('"'+String(v).replace(/"/g,'""')+'"');
  const header = keys.map(esc).join(',');
  const body = rows.map(r=> keys.map(k=> esc(r[k] ?? '')).join(',')).join('\n');
  return header+'\n'+body;
}
function downloadCSV(filename, rows){
  const blob = new Blob([toCSV(rows)], {type:'text/csv;charset=utf-8;'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
}
function parseCSV(text){
  const lines = text.trim().split(/\r?\n/);
  const headers = lines.shift().replace(/^"|"$/g,'').split('","');
  return lines.map(line=>{
    const cells = line.replace(/^"|"$/g,'').split('","');
    const o = {}; headers.forEach((h,i)=> o[h]=cells[i] ?? '');
    return o;
  });
}
document.addEventListener('DOMContentLoaded', ()=>{
  initScrollAnim();
  setActiveNav();
  showPopupOnce();
});


// Hidden Admin shortcut with passport popup
(function(){
  const ACCESS_KEY = 'nightowlpass'; // change anytime
  function makePassport(){
    const backdrop = document.createElement('div');
    backdrop.className='popup-backdrop';
    backdrop.innerHTML = `
      <div class="popup" role="dialog" aria-modal="true" aria-label="Admin Access">
        <div class="head"><strong>Admin Access</strong><button class="x" aria-label="Close">✕</button></div>
        <div class="body">
          <p class="note">Enter access key</p>
          <input id="passKey" type="password" placeholder="Access key" style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:10px;background:rgba(255,255,255,.04);color:var(--text);margin:8px 0">
          <div class="actions"><button class="btn" id="passGo">Continue</button><button class="btn ghost x">Cancel</button></div>
          <p class="note" id="passMsg" style="margin-top:6px"></p>
        </div>
      </div>`;
    backdrop.style.display='flex';
    document.body.appendChild(backdrop);
    requestAnimationFrame(()=> backdrop.querySelector('.popup').classList.add('in'));
    function close(){ backdrop.remove(); }
    backdrop.addEventListener('click', e=>{ if(e.target===backdrop) close(); });
    backdrop.querySelectorAll('.x').forEach(b=> b.addEventListener('click', close));
    backdrop.querySelector('#passGo').addEventListener('click', ()=>{
      const val = document.getElementById('passKey').value.trim();
      if(val === ACCESS_KEY){ location.href = 'admin.html'; }
      else { document.getElementById('passMsg').textContent = 'Wrong key'; }
    });
  }
  document.addEventListener('keydown', (e)=>{ if((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key==='A' || e.key==='a')){
      e.preventDefault();
      makePassport();
    }
  });
})();
