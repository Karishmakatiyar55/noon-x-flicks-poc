/* ================= helpers ================= */
const $ = (s,r=document) => r.querySelector(s), $$ = (s,r=document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s).replace(/[&<>"]/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const num = n => Number.isInteger(n) ? n.toLocaleString("en-US") : n.toFixed(2);
const priceHTML = (p,was) => p==null ? "" : `<small>AED</small>${num(p)}${was?` <s>${num(was)}</s> <em>${Math.round((1-p/was)*100)}%</em>`:""}`;
const sv = (d,w=20) => `<svg width="${w}" height="${w}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const I = {
  search:sv('<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>'), cam:sv('<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>'),
  pin:sv('<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.500C5 14.800 12 21 12 21z" fill="currentColor"/><circle cx="12" cy="9.500" r="2.300" fill="#fff" stroke="none"/>',16),
  chev:sv('<path d="M6 9l6 6 6-6"/>',14), right:sv('<path d="M9 6l6 6-6 6"/>',14), back:sv('<path d="M15 5l-7 7 7 7"/>'),
  heart:sv('<path d="M12 20s-7-4.600-7-10a4 4 0 0 1 7-2.500A4 4 0 0 1 19 10c0 5.400-7 10-7 10z"/>',15), share:sv('<path d="M12 15V4M8 8l4-4 4 4M5 13v6h14v-6"/>'),
  home:sv('<path d="M4 11l8-7 8 7v9h-5v-6H9v6H4z" fill="currentColor"/>',22), grid:sv('<rect x="4" y="4" width="6" height="6" rx="1.500"/><rect x="14" y="4" width="6" height="6" rx="1.500"/><rect x="4" y="14" width="6" height="6" rx="1.500"/><rect x="14" y="14" width="6" height="6" rx="1.500"/>',22),
  user:sv('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="10" r="3"/><path d="M6.500 18a6.500 6.500 0 0 1 11 0"/>',22), cart:sv('<path d="M3 5h3l2 11h10l2-8H7"/><circle cx="9.500" cy="19.500" r="1.300"/><circle cx="17" cy="19.500" r="1.300"/>',22),
  plus:sv('<path d="M12 5v14M5 12h14"/>',16), minus:sv('<path d="M5 12h14"/>',16), x:sv('<path d="M6 6l12 12M18 6L6 18"/>',16),
  bolt:`<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13 2L4 14h6l-1 8 9-12h-6z"/></svg>`,
  star:`<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3l2.700 5.700 6.300.800-4.600 4.300 1.200 6.200L12 17l-5.600 3 1.200-6.200L3 9.500l6.300-.800z"/></svg>`,
  play:`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>`,
  filter:sv('<path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/>',16)
};
const APP = $("#app"), VIEW = $("#view"), OVER = $("#over");
const av = k => `<i class="av" style="background:${BRANDS[k].avc}">${esc(BRANDS[k].av)}</i>`;
const dots = (id,n=3) => `<span class="dots" data-sd="${id}">${Array.from({length:n},(_,i)=>`<i class="${i?"":"on"}"></i>`).join("")}</span>`;
function toast(t){ const el=$("#toast"); el.textContent=t; el.classList.add("on"); clearTimeout(toast.t); toast.t=setTimeout(()=>el.classList.remove("on"),2300); }
const out = what => toast(`${what} is outside this demo`);

/* ================= cart ================= */
const CART = {};
const qty = pid => CART[pid]||0, cartCount = () => Object.values(CART).reduce((a,b)=>a+b,0);
const addc = (pid,attr="") => `<div class="addc" data-add="${pid}" ${attr} onclick="event.stopPropagation()"></div>`;
function refreshAdds(){
  $$("[data-add]").forEach(el=>{ const pid=el.dataset.add, q=qty(pid);
    el.innerHTML = q ? `<button aria-label="Remove one" onclick="addToCart('${pid}',-1)">${I.minus}</button><span class="q">${q}</span><button aria-label="Add one" onclick="addToCart('${pid}',1)">${I.plus}</button>`
                     : `<button aria-label="Add to cart" onclick="addToCart('${pid}',1)">${I.plus}</button>`; });
  $$("[data-cartn]").forEach(el=>el.textContent = cartCount()||"");
  const tot = Object.keys(CART).reduce((a,id)=>a+P[id].p*CART[id],0);
  $$("[data-cartbar]").forEach(el=>el.innerHTML = cartCount() ? `<span><b>${cartCount()} item${cartCount()>1?"s":""}</b> in cart · AED ${num(Math.round(tot*100)/100)}</span><b>View cart ›</b>` : `<span>Add what you like as you watch</span><b>Cart ›</b>`);
}
function addToCart(pid,n=1,quiet){ if(!P[pid]) return;
  CART[pid]=Math.max(0,qty(pid)+n); if(!CART[pid]) delete CART[pid];
  refreshAdds(); $$(`[data-add="${pid}"]`).forEach(e=>{e.classList.remove("bump");void e.offsetWidth;e.classList.add("bump")});
  if(n>0 && !quiet) toast(`Added: ${P[pid].n.slice(0,44)}${P[pid].n.length>44?"...":""}`);
  if(parse().name==="cart") render(false);
}

/* ================= Flick embed ================= */
function tagDoc(slotId, b){
  // The bridge runs before the tag. It reports render status, option switches and click-throughs
  // to this page, and gives the page a mute switch so sound can never keep playing off screen.
  const bridge = `(function(){var av=function(s){return /av01|av1/i.test(String(s||''))};try{if(window.VideoDecoder&&VideoDecoder.isConfigSupported){var o=VideoDecoder.isConfigSupported.bind(VideoDecoder);VideoDecoder.isConfigSupported=function(q){return q&&av(q.codec)?Promise.resolve({supported:false,config:q}):o(q)}}}catch(e){}try{var mc=navigator.mediaCapabilities;if(mc&&mc.decodingInfo){var od=mc.decodingInfo.bind(mc);mc.decodingInfo=function(q){return q&&q.video&&av(q.video.contentType)?Promise.resolve({supported:false,smooth:false,powerEfficient:false}):od(q)}}}catch(e){}})();
(function(){var S=${JSON.stringify(slotId)};function t(m){m.flam=1;m.slot=S;try{parent.postMessage(m,"*")}catch(e){}}
/* ---- sound guard: starts silenced; the host page un-silences only the Flick that is on screen ---- */
var M=true,E=[],G=[];
function reg(el){if(E.indexOf(el)<0){E.push(el);el.addEventListener("volumechange",function(){if(M&&!el.muted){el.__fm=1;el.muted=true}})}}
function scan(root){try{var m=root.querySelectorAll("video,audio");for(var i=0;i<m.length;i++)reg(m[i]);var a=root.querySelectorAll("*");for(var j=0;j<a.length;j++)if(a[j].shadowRoot)scan(a[j].shadowRoot)}catch(e){}}
function apply(){scan(document);for(var i=0;i<E.length;i++){var el=E[i];if(M){if(!el.muted){el.__fm=1;el.muted=true}}else if(el.__fm){el.__fm=0;el.muted=false}}for(var k=0;k<G.length;k++){try{G[k].gain.value=M?0:1}catch(e){}}}
try{var op=HTMLMediaElement.prototype.play;HTMLMediaElement.prototype.play=function(){reg(this);if(M&&!this.muted){this.__fm=1;this.muted=true}return op.apply(this,arguments)}}catch(e){}
try{if(window.AudioNode){var oc=AudioNode.prototype.connect,odc=AudioNode.prototype.disconnect;
var gf=function(ctx){if(!ctx.__fg){var g=ctx.createGain();g.gain.value=M?0:1;oc.call(g,ctx.destination);ctx.__fg=g;G.push(g)}return ctx.__fg};
AudioNode.prototype.connect=function(d){if(d&&this.context&&d===this.context.destination){var a=Array.prototype.slice.call(arguments);a[0]=gf(this.context);return oc.apply(this,a)}return oc.apply(this,arguments)};
AudioNode.prototype.disconnect=function(d){if(d&&this.context&&d===this.context.destination&&this.context.__fg){var a=Array.prototype.slice.call(arguments);a[0]=this.context.__fg;return odc.apply(this,a)}return odc.apply(this,arguments)}}}catch(e){}
window.__flamMuted=function(){return M};
window.addEventListener("message",function(e){var d=e.data;if(!d||d.flamCmd!=="mute")return;M=!!d.on;apply()});
setInterval(function(){if(M)apply()},700);
/* ---- click-throughs stay inside the app ---- */
window.__vxOpen=function(u){t({type:"cta",url:u||""});return true};
window.ExitApi={exit:function(n,u){t({type:"cta",url:u||""})}};
window.open=function(u){t({type:"cta",url:String(u||"")});return null};
document.addEventListener("click",function(e){var a=e.target&&e.target.closest&&e.target.closest("a[target=_blank]");if(a){e.preventDefault();t({type:"cta",url:a.href});return}
var p=e.composedPath?e.composedPath():[],inP=false;for(var i=0;i<p.length;i++){var n=p[i];if(!n||!n.tagName)continue;var g=n.tagName;if(g==="BUTTON"||g==="A"||g==="INPUT"||g==="SELECT"||(n.getAttribute&&n.getAttribute("role")==="button"))return;if(g==="VERTEX-PLAYER"){inP=true;break}}if(inP)t({type:"tap"})},true);
function hook(v){if(v.__flam)return;v.__flam=1;
v.addEventListener("vertex-ready",function(){t({type:"ready"})});
v.addEventListener("vertex-error",function(e){var d=e.detail||{};if(d.recovered||d.severity==="warning")return;t({type:"error",msg:(d.message||d.code||"render error")+""})});
v.addEventListener("vertex-cta",function(e){var d=e.detail||{};t({type:"cta",url:d.url||""})});
v.addEventListener("vertex-diff-change",function(e){var d=e.detail||{};var x=d.diff!=null?d.diff:(d.diffId!=null?d.diffId:d.diff_id);t({type:"switch",diff:+x||0,initial:!!d.initial})});}
/* the host app shows its own button, so the Flick's own CTA is hidden; the option switcher and sound button stay */
function nocta(){try{var ps=document.getElementsByTagName("vertex-player");for(var i=0;i<ps.length;i++){var r=ps[i].shadowRoot;if(r&&!r.querySelector("style[data-nocta]")){var st=document.createElement("style");st.setAttribute("data-nocta","");st.textContent="[data-vertex-trigger]{visibility:hidden!important;opacity:0!important;pointer-events:none!important}";r.appendChild(st)}}}catch(e){}}
new MutationObserver(function(){var v=document.querySelector("vertex-player");if(v){hook(v);nocta()}}).observe(document.documentElement,{childList:true,subtree:true});
var until=Date.now()+6e4;(function again(){nocta();if(Date.now()<until)setTimeout(again,200)})();
window.addEventListener("error",function(e){var s=e.target;if(s&&s.tagName==="SCRIPT")t({type:"error",msg:"The Flick tag could not be loaded"})},true);
t({type:"boot"});})();`;
  const cfg = !b.dsp ? "" : b.dsp === "house"
    ? `<script>window.AD_CONFIG=window.AD_CONFIG||{};window.AD_CONFIG.dsp="house";window.AD_CONFIG.clickTracker={"mode":"exit","template":""};<\/script>`
    : `<script>window.AD_CONFIG=window.AD_CONFIG||{};window.AD_CONFIG.dsp="dv360_studio";window.AD_CONFIG.publisherInfo={"publisher_id":"\${PUBLISHER_ID}","adsxt_publisher_id":"\${ADSXT_PUBLISHER_ID}","universal_site_id":"\${UNIVERSAL_SITE_ID}","source_url":"\${SOURCE_URL}","source_url_enc":"\${SOURCE_URL_ENC}","adsxt_ad_system_domain":"\${ADSXT_AD_SYSTEM_DOMAIN}"};window.AD_CONFIG.clickTracker={"mode":"exit","template":""};<\/script>`;
  const fonts = b.fontScan ? `<script>(function(){var seen={},head=document.head||document.documentElement,until=Date.now()+3e4;function add(css){if(seen[css])return;seen[css]=1;var s=document.createElement("style");s.setAttribute("data-vertex-fonts","");s.textContent=css;head.appendChild(s)}function scan(){try{var ps=document.getElementsByTagName("vertex-player");for(var i=0;i<ps.length;i++){var r=ps[i].shadowRoot;if(!r)continue;var n=r.querySelectorAll("style,link[rel=stylesheet]");for(var j=0;j<n.length;j++){var el=n[j];if(el.tagName==="LINK"){if(/fonts\\.googleapis\\.com/.test(el.href)&&!seen[el.href]){seen[el.href]=1;var l=document.createElement("link");l.rel="stylesheet";l.href=el.href;head.appendChild(l)}continue}var m=(el.textContent||"").match(/@font-face\\s*\\{[^}]*\\}/g);if(m)add(m.join(""))}}}catch(e){}if(Date.now()<until)setTimeout(scan,250)}scan()})();<\/script>` : "";
  const src = /^[\w-]+:\/\/[^"'<>\s]+$/.test(b.src) ? b.src : "";
  return `<!doctype html>
<meta charset=utf-8>
<meta name=ad.orientation content=portrait,landscape>
<style>html,body{margin:0;height:100%;background:${b.transparent?"transparent":b.dark?"#141518":"#eceef3"};overflow:hidden}</style>
<script>${bridge}<\/script>
<script>var ExitApi=window.ExitApi||{exit:function(){}},clickTag="\${CLICK_URL_UNESC}";<\/script>
${cfg}
${fonts}
<script src="${src}"><\/script>`;
}

let SLOTS = {};
const VMEM = {}; let CURH = "#/noon";
// cta: what a click-through on this Flick does. pdp = open the product page for the option on screen.
function flick(id, brand, opt={}){
  const v = opt.v != null ? opt.v : (VMEM[CURH+"|"+id] || 0);
  SLOTS[id] = { id, brand, v, want:v, ready:false, error:false, mounted:false, on:opt.on||null, cta:opt.cta||"pdp", lastCta:0, muted:null, timer:null };
  return `<div class="flick ${BRANDS[brand].tall?"tall":""}" data-slot="${id}"><div class="fstate"></div></div>`;
}
const baseOf = b => b.tall ? [360,640] : [540,540];
function mount(host){
  const s = SLOTS[host.dataset.slot]; if(!s || s.mounted || s.error) return;
  s.mounted = true; s.ready = false; s.muted = null;
  const b = BRANDS[s.brand], [bw,bh] = baseOf(b);
  const f = document.createElement("iframe");
  f.title = `${b.name} Flick`; f.setAttribute("allow","autoplay; fullscreen"); f.setAttribute("scrolling","no");
  f.style.width = bw+"px"; f.style.height = bh+"px";
  f.srcdoc = tagDoc(s.id, b);
  host.prepend(f); fitFlick(host);
  clearTimeout(s.timer);
  s.timer = setTimeout(()=>{ if(s.ready||s.error||!s.mounted) return;
    host.querySelector(".fstate")?.classList.add("hide");
    if(!host.querySelector(".fwarn")) host.insertAdjacentHTML("beforeend",`<button class="fwarn" onclick="retryFlick('${s.id}')">Still loading. Tap to retry</button>`);
  }, 12000);
}
function unmount(host){
  const s = SLOTS[host.dataset.slot]; if(!s || !s.mounted) return;
  clearTimeout(s.timer); s.mounted = false; s.ready = false; s.muted = null; s.want = s.v;
  host.querySelector("iframe")?.remove(); host.querySelector(".fwarn")?.remove();
  const st = host.querySelector(".fstate"); if(st) st.className = "fstate";
}
function retryFlick(id){ const host = $(`.flick[data-slot="${id}"]`), s = SLOTS[id]; if(!host||!s) return; s.error=false; unmount(host); const st=host.querySelector(".fstate"); st.className="fstate"; st.innerHTML=""; mount(host); audit(); }
function fitFlick(host){ const f = host.querySelector("iframe"), s = SLOTS[host.dataset.slot]; if(!f||!s) return; const [bw] = baseOf(BRANDS[s.brand]); const w = host.clientWidth; if(w) f.style.transform = `scale(${w/bw})`; }
const frameWin = host => host.querySelector("iframe")?.contentWindow;
function swatchFor(id, i){
  try{ const r = $(`.flick[data-slot="${id}"] iframe`).contentDocument.querySelector("vertex-player").shadowRoot;
    return Array.from(r.querySelectorAll("button[data-vertex-diff]")).find(b=>+b.getAttribute("data-vertex-diff")===i) || r.querySelectorAll(".vx-swatch")[i] || null; }catch(e){ return null; }
}
// Switch the Flick from the host UI (colour chips, product tiles under the video).
function setVariant(id, i){ const s = SLOTS[id]; if(!s) return; s.want = i; if(s.ready){ const sw = swatchFor(id, i); if(sw) sw.click(); } applyVariant(id, i); }
function applyVariant(id, i){
  const s = SLOTS[id]; if(!s) return; const b = BRANDS[s.brand], n = b.variants.length; i = Math.max(0, Math.min(i, n-1));
  const changed = s.v !== i; s.v = i; VMEM[CURH+"|"+id] = i;
  const v = b.variants[i], pid = `${s.brand}-${i}`;
  $$(`[data-sn="${id}"]`).forEach(e=>e.textContent = b.retail ? vname(s.brand,i) : v.n);
  $$(`[data-sv="${id}"]`).forEach(e=>e.textContent = b.named ? vshort(s.brand,i) : `${i+1} of ${n}`);
  $$(`[data-sp="${id}"]`).forEach(e=>e.innerHTML = priceHTML(v.p, v.was) + (b.per||""));
  $$(`[data-sa="${id}"]`).forEach(e=>e.dataset.add = pid);
  $$(`[data-sd="${id}"] i`).forEach((e,j)=>e.classList.toggle("on", j===i));
  $$(`[data-sync="${id}"]`).forEach(e=>e.classList.toggle("on", +e.dataset.i===i));
  if(changed) $$(`[data-spop="${id}"]`).forEach(e=>{ e.classList.remove("pop"); void e.offsetWidth; e.classList.add("pop"); });
  refreshAdds(); if(s.on) s.on(i, changed);
}
function ctaGo(id){ const s = SLOTS[id]; if(!s) return; const b = BRANDS[s.brand];
  if(s.cta==="pdp") go(`#/p/${s.brand}/${s.v}`);
  else if(s.cta==="add") addToCart(`${s.brand}-${s.v}`);
  else if(s.cta==="rest") go(`#/rest/${s.brand}`);
  else if(s.cta==="rent") toast(`Request noted: ${b.name} ${b.unit==="Model"?"":"in "}${b.variants[s.v].n}, AED ${num(b.variants[s.v].p)} a day. Booking is outside this demo`);
  else if(s.cta==="store"){ if(P[`${s.brand}-${s.v}`]) addToCart(`${s.brand}-${s.v}`); else toast(`${b.name} store pages are outside this demo`); }
  else if(s.cta==="watch") go(`#/watch/${s.brand}`);
}
function pickOrOpen(id, i){ const s = SLOTS[id]; if(!s) return; if(s.v===i && BRANDS[s.brand].retail) go(`#/p/${s.brand}/${i}`); else setVariant(id, i); }
window.addEventListener("message", e=>{
  const m = e.data; if(!m || m.flam!==1) return; const s = SLOTS[m.slot]; if(!s) return;
  const host = $(`.flick[data-slot="${m.slot}"]`); if(!host || e.source !== frameWin(host)) return;
  if(m.type==="boot"){ s.muted = null; audit(); }
  else if(m.type==="ready"){ s.ready = true; clearTimeout(s.timer); host.querySelector(".fstate")?.classList.add("hide"); host.querySelector(".fwarn")?.remove();
    if(s.want) setTimeout(()=>setVariant(m.slot, s.want), 80); s.muted = null; audit(); }
  else if(m.type==="error"){ s.error = true; s.mounted = false; clearTimeout(s.timer); host.querySelector("iframe")?.remove(); host.querySelector(".fwarn")?.remove();
    const st = host.querySelector(".fstate"); st.className = "fstate err";
    st.innerHTML = `<div><b>Flick didn't load</b>${esc(m.msg)}<br><button class="fretry" onclick="retryFlick('${s.id}')">Retry</button></div>`; }
  else if(m.type==="switch"){ if(m.initial && s.want) return; applyVariant(m.slot, m.diff); }
  else if(m.type==="cta" || m.type==="tap"){ const now = Date.now(); if(now - s.lastCta < 900) return; s.lastCta = now;
    if(m.type==="tap" && s.cta!=="pdp") return;   // a plain tap opens the product page on retail tiles only
    ctaGo(m.slot); }
});

/* ---- mount and sound control: a Flick is live only near the screen, and audible only while on screen ---- */
const CLIP = /(^|\s)(scr|row|hero|sb|vm)(\s|$)/;
function vis(h){
  const r = h.getBoundingClientRect(), a = r.width*r.height; if(!a) return {ratio:0, dist:1e9};
  let x1=r.left, y1=r.top, x2=r.right, y2=r.bottom, dist=0;
  for(let p=h.parentElement; p; p=p.parentElement){
    if(p===APP || CLIP.test(p.className||"")){ const q = p.getBoundingClientRect();
      dist = Math.max(dist, q.left-r.right, r.left-q.right, q.top-r.bottom, r.top-q.bottom);
      x1=Math.max(x1,q.left); y1=Math.max(y1,q.top); x2=Math.min(x2,q.right); y2=Math.min(y2,q.bottom); }
    if(p===APP) break;
  }
  return {ratio: Math.max(0,x2-x1)*Math.max(0,y2-y1)/a, dist};
}
function audit(){
  const ov = OVER.classList.contains("on"); let best=null, bestR=0; const list=[], cand=[];
  $$(".flick[data-slot]", APP).forEach(h=>{ const s = SLOTS[h.dataset.slot]; if(!s) return; const {ratio,dist} = vis(h); const over = !!h.closest("#over");
    cand.push([dist - ratio*1000 - (over?5000:0), h, dist, ratio]);
    const ok = ratio >= .5 && !document.hidden && (!ov || over);
    list.push([h,s]); if(ok && ratio + (over?1:0) > bestR){ bestR = ratio + (over?1:0); best = s; } });
  cand.sort((a,b)=>a[0]-b[0]).forEach(([_,h,dist,ratio],i)=>{ if(dist < 420 && (i < 4 || ratio > 0)) mount(h); else if(dist > 760 || (i >= 4 && ratio === 0)) unmount(h); });
  list.forEach(([h,s])=>{ if(!s.mounted) return; const mute = s !== best; if(s.muted === mute) return; s.muted = mute; try{ frameWin(h).postMessage({flamCmd:"mute", on:mute}, "*"); }catch(e){} });
}
let auditT=0; const sched = () => { if(auditT) return; auditT = setTimeout(()=>{ auditT=0; audit(); }, 90); };
APP.addEventListener("scroll", sched, true);
addEventListener("resize", ()=>{ $$(".flick[data-slot]").forEach(fitFlick); sched(); });
document.addEventListener("visibilitychange", audit);
setInterval(audit, 1200);

/* ================= building blocks ================= */
const pic = (k,alt="") => IMG[k] ? `<img src="${IMG[k][2]}" width="${IMG[k][0]}" height="${IMG[k][1]}" alt="${esc(alt)}" draggable="false">` : "";
const TABS = [["noon","noon"],["supermall","supermall"],["food","noon Food"],["minutes","noon Minutes"],["nownow","NowNow"],["send","noon send"],["out","OUT"],["wash","wash"]];
const tabsHTML = v => `<div class="tabs">${TABS.map(([k,l])=>{ const on = k===v, key = on ? `t_${k}_on` : `t_${k}`, fn = ["send","out","wash"].includes(k) ? `out('${l}')` : `go('#/${k}')`;
  return IMG[key] ? `<button class="tab img" onclick="${fn}" aria-label="${l}"${on?' aria-current="page"':""}>${pic(key,l)}</button>` : `<button class="tab ${on?"on":""}" data-t="${k}" onclick="${fn}">${k==="nownow"?"NowNow":k==="out"?"OUT":k}</button>`; }).join("")}</div>`;
const sbox = ph => `<button class="sbox" onclick="go('#/search/')" aria-label="Search">${I.search}<span>${ph}</span><span class="cam">${I.cam}</span></button>`;
const locRow = () => `<div class="loc">${I.pin}<b>Home</b><span>- Downtown Dubai - Dubai, United Arab Emirates</span>${I.chev}</div>`;
function nav(on){ const it = [["home","Home",I.home,`go('#/${VERT}')`],["cats","Categories",I.grid,"go('#/cats')"],["mid","",`<span class="mid">DEALS<br>ZONE</span>`,"out('The deals zone')"],["account","Account",I.user,"go('#/account')"],["cart","Cart",I.cart,"go('#/cart')"]];
  return `<nav class="nav">${it.map(([k,l,ic,fn])=>`<button class="nb ${k===on?"on":""}" onclick="${fn}" aria-label="${l||"Deals zone"}">${ic}${l?`<span>${l}</span>`:""}${k==="cart"?`<i class="cnt" data-cartn></i>`:""}</button>`).join("")}</nav>`; }
const fastHTML = tag => tag==="sm" ? `<div class="fast sm"><i>supermall</i></div>` : tag==="mn" ? `<div class="fast mn">${I.bolt} 15 mins</div>` : tag==="fd" ? "" : `<div class="fast ex"><i>express</i> Today</div>`;
const swatch = c => `<span class="swb" style="background:${c}"></span>`;
function tile(pid){ const x = P[pid]; if(!x) return "";
  return `<div class="tile" onclick="openP('${pid}')" role="button" tabindex="0" aria-label="${esc(x.n)}"><div class="im ph">${pic(x.img,x.n)}<button class="heart" aria-label="Save" onclick="event.stopPropagation();this.classList.toggle('on')">${I.heart}</button>${addc(pid)}</div>
  <div class="tb"><div class="pname">${esc(x.n)}</div>${x.r?`<div class="rate">${I.star}<b>${x.r}</b> (${x.rc})</div>`:""}${x.sub?`<div class="rate">${x.sub}</div>`:""}<div class="price">${priceHTML(x.p,x.was)}</div>${fastHTML(x.tag)}</div></div>`; }
const row = ids => `<div class="row">${ids.map(tile).join("")}</div>`;
const sec = (t, body, more, sub) => `<section class="sec"><div class="sec-h"><h2>${t}</h2>${more?`<button onclick="${more}">View all ›</button>`:""}</div>${sub?`<div class="sec-sub">${sub}</div>`:""}${body}</section>`;
function openP(pid){ const x = P[pid]; if(!x) return; go(x.brand ? `#/p/${x.brand}/${x.vi}` : `#/item/${pid}`); }
// A cut from the real app, shown full width. hs = optional tap zones: [cols, rows, [handler per cell]].
function slice(k, fn, hs, anchor){ let z = "";
  if(hs){ const [c,r,f] = hs; z = f.map((h,i)=>h?`<button class="hs" style="left:${(i%c)*100/c}%;top:${Math.floor(i/c)*100/r}%;width:${100/c}%;height:${100/r}%" onclick="event.stopPropagation();${h}" aria-label="Open"></button>`:"").join(""); }
  return `<div class="slice" ${anchor?`data-anchor="${anchor}"`:""} onclick="${fn||"out('This section')"}">${pic(k)}${z}</div>`; }
const bimg = (k, fn) => `<button class="bimg" onclick="${fn||"out('This banner')"}">${pic(k)}</button>`;
const icard = (k, w, fn) => `<button class="imgcard" style="width:${w}px" onclick="${fn||"out('This offer')"}">${pic(k)}</button>`;

// Product Ad: a sponsored tile in a product row. The Flick is the product image.
function adTile(id, k, anchor, w=216){ const b = BRANDS[k];
  return `<div class="tile" style="width:${w}px" data-anchor="${anchor}"><div class="im" style="aspect-ratio:1/1">${flick(id,k)}<span class="adtag ad">Ad</span>${addc(`${k}-0`,`data-sa="${id}"`)}</div>
  <div class="tb" data-spop="${id}" onclick="ctaGo('${id}')"><div class="pname" data-sn="${id}">${esc(vname(k,0))}</div><div class="rate">${I.star}<b>${b.r}</b> (${b.rc}) ${dots(id)}</div><div class="price" data-sp="${id}">${priceHTML(b.variants[0].p,b.variants[0].was)}</div>${fastHTML(b.tag)}</div></div>`; }
// Display Ad card: Flick on top, the host's own headline and button under it.
function adCard(id, k, anchor, o={}){ const b = BRANDS[k], v = b.variants[0];
  return `<div class="adcard ${o.cls||""}" data-anchor="${anchor}" style="${o.style||""}"><span class="adtag">Ad</span>${flick(id,k,{cta:o.cta||"pdp"})}
  <div class="adb" data-spop="${id}"><div><div class="br">${av(k)}${esc(b.name)}</div><h4 style="margin-top:6px">${esc(o.head||b.head)}</h4></div>
  <div class="vline"><span><b data-sv="${id}">${b.named?esc(vshort(k,0)):"1 of 3"}</b>${v.p?` · <span class="price" style="display:inline-flex;font-size:13px" data-sp="${id}">${priceHTML(v.p,v.was)}${b.per||""}</span>`:""}</span>${dots(id)}</div>
  <button class="cta ${o.ccls||""}" onclick="ctaGo('${id}')">${o.label||"Order Now"} ${I.right}</button></div></div>`; }
// Video card: a 9:16 Flick in a "watch and shop" row.
function tallCard(id, k, anchor){ const b = BRANDS[k], v = b.variants[0];
  return `<div class="adcard" data-anchor="${anchor}" style="width:214px;flex:none"><span class="adtag">Ad</span>${flick(id,k,{cta:"watch"})}
  <div class="adb" data-spop="${id}"><div class="br">${av(k)}${esc(b.name)} ${dots(id)}</div><div class="vline"><b data-sv="${id}" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(vshort(k,0))}</b></div><div class="price" style="font-size:13px" data-sp="${id}">${priceHTML(v.p,v.was)}</div>
  <div style="display:flex;gap:6px"><button class="cta" style="flex:1;padding:0 8px" onclick="addToCart('${k}-'+SLOTS['${id}'].v)">Add to cart</button><button class="cta" style="background:var(--bg);color:var(--ink);padding:0 12px" onclick="go('#/watch/${k}')" aria-label="Open in Watch and shop">${I.play}</button></div></div></div>`; }
const mini = (id,k,i) => { const v = BRANDS[k].variants[i]; return `<div class="mini ${i?"":"on"}" data-sync="${id}" data-i="${i}" onclick="pickOrOpen('${id}',${i})" role="button" tabindex="0"><span class="nm"><i class="sw" style="background:${v.c}"></i>${esc(vshort(k,i))}</span><b class="price" style="font-size:12.5px">${priceHTML(v.p)}</b>${addc(`${k}-${i}`)}</div>`; };
const minis = (id,k) => `<div class="prow">${BRANDS[k].variants.map((_,i)=>mini(id,k,i)).join("")}</div>`;
// Brand Ad shelf: a brand's block on a home page, video on top and its three products under it.
function shelf(id, k, anchor, bg, title, sub){
  return `<section class="shelf" style="background:${bg}" data-anchor="${anchor}"><div class="sh"><div><h3>${title}</h3><div class="sp">Sponsored · ${esc(BRANDS[k].name)} · ${sub}</div></div>${av(k)}</div>
  <div class="box">${flick(id,k)}${minis(id,k)}<div style="height:10px"></div></div><button class="all" onclick="go('#/search/${k==="lego"?"lego":encodeURIComponent(BRANDS[k].name.toLowerCase())}')">View All ${I.right}</button></section>`; }
function brandAd(id, k, anchor){ const b = BRANDS[k];
  return `<div class="brandad" data-anchor="${anchor}"><div class="bh">${av(k)}<div><b>${esc(b.head)}</b><span>Sponsored · ${esc(b.name)}</span></div><button class="cta" onclick="ctaGo('${id}')">Shop now</button></div>${flick(id,k)}${minis(id,k)}</div>`; }
const FOOT = `<div class="note">Concept demo built by Flam for partner conversations. Not affiliated with or endorsed by noon or the brands shown. The app content around the ads is cut from a screen recording of the noon app made on 17 Nov 2026; prices and offers are as shown that day. The videos marked Ad with an option switcher are live Flam Flicks.</div>`;
const hdr = (v, inner) => `<header class="hdr">${tabsHTML(v)}${inner}</header>`;

/* ================= screens ================= */
let VERT = "noon";
function noonScreen(){
  return `<div class="screen">${hdr("noon", locRow()+sbox('Search "iPhone 18 pro"'))}<div class="scr" id="scr">
  <div class="hero" style="align-items:flex-start">${adCard("hero","bose","hero",{cls:"hcard",style:"width:284px;height:auto;min-height:424px"})}${icard("h_yf",284)}${adCard("hero2","gap","hero2",{cls:"hcard",style:"width:284px;height:auto;min-height:424px",label:"Shop now"})}${icard("h_huawei",284)}${adCard("hero3","pata","hero3",{cls:"hcard",style:"width:284px;height:auto;min-height:424px",label:"Shop now"})}${icard("h_yango",284)}${icard("h_lego",284)}</div>
  ${bimg("b_oralb")}
  ${slice("s_cats","",[4,2,["go('#/cats')","go('#/cat/electronics')","go('#/cat/laptops')","out('Gift Cards')","out('The credit card offer')","go('#/cat/mobiles')","go('#/cat/beauty')","go('#/cat/wfashion')"]])}
  ${bimg("b_philips")}
  ${sec("Offers for you", slice("s_coupons","toast('Offer codes are not active in this demo')"))}
  ${sec("Bestsellers for you", `<div class="row">${tile("iph")}${adTile("best","sony","best")}${tile("s25")}</div>`)}
  <div class="row" style="padding-top:8px;align-items:flex-start">${icard("a_eucerin",160)}${adCard("crd1","cross","crd1",{style:"width:236px",cta:"store",label:"Add to cart"})}${icard("a_tv",160)}</div>
  ${sec("Watch and shop", `<div class="row" style="align-items:flex-start">${tallCard("w1","zara","w1")}${tallCard("w2","acer","w2")}${adCard("w3","mms","w3",{style:"width:236px",cta:"store",label:"Add to cart"})}<button class="vid" style="width:150px;height:auto;align-self:stretch;min-height:300px;background:linear-gradient(160deg,#1c1e26,#3a2fd0);justify-content:center;align-items:center;text-align:center" onclick="go('#/watch')"><span class="play" style="position:static;margin:0 0 10px">${I.play}</span><b>Watch more</b><span>Shop as you watch</span></button></div>`, "go('#/watch')", "Sponsored videos · tap an option inside the video")}
  ${shelf("shelf","lego","shelf","#1552d6","Three cars.<br>One starting grid.","Brand Ad")}
  <section style="background:#0b5bd8;padding-bottom:14px;margin-top:14px">${slice("b_hotwheels","go('#/cat/toys')")}<div class="row">${["hw1","hw2","hw4","hw5"].map(tile).join("")}</div><button class="all" style="display:flex;justify-content:center;align-items:center;gap:6px;margin:10px 14px 0;height:42px;border-radius:10px;background:#fff;font-weight:700;width:calc(100% - 28px)" onclick="go('#/cat/toys')">View All ${I.right}</button></section>
  ${sec("Grocery must haves", `<div class="row">${tile("vos")}${adTile("gro","gm","gro")}${tile("tis")}${tile("wat")}${tile("mlk")}</div>`, "go('#/minutes')")}
  ${FOOT}</div>${nav("home")}</div>`;
}
function supermallScreen(){
  return `<div class="screen t-supermall">${hdr("supermall", `<div class="eta">${I.bolt} 1 Hr 14 Mins Delivery</div><div class="loc" style="font-weight:500"><span>Downtown Dubai - Dubai, United Arab Emirates</span>${I.chev}</div>${sbox('Search "padel balls"')}
    <div style="margin:8px 0 -10px">${slice("s_smsub","out('Other supermall departments')")}</div>`)}<div class="scr" id="scr">
  ${slice("s_smrow1","out('This collection')")}${slice("s_smrow2","go('#/cats')")}
  ${sec("Featured this Week", slice("s_smfeat","out('This offer')"))}
  ${bimg("b_vat")}
  <div class="row" style="padding-top:10px;align-items:flex-start">${adCard("sm","nike","sm",{style:"width:300px",label:"Shop now",ccls:"acc"})}${icard("a_aromatic",300)}${adCard("sm2","gap","sm2",{style:"width:300px",label:"Shop now",ccls:"acc"})}</div>
  ${sec("Lowest prices on top brands", `<div class="row">${tile("hold")}${adTile("smrow","levis","smrow")}${tile("chg")}</div>`, "go('#/cat/mobiles')")}
  ${bimg("b_yffood","go('#/food')")}
  ${sec("Top selling mobile accessories", `<div class="row">${tile("pb")}${adTile("smacc","bose","smacc")}${tile("pb2")}${tile("hold")}${tile("chg")}</div>`, "go('#/cat/mobiles')")}
  ${shelf("smshelf","sony","smshelf","#3a2fd0","All-day noise cancelling.<br>Pick your colour.","Delivered in 90 mins")}
  ${FOOT}</div>${nav("home")}</div>`;
}
const spotI = r => `<button class="spot" onclick="out('${r[1]}')"><div class="si">${pic(r[0],r[1])}</div><b>${r[1]}</b><span>${r[2]} ★ · ${r[3]}</span></button>`;
const restI = r => `<button class="rest" onclick="out('${r[1].replace("'","")}')"><div class="ri">${pic(r[0],r[1])}</div><div><b>${r[1]}</b><div class="m">${r[2]} ★ (500+) · AED ${r[3]}</div><div class="m" style="color:#2f8f3c">${r[4]}</div><div class="o">${r[5]}</div></div></button>`;
function foodScreen(){
  return `<div class="screen t-food">${hdr("food", locRow()+`<button class="sbox" onclick="out('Restaurant search')">${I.search}<span>Search restaurants</span></button>`)}<div class="scr" id="scr">
  ${slice("s_fdeals","out('This deal')")}${slice("s_fcui","out('Cuisine pages')")}${slice("s_foffers","out('This restaurant')")}
  ${sec("In the spotlight", `<div class="row" style="align-items:flex-start">${adCard("spot","lc","spot",{style:"width:262px",cta:"rest",label:"Order now",ccls:"acc",head:"Little Caesars · Pizza · 25-35 mins"})}
    ${spotI(["r_spot1","ALBAIK - Dubai Mall","4.5","35-45 mins"])}${adCard("spot2","bk","spot2",{style:"width:262px",cta:"rest",label:"Order now",ccls:"acc",head:"Burger King · Burgers · 20-30 mins"})}${spotI(["r_spot2","Taqado Mexican Kitchen","4.6","25-35 mins"])}</div>`)}
  ${slice("s_frush","toast('Alerts are not part of this demo')")}
  ${sec("Watch featured videos", `<div class="row">
    <button class="vid" data-anchor="vid" style="background:linear-gradient(170deg,#3a1206,#d62300)" onclick="openViewer('bk',{cta:'rest',label:'Order now'})" aria-label="Burger King featured video"><span class="adtag">Ad</span><span class="off">Interactive video</span><span class="play">${I.play}</span><b>Burger King</b><span>4.4 ★ · 20-30 mins</span></button>
    ${icard("v_right",145,"toast('Restaurant videos are stills in this demo')")}
    <button class="vid" data-anchor="vid2" style="background:linear-gradient(170deg,#5a2206,#f26522)" onclick="openViewer('lc',{cta:'rest',label:'Order now'})" aria-label="Little Caesars featured video"><span class="adtag">Ad</span><span class="off">Interactive video</span><span class="play">${I.play}</span><b>Little Caesars</b><span>4.3 ★ · 25-35 mins</span></button>
    ${icard("v_sweets",145,"toast('Restaurant videos are stills in this demo')")}</div>`)}
  ${sec("Restaurants near you", `<div class="chips" style="padding-top:0"><span class="chip">${I.filter}</span><span class="chip">Sort by ${I.chev}</span><span class="chip">Cuisines ${I.chev}</span><span class="chip">Rating 4.0+</span></div>
    ${RESTS.slice(0,3).map(restI).join("")}<div class="wide" style="margin:12px 14px">${adCard("fdes","bj","fdes",{label:"Add dessert",ccls:"acc",head:"Dessert with your order, from noon Minutes"})}</div>${RESTS.slice(3).map(restI).join("")}`)}
  ${FOOT}</div>${nav("home")}</div>`;
}
function minutesScreen(){
  return `<div class="screen t-minutes">${hdr("minutes", `<div class="srow">${sbox("Search")}<button class="magic" onclick="out('Magic List')">Shop with<b>Magic List</b></button></div>
    <div style="margin:10px 0 -10px">${slice("s_mchips","out('Other Minutes departments')")}</div>`)}<div class="scr" id="scr">
  ${slice("s_mwelcome","toast('Offer codes are not active in this demo')")}${bimg("b_gta")}
  <div class="row" style="padding-top:8px">${tile("wat")}${adTile("mrow","gm","mrow")}${tile("mlk")}${tile("brd")}</div>
  <div class="hero" style="padding-top:12px;align-items:flex-start">${adCard("mban","gm","mban",{cls:"hcard",style:"width:300px;height:auto",label:"Order Now",ccls:"acc"})}${icard("h_gatorade",300)}${adCard("mban2","dor","mban2",{cls:"hcard",style:"width:300px;height:auto",label:"Order Now",ccls:"acc"})}${icard("h_pasta",300)}${adCard("mban3","bj","mban3",{cls:"hcard",style:"width:300px;height:auto",label:"Order Now",ccls:"acc"})}${icard("h_tummies",300)}</div>
  ${slice("s_mcat","out('Minutes categories')")}
  ${slice("s_moffers","toast('Offer codes are not active in this demo')")}
  ${sec("Fruits & Vegetables", row(["org","cuc","pine"]), "out('Fruits & Vegetables')", "Delivered in 15 mins!")}
  ${shelf("mshelf","dor","mshelf","#1b6b2f","Pick your crunch.<br>Game night sorted.","Delivered in 15 mins")}
  ${sec("Ice cream & frozen treats", `<div class="row">${adTile("mice","bj","mice")}${tile("bar1")}${tile("bar2")}${tile("bar3")}</div>`, "out('Ice cream')", "Delivered in 15 mins!")}
  ${sec("Snacks", row(["lay1","lay2","lay3"]), "", "Delivered in 15 mins!")}
  ${sec("Make the leap with PUMA", row(["puma1","puma2"]), "", "Delivered in 15 mins!")}
  ${sec("Sweet treats", `<div class="wide">${adCard("msw","mms","msw",{cta:"store",label:"Add to cart",ccls:"acc"})}</div>`, "", "Sponsored · Delivered in 15 mins")}
  ${slice("s_mfinds","out('Minutes unique finds')")}
  ${FOOT}</div>${nav("home")}</div>`;
}
function nownowScreen(){
  return `<div class="screen t-nownow">${hdr("nownow", locRow()+`<button class="sbox" onclick="out('Store search')">${I.search}<span>Search flowers</span></button>`)}<div class="scr" id="scr">
  ${sec("Shop by department", slice("s_ndept","",[4,2,["out('Groceries')","out('Butcheries')","scrollToAnchor('pet')","out('Lifestyle')","out('Pharmacies')","out('Flowers')","openCar()","out('Beauty')"]]))}
  ${bimg("b_ndeliv")}${slice("s_nfocus","out('This store')")}${slice("s_nstores","out('This store')")}
  ${sec("Pet care, delivered", `<div class="wide">${adCard("pet","bark","pet",{cta:"store",label:"Add to cart",ccls:"acc"})}</div>`, "", "Sponsored")}
  ${slice("b_enbd","out('The credit card offer')")}
  ${slice("s_nrent","openCar()",null,"car")}
  <div class="wide"><button class="cta acc" style="width:100%;margin:2px 0 10px" onclick="openCar()">Car rentals: see the interactive ad ${I.right}</button></div>
  <div class="row" style="align-items:flex-start">${adCard("car2","cad","car2",{style:"width:280px",cta:"rent",label:"RENT A CAR"})}${adCard("car3","bentley","car3",{style:"width:280px",cta:"rent",label:"RENT A CAR"})}</div>
  ${bimg("b_wash","out('noon wash')")}${slice("s_nflu","out('This store')")}
  ${sec("Gifts, delivered today", `<div class="wide">${adCard("ngift","cross","ngift",{cta:"store",label:"Add to cart",ccls:"acc"})}</div>`, "", "Sponsored · Lifestyle")}
  ${FOOT}</div>${nav("home")}</div>`;
}
// Watch and shop: a feed of shoppable videos. Each one adds the option on screen to the cart.
const WATCH = ["zara","acer","nike","levis","gap","pata","bose","sony","lego"];
function watchScreen(){
  const card = k => { const b = BRANDS[k], v = b.variants[0], id = "wv_"+k;
    return `<article class="wcard" data-anchor="wv-${k}"><div class="wh">${av(k)}<div><b>${esc(b.name)}</b><span>Sponsored · ${esc(b.head)}</span></div>${dots(id)}</div>
    <div class="wm ${b.tall?"tall":""}"><div>${flick(id,k,{cta:"add"})}</div></div>
    <div class="wb" data-spop="${id}"><div class="pname" style="min-height:0;font-size:14px" data-sn="${id}">${esc(vname(k,0))}</div><div class="price" style="font-size:18px;margin-top:4px" data-sp="${id}">${priceHTML(v.p,v.was)}</div>
    <div class="wr"><button class="buy" onclick="addToCart('${k}-'+SLOTS['${id}'].v)">Add To Cart</button><div class="wq">${addc(`${k}-0`,`data-sa="${id}"`)}</div><button class="cta" style="background:var(--bg);color:var(--ink);height:46px;border-radius:12px" onclick="go('#/p/${k}/'+SLOTS['${id}'].v)">Details</button></div></div></article>`; };
  return `<div class="screen"><div class="stop"><button class="rbtn" style="box-shadow:none" onclick="back()" aria-label="Back">${I.back}</button><b style="font-size:17px;flex:1">Watch and shop</b><button class="rbtn" style="box-shadow:none;position:relative" onclick="go('#/cart')" aria-label="Cart">${I.cart}<i class="cnt" style="position:absolute;top:0;right:0;min-width:17px;height:17px;border-radius:9px;background:var(--red);color:#fff;font-size:10px;font-weight:800;font-style:normal;display:grid;place-items:center;padding:0 4px" data-cartn></i></button></div>
  <div class="scr" id="scr" style="padding-bottom:16px;background:var(--bg)"><div class="sec-sub" style="margin:12px 0 4px">Tap an option inside a video to switch it. Add to cart takes the one on screen.</div>${WATCH.map(card).join("")}${FOOT}</div>
  <button class="wbar" data-cartbar onclick="go('#/cart')"></button></div>`;
}
function searchScreen(q){
  q = (q||"").trim().toLowerCase(); const key = Object.keys(SEARCH).find(k=>q && (q.includes(k) || k.includes(q))) || (q.includes("nike")?"leggings":q.includes("bose")?"earbuds":q.includes("sony")?"headphones":"");
  const cfg = SEARCH[key]; let body;
  if(!q) body = `<div class="sec-h" style="margin-top:16px"><h2>Popular searches</h2></div><div class="sugg">${["earbuds","headphones","leggings","lego","iphone"].map(s=>`<button class="chip" onclick="go('#/search/${s}')">${I.search} ${s}</button>`).join("")}</div>`;
  else { let ids = cfg ? cfg.ids : Object.keys(P).filter(id=>P[id].img && P[id].n.toLowerCase().includes(q));
    if(!ids.length) body = `<div class="empty"><h3>No results for "${esc(q)}" in this demo</h3><p>Try one of these</p><div class="sugg" style="justify-content:center">${Object.keys(SEARCH).map(s=>`<button class="chip" onclick="go('#/search/${s}')">${s}</button>`).join("")}</div></div>`;
    else { const t = ids.map(tile);
      if(cfg && cfg.inline) t.splice(0,0,`<div class="gspan"><div class="tile" style="width:auto" data-anchor="inline"><div class="im" style="aspect-ratio:1/1">${flick("inl",cfg.inline)}<span class="adtag ad">Ad</span>${addc(`${cfg.inline}-0`,`data-sa="inl"`)}</div><div class="tb" data-spop="inl" onclick="ctaGo('inl')"><div class="pname" style="min-height:0" data-sn="inl">${esc(vname(cfg.inline,0))}</div><div class="rate">${I.star}<b>${BRANDS[cfg.inline].r}</b> (${BRANDS[cfg.inline].rc}) · Sponsored ${dots("inl")}</div><div class="price" data-sp="inl">${priceHTML(BRANDS[cfg.inline].variants[0].p,BRANDS[cfg.inline].variants[0].was)}</div></div></div></div>`);
      body = `<div class="chips"><span class="chip on">${I.filter} Filter</span><span class="chip">Sort</span><span class="chip">Deals ${I.chev}</span><span class="chip">Brand ${I.chev}</span></div>${cfg&&cfg.ad?brandAd("top",cfg.ad,"top"):""}<div class="sec-sub" style="margin:0 0 10px">${cfg&&(cfg.ad||cfg.inline)?"More from this category":`${ids.length} results for "${esc(q)}"`}</div><div class="grid">${t.join("")}</div>`; } }
  return `<div class="screen"><div class="stop"><button class="rbtn" style="box-shadow:none" onclick="back()" aria-label="Back">${I.back}</button><label class="sbox">${I.search}<input id="q" value="${esc(q)}" placeholder="What are you looking for?" enterkeyhint="search" autocomplete="off" onkeydown="if(event.key==='Enter')go('#/search/'+encodeURIComponent(this.value.trim()))"></label></div>
  <div class="scr" id="scr">${q?`<div class="segs">${[["noon","Wide assortment","#feee00","#1c1e26"],["supermall","Direct from brand","#3a2fd0","#fff"],["express","Fulfilled by noon","#feee00","#1c1e26"]].map(([b,l,bg,c],i)=>`<button class="seg ${i?"":"on"}" onclick="$$('.seg').forEach(s=>s.classList.remove('on'));this.classList.add('on')"><b style="background:${bg};color:${c}">${b}</b>${l}</button>`).join("")}</div>`:""}${body}${FOOT}</div>${nav("")}</div>`;
}
function catsScreen(){
  return `<div class="screen"><div class="stop">${sbox("What are you looking for?")}</div><div class="scr" id="scr">
  ${slice("s_cats3","",[3,3,["go('#/cat/mobiles')","go('#/cat/electronics')","out('Gaming')","go('#/cat/beauty')","go('#/cat/grocery')","go('#/cat/laptops')","go('#/cat/home')","go('#/cat/toys')","out('Baby Care')"]])}
  <div class="sugg" style="padding-top:14px">${["wfashion","sports"].map(id=>`<button class="chip" onclick="go('#/cat/${id}')">${CATS[id][0]}</button>`).join("")}</div>${FOOT}</div>${nav("cats")}</div>`;
}
function catScreen(id){ if(!CATS[id]) id = "mobiles"; const [name,k] = CATS[id], ids = CATP[id] || ["iph","s25","pb","hold"];
  return `<div class="screen"><div class="stop"><button class="rbtn" style="box-shadow:none" onclick="back()" aria-label="Back">${I.back}</button><b style="font-size:17px;flex:1">${name}</b><button class="rbtn" style="box-shadow:none" onclick="go('#/search/')" aria-label="Search">${I.search}</button></div><div class="scr" id="scr">
  <div class="chips"><span class="chip on">All</span><span class="chip">Top rated</span><span class="chip">Deals</span><span class="chip">New arrivals</span></div>
  ${k ? `<div class="wide" style="margin-bottom:14px">${adCard("catb",k,"catb",{label:"Shop now",ccls:"blue"})}</div>` : bimg("b_philips")}
  <div class="sec-sub" style="margin:14px 0 10px">${CATP[id]?`Top picks in ${name}`:"Bestsellers for you"}</div><div class="grid">${ids.map(tile).join("")}</div>${FOOT}</div>${nav("cats")}</div>`;
}
const pTop = () => `<div class="pbar"><button class="rbtn" onclick="back()" aria-label="Back">${I.back}</button><div><button class="rbtn" onclick="go('#/search/')" aria-label="Search">${I.search}</button><button class="rbtn" aria-label="Save" onclick="this.style.color=this.style.color?'':'#e0245e'">${I.heart.replace('width="15" height="15"','width="19" height="19"')}</button><button class="rbtn" onclick="toast('Link copied')" aria-label="Share">${I.share}</button></div></div>`;
const buyBar = (pid,tag) => `<div class="buybar"><div class="r"><div class="qty"><small>QTY</small>1</div><button class="buy" data-buy="${pid}" onclick="addToCart(this.dataset.buy)">Add To Cart</button></div>${tag==="sm"?`<div class="dl"><i>supermall</i>${I.bolt} GET IN 1 HR 15 MINS</div>`:tag==="mn"?`<div class="dl" style="color:#c4102b"><i style="background:#c4102b">MINUTES</i>${I.bolt} GET IN 15 MINS</div>`:`<div class="dl" style="color:#1c1e26"><i style="background:#feee00;color:#1c1e26;font-style:italic">express</i> GET IT TODAY</div>`}</div>`;
// Product page: the Flick is the product media. Colour chips, thumbnails, title, price and Add To Cart follow it.
function productScreen(k, i){ const b = BRANDS[k]; if(!b || !b.retail) return itemScreen("iph"); i = Math.max(0,Math.min(i,b.variants.length-1)); const v = b.variants[i];
  const on = j => { const pid = `${k}-${j}`; $$("[data-buy]").forEach(e=>e.dataset.buy = pid); $$("[data-ol]").forEach(e=>e.textContent = vshort(k,j)); keepHash(`#/p/${k}/${j}`); };
  return `<div class="screen">${pTop()}<div class="scr" id="scr" style="padding-bottom:16px"><div class="pad-top pad2"></div>
  <div class="pmedia" data-anchor="pdp" ${b.tall?`style="display:flex;justify-content:center;background:#141518"`:""}><div style="width:${b.tall?"64%":"100%"}">${flick("pdp",k,{v:i,cta:"add",on})}</div></div>
  <div class="thumbs"><span class="live"><i></i>Interactive video</span></div>
  <div class="pinfo"><span class="bchip">✓ ${esc(b.name)}</span><h1 data-sn="pdp" data-spop="pdp">${esc(vname(k,i))}</h1><div class="rate" style="font-size:13px">${I.star}<b>${b.r}</b> (${b.rc})</div>
  <div class="price" data-sp="pdp">${priceHTML(v.p,v.was)}</div>
  <div class="opt"><label>${b.unit}: <b data-ol>${esc(vshort(k,i))}</b></label><div class="opts">${b.variants.map((x,j)=>`<button class="optb ${j===i?"on":""}" data-sync="pdp" data-i="${j}" onclick="setVariant('pdp',${j})"><i style="background:${x.c}"></i>${esc(vshort(k,j))}</button>`).join("")}</div></div>
  <div class="kv"><h3>Overview</h3><p>${esc(b.desc)} Pick an option in the video or with the chips above. The page follows either one.</p></div>${FOOT}</div></div>${buyBar(`${k}-${i}`,b.tag)}</div>`;
}
function itemScreen(pid){ const x = P[pid] && P[pid].img ? P[pid] : P.iph;
  return `<div class="screen">${pTop()}<div class="scr" id="scr" style="padding-bottom:16px"><div class="pad-top pad2"></div><div class="pmedia pmi">${pic(x.img,x.n)}</div>
  <div class="pinfo"><span class="bchip">✓ ${esc(x.n.split(" ")[0])}</span><h1>${esc(x.n)}</h1>${x.r?`<div class="rate" style="font-size:13px">${I.star}<b>${x.r}</b> (${x.rc})</div>`:""}<div class="price">${priceHTML(x.p,x.was)}</div>
  <div class="kv"><h3>Overview</h3><p>${x.sub?esc(x.sub)+". ":""}Listing and price as shown in the noon app on 17 Nov 2026. Full product details are outside this demo.</p></div>${FOOT}</div></div>${buyBar(x.id,x.tag)}</div>`;
}
function restScreen(k){ if(!MENUS[k]) k = "bk";
  MENUS[k].forEach((m,j)=>{ P[`${k}-m${j}`] = {id:`${k}-m${j}`, n:`${BRANDS[k].name}: ${m[0]}`, p:m[2], c:BRANDS[k].avc, tag:"fd"}; });
  return `<div class="screen t-food">${pTop()}<div class="scr" id="scr"><div class="pad-top pad2"></div><div data-anchor="rest">${flick("rest",k,{cta:"none"})}</div>
  <div class="pinfo"><h1 style="font-size:21px;font-weight:800;margin-top:10px">${esc(BRANDS[k].name)}</h1><div style="font-size:13px;color:var(--ink2)"><b style="color:var(--ink)">4.4 ★</b> (500+) · ${k==="bk"?"Burgers, Fast food":"Pizza"} · 20-30 mins · AED 4.90 delivery</div>
  <div class="vline" style="display:flex;justify-content:space-between;align-items:center;margin-top:10px;font-size:13px;color:var(--ink2)" data-spop="rest"><span>Sponsored video · showing <b data-sv="rest" style="color:var(--ink)">1 of 3</b></span>${dots("rest")}</div></div>
  <div class="sec-h" style="margin-top:6px"><h2>Popular</h2></div><div class="sec-sub">Menu items and prices here are illustrative</div>
  ${MENUS[k].map((m,j)=>`<div class="menu-i"><div style="flex:1"><b>${m[0]}</b><p>${m[1]}</p><div class="price">${priceHTML(m[2])}</div></div><div style="position:relative;width:40px;height:34px">${addc(`${k}-m${j}`)}</div></div>`).join("")}${FOOT}</div>${nav("")}</div>`;
}
const cthumb = x => x.img ? pic(x.img) : swatch(x.c||"#ccc");
function cartScreen(){ const ids = Object.keys(CART); const tot = ids.reduce((a,id)=>a+P[id].p*CART[id],0);
  return `<div class="screen"><div class="stop" style="box-shadow:none">${locRow()}</div><div class="scr" id="scr">${!ids.length ? `<div class="empty"><svg width="96" height="96" viewBox="0 0 100 100" style="margin:auto">${GL.basket("#3866df","#8fa9ee")}</svg><h3>Your shopping cart is empty</h3><p>What are you waiting for?</p><button class="cta" onclick="go('#/noon')">Start Shopping</button><p style="margin-top:22px;font-size:12.5px">Use code <b style="color:#2f8f3c">FIRST15</b> and get 15% off</p></div>${sec("Bestsellers for you", row(["iph","s25","pb","hold"]))}`
   : `<div style="padding:0 14px"><div class="sec-h" style="padding:0;margin-top:14px"><h2>Cart (${cartCount()})</h2></div>${ids.map(id=>`<div class="cart-i"><div class="mi">${cthumb(P[id])}</div><div class="nm">${esc(P[id].n)}<b>AED ${num(P[id].p)}</b></div><div class="step"><button aria-label="Remove one" onclick="addToCart('${id}',-1)">−</button><span>${CART[id]}</span><button aria-label="Add one" onclick="addToCart('${id}',1,1)">+</button></div></div>`).join("")}
     <div class="tot"><span>Subtotal</span><span>AED ${num(Math.round(tot*100)/100)}</span></div><button class="buy" style="width:100%" onclick="out('Checkout')">Checkout</button></div>`}${FOOT}</div>${nav("cart")}</div>`;
}
function accountScreen(){
  return `<div class="screen acct"><div class="scr" id="scr"><div class="hero2"></div><h2>20M+ products from global brands</h2><p>We bring it to every door, every day.</p>
  <button class="buy wide" style="background:#1c1e26" onclick="out('Login')">Login/Sign up</button><div style="height:10px"></div>
  <button class="rowi" onclick="out('Language')"><span>Language</span><b>English</b></button><button class="rowi" onclick="out('Country')"><span>Country</span><b>United Arab Emirates</b></button><button class="rowi" onclick="out('Policies')"><span>Policies</span>${I.right}</button>${FOOT}</div>${nav("account")}</div>`;
}

/* ================= overlays: full-screen video, car rentals sheet ================= */
function openOver(html){ OVER.innerHTML = html; OVER.classList.add("on"); try{ history.pushState({ov:1}, ""); OVSTATE = true; }catch(e){} sizeOver(); audit(); }
let OVSTATE = false;
function closeOver(silent){ if(!OVER.classList.contains("on")) return; $$(".flick[data-slot]", OVER).forEach(h=>{ unmount(h); delete SLOTS[h.dataset.slot]; });
  OVER.classList.remove("on"); OVER.innerHTML = ""; if(OVSTATE && !silent){ OVSTATE = false; try{ history.back(); }catch(e){} } OVSTATE = false; audit(); }
addEventListener("popstate", ()=>{ if(OVER.classList.contains("on")){ OVSTATE = false; closeOver(true); } });
function sizeOver(){ const vm = $(".vm", OVER), f = vm && vm.querySelector(".flick"); if(!f) return; const tall = f.classList.contains("tall"); const w = Math.min(vm.clientWidth, vm.clientHeight * (tall ? 9/16 : 1)); f.style.width = w+"px"; f.style.flex = "none"; fitFlick(f); }
function openViewer(k, o={}){ const b = BRANDS[k], v = b.variants[0];
  openOver(`<div class="viewer" role="dialog" aria-label="${esc(b.name)} video"><div class="vh">${av(k)}<div><b>${esc(b.name)}</b><span>Sponsored${o.sub?` · ${o.sub}`:""}</span></div></div><button class="x" onclick="closeOver()" aria-label="Close">${I.x}</button>
  <div class="vm">${flick("vw",k,{cta:o.cta||"pdp"})}</div>
  <div class="vf" data-spop="vw"><div class="vline"><span>${esc(b.head)} · <b data-sv="vw">${b.named?esc(vshort(k,0)):"1 of 3"}</b>${v.p?` · <span data-sp="vw">${priceHTML(v.p)}</span>`:""}</span>${dots("vw")}</div><button class="cta" onclick="ctaGo('vw')">${o.label||"Shop now"}</button></div></div>`);
}
function openCar(){
  openOver(`<div class="scrim" onclick="closeOver()"></div><div class="sheet" role="dialog" aria-label="Car rentals"><div class="shd"><b>Car Rentals</b><span class="adtag">Ad</span><button onclick="closeOver()" aria-label="Close">${I.x}</button></div>${flick("car","merc",{cta:"rent"})}
  <div class="sb" data-spop="car"><h3>Introducing car rentals</h3><p>Sponsored · Mercedes-Benz S-Class · showing <b data-sv="car" style="color:var(--ink)">White</b> · <b style="color:var(--ink)">AED 1,200 / day</b> (illustrative rate).</p><button class="cta" style="width:100%;height:46px" onclick="ctaGo('car')">RENT A CAR</button></div></div>`);
}

/* ================= router ================= */
const NAV = [], SCROLL = {}; let lastHash = "", pendingAnchor = null, pendingAct = null;
function go(h){ const rep = OVSTATE; if(rep) closeOver(true);   // leaving from a sheet or video replaces its history entry
  if(location.hash === h){ if(rep) history.back(); else render(false); } else if(rep) location.replace(h); else location.hash = h; }
function back(){ if(NAV.length > 1) history.back(); else location.hash = `#/${VERT}`; }
function parse(){ const p = (location.hash || "#/noon").replace(/^#\/?/,"").split("/"); return {name:p[0]||"noon", a:decodeURIComponent(p[1]||""), b:p[2]}; }
function keepHash(h){ if(location.hash === h) return; history.replaceState(history.state, "", h); CURH = lastHash = h; if(NAV.length) NAV[NAV.length-1] = h; }
const VERTS = ["noon","supermall","food","minutes","nownow"];
function render(anim=true){
  const r = parse(), h = location.hash || "#/noon";
  const old = $("#scr", VIEW); if(old && lastHash) SCROLL[lastHash] = old.scrollTop;
  let dir = "enter";
  if(NAV.length > 1 && NAV[NAV.length-2] === h){ NAV.pop(); dir = "enter-back"; } else if(NAV[NAV.length-1] !== h) NAV.push(h);
  closeOver(true);
  // Leaving a screen removes its Flicks outright, so nothing can keep playing behind the next screen.
  $$(".flick[data-slot]", VIEW).forEach(unmount); SLOTS = {}; CURH = h;
  if(VERTS.includes(r.name)) VERT = r.name;
  const S = {noon:noonScreen, supermall:supermallScreen, food:foodScreen, minutes:minutesScreen, nownow:nownowScreen, search:()=>searchScreen(r.a), watch:watchScreen, cats:catsScreen, cat:()=>catScreen(r.a), p:()=>productScreen(r.a, +r.b||0), item:()=>itemScreen(r.a), rest:()=>restScreen(r.a), cart:cartScreen, account:accountScreen};
  VIEW.innerHTML = (S[r.name] || noonScreen)();
  const scrn = $(".screen", VIEW), sc = $("#scr", VIEW);
  if(!VERTS.includes(r.name) && r.name!=="rest") scrn.classList.add("t-"+VERT);
  if(anim && lastHash && !VERTS.includes(r.name)) scrn.classList.add(dir);
  APP.style.setProperty("--hdrink", r.name==="minutes" ? "#fff" : "#1c1e26");
  document.body.classList.toggle("hasbuy", r.name==="p" || r.name==="item" || r.name==="watch");
  lastHash = h;
  Object.values(SLOTS).forEach(s=>{ if(s.v) applyVariant(s.id, s.v); });
  refreshAdds();
  if(dir === "enter-back" && SCROLL[h] && sc) sc.scrollTop = SCROLL[h];
  if(r.name === "watch" && r.a && !pendingAnchor) pendingAnchor = "wv-"+r.a;
  const anc = pendingAnchor, act = pendingAct; pendingAnchor = pendingAct = null;
  if(anc) setTimeout(()=>scrollToAnchor(anc), 80);
  if(act) setTimeout(act, anc ? 500 : 120);
  if(r.name === "search" && !r.a) setTimeout(()=>$("#q")?.focus({preventScroll:true}), 260);
  audit(); buildGuide();
}
addEventListener("hashchange", ()=>render(true));

/* ================= placements guide ================= */
const GUIDE = [
  ["Swipeable banners", "#e0b400", [["noon home carousel","#/noon","hero"],["supermall featured banners","#/supermall","sm"],["noon Minutes carousel","#/minutes","mban"],["noon Food: In the spotlight","#/food","spot"]]],
  ["Product Ads in rows", "#3866df", [["noon: Bestsellers row","#/noon","best"],["noon: Grocery row","#/noon","gro"],["supermall: brand row","#/supermall","smrow"],["noon Minutes: product row","#/minutes","mrow"]]],
  ["Brand Ad shelves", "#3a2fd0", [["noon home shelf","#/noon","shelf"],["supermall shelf","#/supermall","smshelf"],["noon Minutes shelf","#/minutes","mshelf"]]],
  ["Shoppable video", "#d4006a", [["noon: Watch and shop row","#/noon","w1"],["Watch and shop page","#/watch","wv-zara"],["noon Food: featured videos","#/food","vid",0,()=>openViewer("bk",{cta:"rest",label:"Order now"})]]],
  ["Search", "#2f8f3c", [["Brand Ad at top of search","#/search/earbuds","top"],["Product Ad inside results","#/search/leggings","inline"]]],
  ["Category and product pages", "#c4102b", [["Category page banner","#/cat/toys","catb"],["Product page video","#/p/bose/0","pdp"],["Restaurant page video","#/rest/bk","rest"]]],
  ["Display cards in the feed", "#e2402a", [["noon home: between offers","#/noon","crd1"],["noon Food: inside the restaurant list","#/food","fdes"],["noon Minutes: display card","#/minutes","msw"],["NowNow: department ads","#/nownow","pet"],["NowNow: rent a car","#/nownow","car2"]]],
  ["Full screen", "#1c1e26", [["App-open interstitial","#/noon","",0,()=>openViewer("acer",{label:"Shop now",sub:"closes any time"})],["Takeover sheet","#/nownow","car",0,()=>openCar()]]]
];
let curPick = "";
function buildGuide(){ let n = 0;
  $("#glist").innerHTML = GUIDE.map(([sec,col,items],si)=>`<h6><i style="background:${col}"></i>${sec}</h6>` + items.map((it,ii)=>{ n++; const key = si+"-"+ii;
    return `<button class="gitem ${key===curPick?"cur":""}" onclick="pick(${si},${ii})"><span class="n">${n}</span>${it[0]}</button>`; }).join("")).join("");
  $("#gcount").textContent = n;
}
function pick(si, ii){ const it = GUIDE[si][2][ii]; curPick = si+"-"+ii; toggleGuide(false);
  const have = location.hash || "#/noon", rep = OVSTATE;
  if(have === it[1]){ closeOver(); if(it[2]) scrollToAnchor(it[2]); if(it[4]) setTimeout(it[4], it[2]?520:160); buildGuide(); }
  else { closeOver(true); pendingAnchor = it[2] || null; pendingAct = it[4] || null; if(rep) location.replace(it[1]); else location.hash = it[1]; }
}
function scrollToAnchor(a){
  const sc = $("#scr", VIEW), el = sc && sc.querySelector(`[data-anchor="${a}"]`); if(!el) return;
  const k = sc.getBoundingClientRect().height / (sc.clientHeight || 1);
  const hr = el.closest(".row,.hero");
  if(hr){ const left = (el.getBoundingClientRect().left - hr.getBoundingClientRect().left)/k + hr.scrollLeft - 14; hr.scrollTo({left:Math.max(0,left), behavior:"smooth"}); }
  const tgt = el.closest(".sec") || el;
  const top = (tgt.getBoundingClientRect().top - sc.getBoundingClientRect().top)/k + sc.scrollTop - 8;
  sc.scrollTo({top:Math.max(0,top), behavior:"smooth"});
  setTimeout(()=>{ $$(".pulse").forEach(e=>e.classList.remove("pulse")); void el.offsetWidth; el.classList.add("pulse"); audit(); }, 420);
}
function toggleGuide(force){ const p = $("#side"), on = force === undefined ? !p.classList.contains("on") : force; p.classList.toggle("on", on); $("#gscrim").classList.toggle("on", on); $("#gpill").setAttribute("aria-expanded", on); if(on) $("#gpill").classList.remove("hl"); }
document.addEventListener("keydown", e=>{ if(e.key === "Escape"){ toggleGuide(false); closeOver(); } if((e.key==="Enter"||e.key===" ") && e.target.matches && e.target.matches("[role=button]")){ e.preventDefault(); e.target.click(); } });
// The phone button can be dragged out of the way; a short move still counts as a tap.
(function(){ const b = $("#gpill"); let sx, sy, ox, oy, moved;
  b.addEventListener("pointerdown", e=>{ sx=e.clientX; sy=e.clientY; const r=b.getBoundingClientRect(); ox=r.left; oy=r.top; moved=false; b.setPointerCapture(e.pointerId); });
  b.addEventListener("pointermove", e=>{ if(sx==null) return; const dx=e.clientX-sx, dy=e.clientY-sy; if(!moved && Math.hypot(dx,dy)<8) return; moved=true;
    b.style.left=Math.max(6,Math.min(innerWidth-b.offsetWidth-6,ox+dx))+"px"; b.style.top=Math.max(6,Math.min(innerHeight-b.offsetHeight-6,oy+dy))+"px"; b.style.right="auto"; b.style.bottom="auto"; });
  b.addEventListener("pointerup", ()=>{ if(sx==null) return; sx=null; if(!moved) toggleGuide(); });
  setTimeout(()=>b.classList.add("hl"), 3500);
})();

/* ================= phone scaling ================= */
function fit(){ const slot = $("#phoneSlot"), phone = $("#phone");
  if(innerWidth <= 860){ slot.style.width = slot.style.height = ""; phone.style.transform = ""; return; }
  const s = Math.min(1, (innerHeight - 52 - 40) / 868, (innerWidth - 440) / 414);
  phone.style.transform = `scale(${s})`; slot.style.width = (414*s)+"px"; slot.style.height = (868*s)+"px";
}
addEventListener("resize", fit);
$("#flamLogo").src = IMG.flam[2]; $("#noonLogo").src = IMG.t_noon_on[2];
fit(); render(false);
