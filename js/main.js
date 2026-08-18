/* ==========================================================================
   Neshop — Wireframe navegável (protótipo). Toda a navegação/estado abaixo
   é simulada em memória/localStorage apenas para demonstrar o fluxo.
   ========================================================================== */

/* ---------------------------------------------------------------------- */
/* Dataset fictício de produtos, usado nas vitrines, categoria, busca,     */
/* ficha de produto e relacionados.                                       */
/* ---------------------------------------------------------------------- */
const NESHOP_PRODUCTS = [
  { id:"p01", name:"Placa Principal para TV LED", brand:"LG", modelo:"55UK6520", codigo:"EBT64825302", cat:"tv", price:389.90, oldPrice:459.90, installment:"6x de R$ 64,98", rating:4.8, reviews:42, orig:true, stock:true, icon:"📺" },
  { id:"p02", name:"Placa Fonte para TV LED", brand:"Samsung", modelo:"UN50T5300", codigo:"BN44-00932A", cat:"tv", price:229.90, installment:"6x de R$ 38,32", rating:4.6, reviews:31, orig:true, stock:true, icon:"📺" },
  { id:"p03", name:"Compressor para Ar-condicionado Split", brand:"Springer", modelo:"9.000 BTUs", codigo:"COMP-9K-SP", cat:"ar-condicionado", price:749.00, installment:"10x de R$ 74,90", rating:4.9, reviews:58, orig:true, stock:true, icon:"❄️" },
  { id:"p04", name:"Placa Eletrônica Evaporadora Ar-condicionado", brand:"LG", modelo:"S4-Q12", codigo:"EBR78530401", cat:"ar-condicionado", price:319.90, installment:"6x de R$ 53,32", rating:4.5, reviews:19, orig:true, stock:true, icon:"❄️" },
  { id:"p05", name:"Placa Potência Lava e Seca", brand:"Samsung", modelo:"WD24DB", codigo:"DC92-01850A", cat:"lava-e-seca", price:279.00, installment:"6x de R$ 46,50", rating:4.7, reviews:27, orig:true, stock:true, icon:"🌀" },
  { id:"p06", name:"Motor para Máquina de Lavar", brand:"Brastemp", modelo:"BWK11", codigo:"W11234567", cat:"lava-e-seca", price:349.90, installment:"8x de R$ 43,74", rating:4.4, reviews:15, orig:false, stock:true, icon:"🌀" },
  { id:"p07", name:"Placa Sensora para Refrigerador Frost Free", brand:"Consul", modelo:"CRM43", codigo:"W10914512", cat:"refrigerador", price:189.90, installment:"6x de R$ 31,65", rating:4.6, reviews:22, orig:true, stock:true, icon:"🧊" },
  { id:"p08", name:"Compressor para Refrigerador", brand:"Electrolux", modelo:"DF44", codigo:"EMBR-DF44", cat:"refrigerador", price:459.90, installment:"10x de R$ 45,99", rating:4.8, reviews:37, orig:true, stock:false, icon:"🧊" },
  { id:"p09", name:"Placa Amplificadora para Rádio e Som", brand:"Philco", modelo:"PB100", codigo:"AMP-PB100", cat:"radio-e-som", price:159.90, installment:"6x de R$ 26,65", rating:4.3, reviews:11, orig:true, stock:true, icon:"🔊" },
  { id:"p10", name:"Alto-falante para Caixa de Som Bluetooth", brand:"AOC", modelo:"SP2000", codigo:"SPK-AOC2000", cat:"radio-e-som", price:99.90, installment:"3x de R$ 33,30", rating:4.2, reviews:9, orig:false, stock:true, icon:"🔊" },
  { id:"p11", name:"Bateria para Parafusadeira Profissional", brand:"Toshiba", modelo:"PF-14V", codigo:"BAT-PF14V", cat:"ferramentas", price:219.90, installment:"6x de R$ 36,65", rating:4.7, reviews:24, orig:true, stock:true, icon:"🛠️" },
  { id:"p12", name:"Placa Principal para TV LED 4K", brand:"LG", modelo:"65NANO75", codigo:"EBT65432901", cat:"tv", price:459.00, installment:"10x de R$ 45,90", rating:4.9, reviews:63, orig:true, stock:true, icon:"📺" },
];

const NESHOP_CATEGORIES = [
  { slug:"tv", name:"TV", icon:"📺" },
  { slug:"ar-condicionado", name:"Ar-condicionado", icon:"❄️" },
  { slug:"lava-e-seca", name:"Lava e seca", icon:"🌀" },
  { slug:"refrigerador", name:"Refrigerador", icon:"🧊" },
  { slug:"radio-e-som", name:"Rádio e som", icon:"🔊" },
  { slug:"ferramentas", name:"Ferramentas", icon:"🛠️" },
];

const NESHOP_BRANDS = ["LG","Samsung","Philco","AOC","Toshiba","Brastemp","Consul","Electrolux","Springer","Midea","Panasonic","Britânia"];

function money(v){ return "R$ " + v.toFixed(2).replace(".", ","); }

function starsHtml(rating){
  const full = Math.round(rating);
  let s = "";
  for(let i=0;i<5;i++){ s += i<full ? "★" : "☆"; }
  return s;
}

function productCardHtml(p){
  return `
  <a class="product-card" href="produto.html?id=${p.id}">
    <div class="thumb">
      ${p.orig ? '<span class="tag-orig">Original</span>' : ''}
      <span>${p.icon}</span>
    </div>
    <div class="body">
      <span class="brand">${p.brand}</span>
      <span class="name">${p.name}</span>
      <span class="meta">Modelo ${p.modelo} · Cód. ${p.codigo}</span>
      <span class="stars">${starsHtml(p.rating)} <span class="n">${p.rating} (${p.reviews})</span></span>
      <div class="price-block">
        <div class="price">${money(p.price)}</div>
        <div class="installment">${p.installment}</div>
      </div>
      <button type="button" class="buy-btn" onclick="event.preventDefault();event.stopPropagation();neshopBuy('${p.id}')">Comprar</button>
    </div>
  </a>`;
}

function renderGrid(containerId, products){
  const el = document.getElementById(containerId);
  if(!el) return;
  el.innerHTML = products.map(productCardHtml).join("");
}

function getQueryParam(name){
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

/* ---------------------------------------------------------------------- */
/* Carrinho simulado (localStorage)                                       */
/* ---------------------------------------------------------------------- */
function getCart(){
  try{ return JSON.parse(localStorage.getItem("neshop_cart") || "[]"); }
  catch(e){ return []; }
}
function saveCart(cart){
  localStorage.setItem("neshop_cart", JSON.stringify(cart));
  updateCartBadge();
}
function updateCartBadge(){
  const cart = getCart();
  const total = cart.reduce((s,i)=>s+i.qty,0);
  document.querySelectorAll(".js-cart-badge").forEach(b=>{
    b.textContent = total;
    b.style.display = total > 0 ? "flex" : "none";
  });
}
function neshopBuy(productId){
  const p = NESHOP_PRODUCTS.find(x=>x.id===productId);
  if(!p) return;
  const cart = getCart();
  const existing = cart.find(i=>i.id===productId);
  if(existing){ existing.qty += 1; } else { cart.push({id:productId, qty:1}); }
  saveCart(cart);
  window.location.href = "carrinho.html";
}

/* ---------------------------------------------------------------------- */
/* Modal WhatsApp (simulação de contato — sem integração real)            */
/* ---------------------------------------------------------------------- */
function openWhatsApp(context){
  const overlay = document.getElementById("wa-modal");
  if(!overlay) return;
  const ctxEl = document.getElementById("wa-context");
  if(ctxEl) ctxEl.textContent = context || "Olá! Preciso de ajuda para encontrar uma peça.";
  overlay.classList.add("open");
}
function closeModal(id){
  const overlay = document.getElementById(id);
  if(overlay) overlay.classList.remove("open");
}

/* ---------------------------------------------------------------------- */
/* Busca — redireciona para tela de resultados (simulado)                 */
/* ---------------------------------------------------------------------- */
function doSearch(inputId){
  const input = document.getElementById(inputId);
  const q = input ? input.value.trim() : "";
  window.location.href = "busca.html" + (q ? ("?q=" + encodeURIComponent(q)) : "");
}
function bindEnterKey(inputId, cb){
  const input = document.getElementById(inputId);
  if(!input) return;
  input.addEventListener("keydown", e=>{ if(e.key === "Enter") cb(); });
}

/* ---------------------------------------------------------------------- */
/* Ordenação visual (client-side, apenas para demonstrar o comportamento) */
/* ---------------------------------------------------------------------- */
function sortProducts(list, mode){
  const copy = [...list];
  if(mode === "price-asc") copy.sort((a,b)=>a.price-b.price);
  else if(mode === "price-desc") copy.sort((a,b)=>b.price-a.price);
  else if(mode === "rating") copy.sort((a,b)=>b.rating-a.rating);
  return copy;
}

/* ---------------------------------------------------------------------- */
/* Init comum a todas as páginas                                          */
/* ---------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();

  document.querySelectorAll(".js-year").forEach(el=>{ el.textContent = new Date().getFullYear(); });

  document.querySelectorAll("[data-modal-close]").forEach(el=>{
    el.addEventListener("click", ()=> closeModal(el.getAttribute("data-modal-close")));
  });
  document.querySelectorAll(".modal-overlay").forEach(overlay=>{
    overlay.addEventListener("click", (e)=>{ if(e.target === overlay) overlay.classList.remove("open"); });
  });
  document.querySelectorAll("[data-open-wa]").forEach(el=>{
    el.addEventListener("click", (e)=>{ e.preventDefault(); openWhatsApp(el.getAttribute("data-open-wa") || null); });
  });

  bindEnterKey("headerSearchInput", ()=>doSearch("headerSearchInput"));
  bindEnterKey("heroSearchInput", ()=>doSearch("heroSearchInput"));
});
