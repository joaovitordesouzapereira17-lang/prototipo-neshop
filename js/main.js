/* ==========================================================================
   Neshop — Wireframe navegável (protótipo), agora como single-page app.
   Toda a navegação/estado é simulada em memória/localStorage apenas para
   demonstrar o fluxo — não há backend real.
   ========================================================================== */

/* ---------------------------------------------------------------------- */
/* Dataset fictício de produtos                                           */
/* ---------------------------------------------------------------------- */
const NESHOP_PRODUCTS = [
  { id:"p01", name:"Placa Principal para TV LED", brand:"LG", modelo:"55UK6520", codigo:"EBT64825302", cat:"tv", price:389.90, installment:"6x de R$ 64,98", rating:4.8, reviews:42, orig:true, stock:true, icon:"📺" },
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
const CAT_NAMES = {"tv":"TV","ar-condicionado":"Ar-condicionado","lava-e-seca":"Lava e seca","refrigerador":"Refrigerador","radio-e-som":"Rádio e som","ferramentas":"Ferramentas"};

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
  <a class="product-card" href="#/produto?id=${p.id}">
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
  navigate("carrinho");
}

/* ---------------------------------------------------------------------- */
/* Modal WhatsApp / Checkout (simulação de contato — sem integração real) */
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
/* Roteador (hash-based, single HTML file)                                */
/* ---------------------------------------------------------------------- */
function parseHash(){
  let hash = window.location.hash.slice(1);
  if(hash.startsWith("/")) hash = hash.slice(1);
  const [path, query] = hash.split("?");
  return { path: path || "home", params: new URLSearchParams(query || "") };
}
function navigate(path, params){
  const qs = params ? new URLSearchParams(params).toString() : "";
  window.location.hash = "/" + path + (qs ? ("?" + qs) : "");
}
function doSearch(inputId){
  const input = document.getElementById(inputId);
  const q = input ? input.value.trim() : "";
  navigate("busca", q ? {q} : {});
}
function bindEnterKey(inputId, cb){
  const input = document.getElementById(inputId);
  if(!input) return;
  input.addEventListener("keydown", e=>{ if(e.key === "Enter") cb(); });
}

const PAGE_IDS = ["home","categoria","busca","produto","marca","marcas","categorias","conteudo","ajuda","carrinho","conta","pedidos"];

function updateActiveNav(path, params){
  document.querySelectorAll(".header-nav a").forEach(a=>a.classList.remove("active"));
  let key = null;
  if(path === "categoria") key = params.get("cat") || "tv";
  else if(path === "marca" || path === "marcas") key = "marcas";
  else if(path === "ajuda") key = "ajuda";
  else if(path === "conteudo") key = "conteudo";
  if(key){
    const link = document.querySelector('.header-nav a[data-nav="'+key+'"]');
    if(link) link.classList.add("active");
  }
}

function router(){
  const { path, params } = parseHash();
  const pageId = PAGE_IDS.includes(path) ? path : "home";
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  const pageEl = document.getElementById("page-" + pageId);
  if(pageEl) pageEl.classList.add("active");
  updateActiveNav(pageId, params);
  window.scrollTo({top:0, behavior:"instant"});
  initPage(pageId, params);
}

function initPage(pageId, params){
  if(pageId === "home") initHome();
  else if(pageId === "categoria") initCategoria(params);
  else if(pageId === "busca") initBusca(params);
  else if(pageId === "produto") initProduto(params);
  else if(pageId === "marca") initMarca(params);
  else if(pageId === "marcas") initMarcas();
  else if(pageId === "categorias") initCategorias();
  else if(pageId === "ajuda") initAjuda();
  else if(pageId === "carrinho") initCarrinho();
}

/* ---------------------------------------------------------------------- */
/* HOME                                                                    */
/* ---------------------------------------------------------------------- */
function initHome(){
  renderGrid("grid-destaques", NESHOP_PRODUCTS.slice(0,8));
}

/* ---------------------------------------------------------------------- */
/* CATEGORIA                                                               */
/* ---------------------------------------------------------------------- */
let catBaseList = [];
let catCurrentList = [];
function typeOf(p){
  if(/placa/i.test(p.name)) return "placa";
  if(/motor|compressor/i.test(p.name)) return "motor";
  return "outros";
}
function initCategoria(params){
  const cat = params.get("cat") || "tv";
  document.getElementById("cat-bc").textContent = CAT_NAMES[cat] || "Categoria";
  document.getElementById("cat-title").textContent = CAT_NAMES[cat] || "Categoria";
  catBaseList = NESHOP_PRODUCTS.filter(p => p.cat === cat);
  document.querySelectorAll('#page-categoria input[type=checkbox]').forEach(el=>el.checked=false);
  document.getElementById("catPriceMin").value = "";
  document.getElementById("catPriceMax").value = "";
  document.getElementById("catSortSelect").value = "relevance";
  applyCategoriaFilters();
}
function renderCategoriaChips(){
  const chips = [];
  document.querySelectorAll('[data-cat-filter="brand"]:checked').forEach(el=>chips.push({label:el.value, cb:()=>{el.checked=false; applyCategoriaFilters();}}));
  document.querySelectorAll('[data-cat-filter="type"]:checked').forEach(el=>chips.push({label:el.value, cb:()=>{el.checked=false; applyCategoriaFilters();}}));
  if(document.getElementById("catOnlyStock").checked) chips.push({label:"Em estoque", cb:()=>{document.getElementById("catOnlyStock").checked=false; applyCategoriaFilters();}});
  const chipsEl = document.getElementById("cat-chips");
  chipsEl.innerHTML = chips.map((c,i)=>`<span class="chip">${c.label} <button type="button" onclick="window.__catChip${i}()">✕</button></span>`).join("");
  chips.forEach((c,i)=>{ window["__catChip"+i] = c.cb; });
}
function applyCategoriaFilters(){
  const brands = [...document.querySelectorAll('[data-cat-filter="brand"]:checked')].map(el=>el.value);
  const types = [...document.querySelectorAll('[data-cat-filter="type"]:checked')].map(el=>el.value);
  const min = parseFloat(document.getElementById("catPriceMin").value) || 0;
  const max = parseFloat(document.getElementById("catPriceMax").value) || Infinity;
  const onlyStock = document.getElementById("catOnlyStock").checked;
  catCurrentList = catBaseList.filter(p=>{
    if(brands.length && !brands.includes(p.brand)) return false;
    if(types.length && !types.includes(typeOf(p))) return false;
    if(p.price < min || p.price > max) return false;
    if(onlyStock && !p.stock) return false;
    return true;
  });
  renderCategoriaChips();
  applyCategoriaSort();
}
function clearCategoriaFilters(){
  document.querySelectorAll('#page-categoria .filters input[type=checkbox]').forEach(el=>el.checked=false);
  document.getElementById("catPriceMin").value = "";
  document.getElementById("catPriceMax").value = "";
  applyCategoriaFilters();
}
function applyCategoriaSort(){
  const mode = document.getElementById("catSortSelect").value;
  const sorted = mode === "relevance" ? catCurrentList : sortProducts(catCurrentList, mode);
  document.getElementById("cat-count").textContent = sorted.length;
  renderGrid("grid-categoria", sorted);
}

/* ---------------------------------------------------------------------- */
/* BUSCA                                                                   */
/* ---------------------------------------------------------------------- */
let buscaBaseList = [];
let buscaCurrentList = [];
function matchesQuery(p, q){
  const hay = (p.name+" "+p.brand+" "+p.modelo+" "+p.codigo+" "+p.cat).toLowerCase();
  return q.toLowerCase().split(" ").every(term => term.length===0 || hay.includes(term));
}
function initBusca(params){
  const q = params.get("q") || "placa LG";
  document.getElementById("q-title").textContent = q;
  buscaBaseList = NESHOP_PRODUCTS.filter(p => matchesQuery(p, q));
  document.querySelectorAll('#page-busca input[type=checkbox]').forEach(el=>el.checked=false);
  document.getElementById("buscaPriceMin").value = "";
  document.getElementById("buscaPriceMax").value = "";
  document.getElementById("buscaSortSelect").value = "relevance";
  applyBuscaFilters();
}
function renderBuscaChips(){
  const chips = [];
  document.querySelectorAll('[data-busca-filter="cat"]:checked').forEach(el=>chips.push({label:CAT_NAMES[el.value]||el.value, cb:()=>{el.checked=false; applyBuscaFilters();}}));
  document.querySelectorAll('[data-busca-filter="brand"]:checked').forEach(el=>chips.push({label:el.value, cb:()=>{el.checked=false; applyBuscaFilters();}}));
  const chipsEl = document.getElementById("busca-chips");
  chipsEl.innerHTML = chips.map((c,i)=>`<span class="chip">${c.label} <button type="button" onclick="window.__buscaChip${i}()">✕</button></span>`).join("");
  chips.forEach((c,i)=>{ window["__buscaChip"+i] = c.cb; });
}
function applyBuscaFilters(){
  const cats = [...document.querySelectorAll('[data-busca-filter="cat"]:checked')].map(el=>el.value);
  const brands = [...document.querySelectorAll('[data-busca-filter="brand"]:checked')].map(el=>el.value);
  const min = parseFloat(document.getElementById("buscaPriceMin").value) || 0;
  const max = parseFloat(document.getElementById("buscaPriceMax").value) || Infinity;
  buscaCurrentList = buscaBaseList.filter(p=>{
    if(cats.length && !cats.includes(p.cat)) return false;
    if(brands.length && !brands.includes(p.brand)) return false;
    if(p.price < min || p.price > max) return false;
    return true;
  });
  renderBuscaChips();
  applyBuscaSort();
}
function clearBuscaFilters(){
  document.querySelectorAll('#page-busca .filters input[type=checkbox]').forEach(el=>el.checked=false);
  document.getElementById("buscaPriceMin").value = "";
  document.getElementById("buscaPriceMax").value = "";
  applyBuscaFilters();
}
function applyBuscaSort(){
  const mode = document.getElementById("buscaSortSelect").value;
  const sorted = mode === "relevance" ? buscaCurrentList : sortProducts(buscaCurrentList, mode);
  document.getElementById("res-count").textContent = sorted.length;
  document.getElementById("no-results").style.display = sorted.length ? "none" : "block";
  renderGrid("grid-busca", sorted);
}

/* ---------------------------------------------------------------------- */
/* Ordenação (compartilhada)                                              */
/* ---------------------------------------------------------------------- */
function sortProducts(list, mode){
  const copy = [...list];
  if(mode === "price-asc") copy.sort((a,b)=>a.price-b.price);
  else if(mode === "price-desc") copy.sort((a,b)=>b.price-a.price);
  else if(mode === "rating") copy.sort((a,b)=>b.rating-a.rating);
  return copy;
}

/* ---------------------------------------------------------------------- */
/* PRODUTO                                                                 */
/* ---------------------------------------------------------------------- */
function initProduto(params){
  const pid = params.get("id") || "p01";
  const p = NESHOP_PRODUCTS.find(x=>x.id===pid) || NESHOP_PRODUCTS[0];

  document.getElementById("pd-bc-cat").textContent = CAT_NAMES[p.cat];
  document.getElementById("pd-bc-cat").href = "#/categoria?cat=" + p.cat;
  document.getElementById("pd-bc-name").textContent = p.name;
  document.getElementById("pd-icon").textContent = p.icon;
  document.getElementById("pd-icon-th").textContent = p.icon;
  document.getElementById("pd-orig-tag").style.display = p.orig ? "inline-flex" : "none";
  document.getElementById("pd-brand").textContent = p.brand;
  document.getElementById("pd-name").textContent = p.name;
  document.getElementById("pd-modelo").textContent = p.modelo;
  document.getElementById("pd-codigo").textContent = p.codigo;
  document.getElementById("pd-stars").textContent = starsHtml(p.rating);
  document.getElementById("pd-rating-num").textContent = p.rating + " (" + p.reviews + " avaliações)";
  document.getElementById("pd-price").textContent = money(p.price);
  document.getElementById("pd-installment").textContent = "ou " + p.installment;

  const stockEl = document.getElementById("pd-stock");
  const buyBtn = document.getElementById("pd-buy-btn");
  if(!p.stock){
    stockEl.innerHTML = '<span class="dot" style="background:#c94b2b"></span> Fora de estoque — consulte disponibilidade';
    stockEl.style.color = "#c94b2b";
    buyBtn.textContent = "Avisar quando disponível";
    buyBtn.onclick = ()=> openWhatsApp("Olá! Gostaria de ser avisado quando o produto '"+p.name+"' estiver disponível.");
  } else {
    stockEl.innerHTML = '<span class="dot"></span> Em estoque — envio imediato';
    stockEl.style.color = "";
    buyBtn.textContent = "Comprar";
    buyBtn.onclick = ()=> neshopBuy(p.id);
  }

  document.getElementById("pd-compat-list").innerHTML = [
    p.modelo, p.modelo+" (variante A)", p.modelo+" (variante B)", "Consulte outros modelos compatíveis"
  ].map(m=>`<li>${m}</li>`).join("");

  const related = NESHOP_PRODUCTS.filter(x=>x.cat===p.cat && x.id!==p.id).slice(0,4);
  renderGrid("grid-relacionados", related.length ? related : NESHOP_PRODUCTS.filter(x=>x.id!==p.id).slice(0,4));

  document.querySelectorAll("#page-produto .tabs-nav button").forEach(btn=>{
    btn.classList.toggle("active", btn.dataset.tab === "desc");
  });
  document.querySelectorAll("#page-produto .tab-panel").forEach(pnl=>{
    pnl.classList.toggle("active", pnl.id === "tab-desc");
  });
}

/* ---------------------------------------------------------------------- */
/* MARCA / MARCAS / CATEGORIAS                                            */
/* ---------------------------------------------------------------------- */
function initMarca(params){
  const marca = params.get("marca") || "LG";
  document.getElementById("marca-bc").textContent = marca;
  document.getElementById("marca-nome").textContent = marca;
  document.getElementById("marca-badge").textContent = marca.slice(0,2).toUpperCase();
  document.getElementById("marca-desc").textContent = `Peças e componentes originais ${marca} para equipamentos de TV, ar-condicionado, refrigeração e mais, com o conhecimento técnico da Neshop.`;

  const marcaProducts = NESHOP_PRODUCTS.filter(p=>p.brand===marca);
  const cats = [...new Set(marcaProducts.map(p=>p.cat))];
  document.getElementById("marca-cats").innerHTML = cats.length
    ? cats.map(c=>`<a href="#/categoria?cat=${c}">${CAT_NAMES[c]}</a>`).join("")
    : `<a href="#/categorias">Ver categorias</a>`;

  document.getElementById("marca-empty").style.display = marcaProducts.length ? "none" : "block";
  renderGrid("grid-marca", marcaProducts);
}
function initMarcas(){
  document.getElementById("grid-marcas").innerHTML = NESHOP_BRANDS.map(b=>
    `<a class="brand-card" href="#/marca?marca=${encodeURIComponent(b)}">${b}</a>`
  ).join("");
}
function initCategorias(){
  document.getElementById("grid-categorias").innerHTML = NESHOP_CATEGORIES.map(c=>
    `<a class="cat-card" href="#/categoria?cat=${c.slug}"><span class="ic">${c.icon}</span><span class="name">${c.name}</span></a>`
  ).join("");
}

/* ---------------------------------------------------------------------- */
/* AJUDA (fluxo de identificação em 4 passos)                             */
/* ---------------------------------------------------------------------- */
function initAjuda(){
  goStep(1);
  document.getElementById("upload-status").style.display = "none";
}
function goStep(n){
  for(let i=1;i<=4;i++){
    document.getElementById("panel-"+i).classList.toggle("active", i===n);
    const ind = document.getElementById("step-ind-"+i);
    const circle = ind.querySelector(".circle");
    ind.classList.toggle("active", i<=n);
    circle.classList.remove("done","current");
    if(i < n) circle.classList.add("done");
    else if(i === n) circle.classList.add("current");
  }
  window.scrollTo({top:0, behavior:"smooth"});
}
function simulateUpload(){
  document.getElementById("upload-status").style.display = "block";
}

/* ---------------------------------------------------------------------- */
/* CARRINHO                                                                */
/* ---------------------------------------------------------------------- */
function initCarrinho(){ renderCart(); }
function renderCart(){
  const cart = getCart();
  const itemsEl = document.getElementById("cart-items");
  if(cart.length === 0){
    itemsEl.innerHTML = `<div class="empty-cart"><div class="ic">🛒</div><p style="font-weight:700;color:var(--navy-950);">Seu carrinho está vazio</p><p style="margin-top:6px;">Explore nosso catálogo e encontre a peça certa para o seu equipamento.</p><div class="center-cta"><a class="btn btn-primary" href="#/categorias">Ver categorias</a></div></div>`;
    document.getElementById("cart-summary").style.display = "none";
    return;
  }
  document.getElementById("cart-summary").style.display = "block";
  let subtotal = 0;
  itemsEl.innerHTML = cart.map(item=>{
    const p = NESHOP_PRODUCTS.find(x=>x.id===item.id);
    if(!p) return "";
    subtotal += p.price * item.qty;
    return `
    <div class="cart-item">
      <div class="thumb">${p.icon}</div>
      <div class="info">
        <div class="name">${p.name}</div>
        <div class="meta">${p.brand} · Modelo ${p.modelo} · Cód. ${p.codigo}</div>
      </div>
      <div class="qty-box">
        <button type="button" onclick="changeQty('${p.id}',-1)">−</button>
        <span>${item.qty}</span>
        <button type="button" onclick="changeQty('${p.id}',1)">+</button>
      </div>
      <div class="price">${money(p.price*item.qty)}</div>
      <button class="btn btn-secondary" type="button" onclick="removeItem('${p.id}')">Remover</button>
    </div>`;
  }).join("");
  document.getElementById("sum-subtotal").textContent = money(subtotal);
  document.getElementById("sum-total").textContent = money(subtotal);
}
function changeQty(id, delta){
  const cart = getCart();
  const item = cart.find(i=>i.id===id);
  if(!item) return;
  item.qty += delta;
  const newCart = item.qty <= 0 ? cart.filter(i=>i.id!==id) : cart;
  saveCart(newCart);
  renderCart();
}
function removeItem(id){
  saveCart(getCart().filter(i=>i.id!==id));
  renderCart();
}
function fakeCheckout(){
  document.getElementById("checkout-modal").classList.add("open");
}

/* ---------------------------------------------------------------------- */
/* Init global                                                            */
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

  document.body.addEventListener("click", (e)=>{
    const btn = e.target.closest(".tabs-nav button");
    if(!btn) return;
    const tabsNav = btn.parentElement;
    tabsNav.querySelectorAll("button").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    const tabsWrap = tabsNav.parentElement;
    tabsWrap.querySelectorAll(".tab-panel").forEach(pnl=>pnl.classList.remove("active"));
    const target = tabsWrap.querySelector("#tab-"+btn.dataset.tab);
    if(target) target.classList.add("active");
  });

  window.addEventListener("hashchange", router);
  if(!window.location.hash) window.location.hash = "#/home";
  else router();
});
