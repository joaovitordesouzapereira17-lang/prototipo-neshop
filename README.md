# Neshop — Projeto de Redesign do E-commerce

⚠️ **Ainda é uma proposta de redesign em validação com os gestores da Neshop — não é o site oficial em produção.** A estrutura de código, porém, já é a de um projeto real (Next.js + TypeScript + Tailwind), pensada para evoluir diretamente para a versão final, sem precisar reescrever nada do zero.

Carrinho, login e busca continuam **simulados** (dados mockados em `lib/products.ts`, carrinho em `localStorage`) — não há backend, pagamentos reais, autenticação real ou banco de dados ainda. É fácil trocar por uma API depois, já que a lógica de dados está isolada em `lib/`.

## Stack

- **Next.js 16** (App Router) — roteamento real por arquivos, cada tela é uma rota de verdade (não é mais hash routing de SPA)
- **TypeScript**
- **Tailwind CSS** — paleta customizada (navy/orange/blue) em `tailwind.config.ts`
- **React Context** para carrinho (`lib/cart-context.tsx`, persistido em `localStorage`) e modal do WhatsApp (`lib/whatsapp-context.tsx`)

## Como rodar

```bash
npm install
npm run dev
# acesse http://localhost:3000
```

Para build de produção:

```bash
npm run build
npm start
```

## Estrutura

```
app/
  layout.tsx              → header, footer, providers globais, faixa de "protótipo"
  page.tsx                → Home
  categoria/               → /categoria?cat=
  busca/                   → /busca?q=
  produto/                 → /produto?id=
  marca/                   → /marca?marca=
  marcas/, categorias/, conteudo/  → páginas "ver todas"
  ajuda/                   → fluxo de identificação de peça (4 passos)
  carrinho/                → carrinho simulado
  conta/                   → login simulado
  pedidos/                 → histórico de pedidos (placeholder)
components/                → Header, Footer, ProductCard, modais etc (compartilhados)
lib/
  products.ts              → dataset de produtos/categorias/marcas (mock)
  cart-context.tsx          → estado do carrinho
  whatsapp-context.tsx       → estado do modal do WhatsApp
legacy-wireframe/index.html → versão anterior do protótipo (1 arquivo HTML autocontido), mantida como referência histórica
```

## Lógica central do produto

**Encontrar → Identificar → Validar → Comprar.**
