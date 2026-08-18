# Neshop — Protótipo de Wireframe Navegável (Redesign)

⚠️ **Este é um protótipo/wireframe de alta fidelidade estrutural, para apresentação e validação interna com os gestores da Neshop. Não é o site oficial e não deve ser tratado como implementação definitiva.**

Não há backend, pagamentos reais, login real, banco de dados ou estoque real. Toda a navegação (busca, filtros, carrinho, WhatsApp, fluxo de identificação de peça) é simulada em HTML/CSS/JS puro para demonstrar arquitetura, hierarquia de informação e fluxo de compra.

## Como visualizar

Tudo está em **um único arquivo autocontido** (`index.html` — HTML, CSS e JavaScript embutidos, sem dependências externas nem outros arquivos). Basta abrir com duplo clique direto no navegador, não precisa de servidor nem internet.

A navegação entre telas acontece via JavaScript (hash routing), sem recarregar a página — exatamente como um site real, incluindo suporte ao botão "voltar" do navegador.

Se preferir, também pode servir via HTTP:

```bash
python3 -m http.server 8000
# depois acesse http://localhost:8000/index.html
```

## Telas incluídas (todas dentro do mesmo index.html)

- `#/home` — Home (busca principal, categorias, benefícios, banner, vitrine, autoridade, ajuda, marcas, conteúdo, depoimentos)
- `#/categoria?cat=` — Listagem de categoria com filtros e ordenação
- `#/busca?q=` — Resultados de busca
- `#/produto?id=` — Ficha de produto completa
- `#/marca?marca=` — Página de marca
- `#/categorias` / `#/marcas` / `#/conteudo` — Páginas "ver todas"
- `#/ajuda` — Fluxo "Não sabe qual peça comprar?" (4 passos)
- `#/carrinho` — Carrinho simulado (localStorage)
- `#/conta` / `#/pedidos` — Placeholders de área logada

## Lógica central

**Encontrar → Identificar → Validar → Comprar.**
