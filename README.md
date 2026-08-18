# Neshop — Protótipo de Wireframe Navegável (Redesign)

⚠️ **Este é um protótipo/wireframe de alta fidelidade estrutural, para apresentação e validação interna com os gestores da Neshop. Não é o site oficial e não deve ser tratado como implementação definitiva.**

Não há backend, pagamentos reais, login real, banco de dados ou estoque real. Toda a navegação (busca, filtros, carrinho, WhatsApp, fluxo de identificação de peça) é simulada em HTML/CSS/JS puro para demonstrar arquitetura, hierarquia de informação e fluxo de compra.

## Como visualizar

Não é necessário build. Basta servir os arquivos estáticos e abrir `index.html`:

```bash
python3 -m http.server 8000
# depois acesse http://localhost:8000/index.html
```

## Telas incluídas

- `index.html` — Home (busca principal, categorias, benefícios, banner, vitrine, autoridade, ajuda, marcas, conteúdo, depoimentos)
- `categoria.html?cat=` — Listagem de categoria com filtros e ordenação
- `busca.html?q=` — Resultados de busca
- `produto.html?id=` — Ficha de produto completa
- `marca.html?marca=` — Página de marca
- `categorias.html` / `marcas.html` / `conteudo.html` — Páginas "ver todas"
- `ajuda.html` — Fluxo "Não sabe qual peça comprar?" (4 passos)
- `carrinho.html` — Carrinho simulado (localStorage)
- `conta.html` / `pedidos.html` — Placeholders de área logada

## Lógica central

**Encontrar → Identificar → Validar → Comprar.**
