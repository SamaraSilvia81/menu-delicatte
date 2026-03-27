# Passo a Passo — Cardápio Digital Delicatte
### Projeto de nivelamento em JavaScript Moderno · HTML Semântico · CSS Mobile-First

---

> **Para quem é este documento?**  
> Para você, que está construindo este projeto pela primeira vez. Cada passo explica o *porquê* antes do *como*. Não pule explicações — elas são a aula.

---

## O que vamos construir

Um cardápio digital para uso presencial em restaurante. O cliente escaneia um QR code na mesa, o cardápio abre no celular e ele consulta os produtos antes de chamar o garçom. **Não há carrinho de compras** — é uma vitrine digital.

O projeto tem exatamente **3 arquivos**:

```
cardapio-delicatte/
├── index.html   → estrutura e semântica da página
├── style.css    → identidade visual (mobile-first)
└── script.js    → toda a lógica JavaScript (aqui está a aula)
```

---

## Parte 1 — Estrutura HTML e Semântica

Antes de escrever uma linha de JavaScript, precisamos de uma estrutura HTML bem construída. **HTML semântico** significa usar o elemento certo para cada tipo de conteúdo — não apenas `<div>` para tudo.

### Por que semântica importa?

Há três razões práticas:

1. **Acessibilidade**: leitores de tela (usados por pessoas cegas) navegam pela página usando as âncoras semânticas. Um `<header>` sinaliza o cabeçalho; um `<main>` sinaliza o conteúdo principal. Sem isso, o leitor lê tudo como texto plano.
2. **SEO**: mecanismos de busca entendem melhor a hierarquia do conteúdo quando os elementos têm significado.
3. **Manutenção**: código semântico é mais fácil de ler e de manter — qualquer desenvolvedor entende a estrutura sem precisar de comentários.

---

### Passo 1.1 — O esqueleto do `index.html`

Crie o arquivo `index.html` e comece com a estrutura básica:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Cardápio — Delicatte</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>

  <!-- aqui vai o conteúdo -->

  <script src="script.js"></script>
</body>
</html>
```

> 💡 **Por que `<script>` no final do `<body>`?**  
> O navegador lê o HTML de cima para baixo. Se o `<script>` viesse no `<head>`, o JS tentaria manipular elementos HTML que ainda não existem. Colocando ao final, garantimos que todo o HTML já foi lido antes de o JavaScript rodar.

> 💡 **`<meta name="viewport">`**  
> Essa linha é obrigatória para qualquer site mobile. Sem ela, o celular vai renderizar a página como se fosse um desktop (tudo minúsculo). Com ela, a largura da viewport fica igual à largura real da tela.

---

### Passo 1.2 — Os elementos semânticos principais

Adicione as seções principais dentro do `<body>`, na ordem em que aparecem visualmente:

```html
<body>

  <!-- HEADER: cabeçalho da página — fica fixo no topo -->
  <header class="header">
    <!-- logo + badge de mesa -->
  </header>

  <!-- ASIDE: conteúdo secundário — aviso de "como funciona" -->
  <aside class="instrucao-bar">
    <!-- instrução para o cliente -->
  </aside>

  <!-- SECTION: seção do hero (título principal) -->
  <section class="hero">
    <!-- título e subtítulo -->
  </section>

  <!-- SECTION: seção de filtros (busca + categorias) -->
  <section class="filters-section">
    <!-- input de busca + botões de categoria -->
  </section>

  <!-- MAIN: conteúdo principal e único da página -->
  <main class="main">
    <!-- grid de produtos -->
  </main>

  <!-- DIALOG: modal de detalhes do produto (elemento nativo HTML) -->
  <dialog class="modal" id="modal">
    <!-- conteúdo do modal -->
  </dialog>

  <!-- FOOTER: rodapé -->
  <footer class="footer">
    <!-- créditos e instrução final -->
  </footer>

  <!-- Botão flutuante (FAB) -->
  <a class="fab" href="#">Chamar garçom</a>

  <script src="script.js"></script>
</body>
```

**Glossário dos elementos usados:**

| Elemento    | Significado semântico |
|-------------|----------------------|
| `<header>`  | Cabeçalho da página ou seção. Geralmente contém logo, navegação, título. |
| `<aside>`   | Conteúdo relacionado mas não central ao fluxo principal. |
| `<section>` | Agrupamento temático de conteúdo com um título implícito ou explícito. |
| `<main>`    | Conteúdo principal e único da página. Só deve existir um por página. |
| `<footer>`  | Rodapé da página. Pode conter créditos, links secundários, contato. |
| `<dialog>`  | Elemento nativo do HTML para diálogos/modais. Tem comportamento de acessibilidade embutido. |
| `<article>` | Conteúdo independente e autossuficiente (ex: um card de produto, um post de blog). Criado via JS. |
| `<nav>`     | Bloco de navegação (menus, links de âncora, categorias). |

---

### Passo 1.3 — Preenchendo o `<header>`

```html
<header class="header">
  <div class="container">
    <div class="header-inner">

      <!-- Logo: <a> com href="#" ancora ao topo da página -->
      <!-- aria-label descreve o link para leitores de tela -->
      <a href="#" class="logo" aria-label="Delicatte — início">
        <span class="logo-icon" aria-hidden="true">✦</span>
        <span class="logo-text">Delicatte</span>
      </a>

      <!-- Badge de mesa: preenchido pelo JS quando a URL tem ?mesa=N -->
      <!-- "hidden" oculta o elemento até o JS ativá-lo -->
      <!-- aria-live="polite" avisa leitores de tela quando o conteúdo muda -->
      <div class="mesa-badge" id="mesa-badge" aria-live="polite" hidden>
        <span class="mesa-label">Mesa</span>
        <span class="mesa-numero" id="mesa-numero">—</span>
      </div>

    </div>
  </div>
</header>
```

> 💡 **`aria-hidden="true"`**  
> O ícone `✦` é decorativo — não tem significado para quem usa leitor de tela. `aria-hidden` faz o leitor de tela pular esse elemento.

> 💡 **`hidden`**  
> Atributo HTML nativo que oculta o elemento. Diferente de `display: none` no CSS: o `hidden` tem valor semântico — indica que o conteúdo não está disponível *agora*, mas pode se tornar relevante. O JavaScript vai remover esse atributo quando detectar o número da mesa na URL.

---

### Passo 1.4 — Aviso de instrução com `<aside>`

```html
<aside class="instrucao-bar" role="note" aria-label="Como fazer seu pedido">
  <div class="container">
    <p class="instrucao-texto">
      <span aria-hidden="true">👀</span>
      Explore o cardápio à vontade e <strong>chame o garçom</strong> para fazer seu pedido.
    </p>
  </div>
</aside>
```

> 💡 **Por que `<aside>` aqui?**  
> O `<aside>` sinaliza que este conteúdo é relacionado ao contexto da página mas não é o conteúdo principal. Um aviso de orientação ao usuário se encaixa perfeitamente — é útil, mas não é o cardápio em si.

---

### Passo 1.5 — Seção de filtros com semântica de busca

```html
<section class="filters-section" role="search" aria-label="Filtrar produtos">
  <div class="container">
    <div class="filters-wrapper">

      <!-- Campo de busca -->
      <div class="search-wrap">

        <!-- <label> é obrigatório para acessibilidade de formulários -->
        <!-- "for" aponta para o "id" do input correspondente -->
        <!-- "sr-only" = visualmente oculto, mas lido por leitores de tela -->
        <label for="search-input" class="sr-only">Buscar doce por nome</label>

        <input
          type="search"
          id="search-input"
          class="search-input"
          placeholder="Buscar doce..."
          autocomplete="off"
        />
      </div>

      <!-- Botões de categoria -->
      <!-- role="group" + aria-label descrevem o conjunto de botões -->
      <nav class="categories" id="categories" role="group" aria-label="Filtrar por categoria">
        <button class="category-btn active" data-categoria="todos">Todos</button>
        <button class="category-btn" data-categoria="tortas">Tortas</button>
        <button class="category-btn" data-categoria="bolos">Bolos</button>
        <button class="category-btn" data-categoria="bombons">Bombons</button>
        <button class="category-btn" data-categoria="especial">Especial</button>
      </nav>

    </div>
  </div>
</section>
```

> 💡 **`data-categoria`**  
> Atributos `data-*` são atributos customizados do HTML5. Servem para armazenar dados diretamente no elemento, que o JavaScript pode ler facilmente via `element.dataset.categoria`. Aqui, cada botão carrega sua própria categoria como dado.

---

### Passo 1.6 — O `<main>` e o `<dialog>`

```html
<main class="main" id="main-content">
  <div class="container">

    <!-- Contador de resultados — atualizado pelo JS -->
    <!-- aria-live="polite" anuncia mudanças para leitores de tela -->
    <p class="results-count" id="results-count" aria-live="polite"></p>

    <!-- Grade de cards — preenchida dinamicamente pelo script.js -->
    <!-- role="list" + role="listitem" nos cards criam lista semântica -->
    <div class="products-grid" id="products-grid" role="list"></div>

    <!-- Estado vazio: aparece quando nenhum produto é encontrado -->
    <div class="empty-state hidden" id="empty-state" role="status">
      <span class="empty-icon" aria-hidden="true">🍰</span>
      <p class="empty-text">Nenhum doce encontrado.</p>
      <p class="empty-sub">Tente outro termo ou categoria.</p>
    </div>

  </div>
</main>

<!-- Modal de detalhes do produto -->
<!-- aria-modal="true" + aria-labelledby fazem o leitor de tela -->
<!-- anunciar o nome do produto ao abrir o modal -->
<dialog class="modal" id="modal" aria-modal="true" aria-labelledby="modal-nome">

  <button class="modal-close" id="modal-close" aria-label="Fechar detalhes do produto">
    ✕
  </button>

  <div class="modal-img-wrap">
    <img class="modal-img" id="modal-img" src="" alt="" />
    <span class="modal-badge" id="modal-badge" hidden>✦ Destaque</span>
  </div>

  <div class="modal-body">
    <span class="modal-categoria" id="modal-categoria"></span>
    <h2 class="modal-nome" id="modal-nome"></h2>
    <p class="modal-descricao" id="modal-descricao"></p>
    <div class="modal-infos" id="modal-infos"></div>
    <div class="modal-footer">
      <span class="modal-preco" id="modal-preco"></span>
      <span class="modal-disponibilidade" id="modal-disponibilidade"></span>
    </div>
    <p class="modal-instrucao">🛎️ Chame o garçom para pedir este item.</p>
  </div>

</dialog>

<!-- Backdrop: fundo escurecido por trás do modal -->
<div class="modal-backdrop" id="modal-backdrop" aria-hidden="true"></div>
```

> 💡 **`<dialog>` — o modal nativo do HTML**  
> O `<dialog>` foi criado exatamente para isso. Ao usar `modal.showModal()` no JavaScript, o navegador: (1) exibe o elemento, (2) bloqueia o foco dentro do modal (tab não sai), (3) fecha com `Escape` automaticamente, (4) gerencia a pilha de acessibilidade. Antes do `<dialog>` existir, precisávamos recriar tudo isso manualmente.

---

## Parte 2 — CSS Mobile-First

### O que significa Mobile-First?

Significa escrever os estilos base para **telas pequenas primeiro** e depois usar `@media (min-width: N)` para adaptar o layout para telas maiores. É o oposto de começar no desktop e "ajustar para mobile" depois.

**Por quê?** Porque a maioria dos usuários de cardápio digital está no celular. Projetar para o menor contexto primeiro garante que a experiência essencial funcione bem antes de adicionar complexidade para telas maiores.

---

### Passo 2.1 — Design Tokens (variáveis CSS)

As variáveis CSS ficam no `:root` e definem a identidade visual inteira da Delicatte. Se o cliente quiser mudar a cor principal, mudamos em um único lugar.

```css
:root {
  /* Paleta de cores */
  --crimson:      #860120;    /* vermelho principal — botões, destaques, preços */
  --blush-soft:   #fde8ee;    /* rosa claro — fundos suaves */
  --cream:        #fffbef;    /* creme — fundo geral */
  --text-1:       #1a0a0f;    /* texto principal */
  --text-muted:   #9a7a82;    /* texto secundário/suave */

  /* Tipografia */
  --font-display: 'Cormorant Garamond', Georgia, serif; /* títulos elegantes */
  --font-body:    'DM Sans', system-ui, sans-serif;     /* corpo legível */

  /* Bordas e sombras */
  --radius-xl:    32px;
  --shadow-sm:    0 1px 3px rgba(134,1,32,.08);

  /* Transições */
  --t:            200ms cubic-bezier(.4,0,.2,1);
}
```

---

### Passo 2.2 — Reset e base

```css
*, *::before, *::after {
  box-sizing: border-box; /* padding e border não aumentam o tamanho do elemento */
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-body);
  background: var(--cream);
  color: var(--text-1);
  min-height: 100vh;
  overflow-x: hidden; /* sem scroll horizontal acidental */
}

/* Classe utilitária: visível para leitores de tela, invisível visualmente */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border-width: 0;
}
```

---

### Passo 2.3 — Grid de produtos (mobile-first)

```css
/* MOBILE (base): 2 colunas lado a lado */
.products-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 colunas iguais */
  gap: 1rem;
}

/* TABLET/DESKTOP: colunas automáticas com largura mínima */
@media (min-width: 600px) {
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1.4rem;
  }
}
```

> 💡 **`repeat(auto-fill, minmax(260px, 1fr))`**  
> O navegador calcula automaticamente quantas colunas cabem na tela, sendo que cada uma tem no mínimo 260px e no máximo 1fr (a fração disponível). Em um celular de 360px, cabem 2 colunas de ~160px (abaixo do mínimo — por isso forçamos `repeat(2, 1fr)` no mobile). Em um desktop de 1200px, cabem 4 colunas confortáveis.

---

### Passo 2.4 — Modal como bottom sheet no mobile

```css
/* MOBILE: modal sobe pela parte inferior da tela (bottom sheet) */
.modal {
  position: fixed;
  inset: 0;
  margin: auto;
  z-index: 300;
  border: none;
  padding: 0;
  width: 100%;
  max-width: 520px;
  max-height: 90vh;
  overflow-y: auto;
  bottom: 0;
  top: auto; /* ancora no fundo */
  border-radius: 32px 32px 0 0; /* arredondado só no topo */
  animation: slideUp .35s cubic-bezier(.2,.8,.3,1) both;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(60px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* DESKTOP: modal centralizado na tela */
@media (min-width: 600px) {
  .modal {
    border-radius: 32px; /* arredondado em todos os lados */
    bottom: auto;
    top: 50%;
    transform: translateY(-50%);
    max-height: 85vh;
  }
}
```

---

## Parte 3 — JavaScript Moderno

Agora começa a parte principal. Vamos construir o `script.js` passo a passo, entendendo cada conceito antes de aplicá-lo.

---

### Passo 3.1 — O array de produtos (objetos literais)

A estrutura de dados principal da aplicação é um **array de objetos literais**. Cada doce é um objeto com pares `chave: valor`.

```javascript
// const: referência imutável — o array não vai ser reatribuído
const produtos = [
  {
    id: 1,
    nome: "Torta de Morango",
    descricao: "Massa amanteigada, creme pâtissière e morangos frescos.",
    descricaoCompleta: "Nossa torta de morango é preparada diariamente com...",
    preco: 89.90,
    porcao: "Fatia · serve 1",       // novidade: informa a unidade
    categoria: "tortas",
    destaque: true,
    disponivel: "sim",                // novidade: 'sim', 'nao' ou 'limitado'
    alergicos: ["glúten", "leite", "ovos"],  // novidade: array de strings
    foto: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80"
  },
  // ... mais produtos
]
```

> 💡 **Objetos literais e o React**  
> Em React, cada componente recebe dados no formato de objeto — são as `props`. Dominar objetos literais agora significa que você já sabe trabalhar com props quando o React aparecer.

---

### Passo 3.2 — Estado da aplicação

```javascript
// let: pode ser reatribuído conforme o usuário interage
let categoriaAtiva = "todos"
let termoBusca = ""
let produtoAberto = null   // vai guardar o objeto do produto aberto no modal
```

> 💡 **Estado da aplicação**  
> "Estado" é o conjunto de valores que descrevem a situação atual da interface. Se `categoriaAtiva` é `"tortas"`, a interface deve mostrar só tortas. Se `termoBusca` é `"morango"`, só mostra produtos com "morango" no nome. Toda vez que o estado muda, re-renderizamos a interface.

---

### Passo 3.3 — Selecionar elementos do DOM

```javascript
// document.getElementById: encontra o elemento pelo atributo id do HTML
// const: a referência ao elemento não muda — só o conteúdo
const grid           = document.getElementById("products-grid")
const searchInput    = document.getElementById("search-input")
const categorias     = document.getElementById("categories")
const resultsCount   = document.getElementById("results-count")
const mesaBadge      = document.getElementById("mesa-badge")
const mesaNumero     = document.getElementById("mesa-numero")
const modal          = document.getElementById("modal")
const modalClose     = document.getElementById("modal-close")
const modalImg       = document.getElementById("modal-img")
const modalNome      = document.getElementById("modal-nome")
const modalDescricao = document.getElementById("modal-descricao")
const modalPreco     = document.getElementById("modal-preco")
const backdrop       = document.getElementById("modal-backdrop")
const fabGarcom      = document.getElementById("fab-garcom")
```

---

### Passo 3.4 — Funções utilitárias com arrow functions

**Arrow function com retorno implícito** (uma linha, sem `return`, sem `{}`):

```javascript
// Formata número para Real Brasileiro: 89.9 → "R$ 89,90"
const formatarPreco = (valor) =>
  valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })

// Retorna o texto do status de disponibilidade
const textoDisponibilidade = (status) => {
  if (status === "nao")      return "Esgotado hoje"
  if (status === "limitado") return "Últimas unidades"
  return "Disponível"
}

// Retorna a classe CSS do badge de disponibilidade
const classeDisponibilidade = (status) => {
  if (status === "nao")      return "esgotado"
  if (status === "limitado") return "limitado"
  return "disponivel"
}
```

> 💡 **Retorno implícito**  
> Quando a arrow function tem apenas uma expressão, você pode omitir as chaves `{}` e a palavra `return`. O resultado da expressão é automaticamente retornado. É mais conciso e muito comum no código moderno.

---

### Passo 3.5 — Detectar o número da mesa pela URL

Esta é uma funcionalidade chave do cardápio digital. O QR code aponta para:  
`https://seudominio.com/cardapio?mesa=12`

O `?mesa=12` é um **parâmetro de URL** (query string). JavaScript lê isso assim:

```javascript
const detectarMesa = () => {
  // URLSearchParams lê os parâmetros da URL atual (?chave=valor)
  const params = new URLSearchParams(window.location.search)

  // .get("mesa") retorna o valor do parâmetro, ou null se não existir
  const mesa = params.get("mesa")

  if (mesa) {
    // Preenche o número no badge do header
    mesaNumero.textContent = mesa

    // .hidden = false remove o atributo "hidden" e torna o badge visível
    mesaBadge.hidden = false

    // Monta a URL do WhatsApp com mensagem pré-preenchida
    // encodeURIComponent escaparia os caracteres especiais, mas aqui usamos
    // %20 para espaço e %C3%A3 para ã diretamente na string
    fabGarcom.href = `https://wa.me/5581999999999?text=Ol%C3%A1%21+Estou+na+Mesa+${mesa}+e+gostaria+de+fazer+um+pedido.`
  } else {
    fabGarcom.href = `https://wa.me/5581999999999?text=Ol%C3%A1%21+Gostaria+de+fazer+um+pedido.`
  }
}
```

> 💡 **Como testar localmente?**  
> Abra o arquivo no navegador e adicione o parâmetro manualmente na barra de endereço:  
> `file:///caminho/para/index.html?mesa=7`  
> O badge "Mesa 7" vai aparecer no header.

---

### Passo 3.6 — Criar um card com destructuring e template literal

Esta é a função mais importante do projeto. Ela cria um `<article>` para cada produto.

```javascript
// Destructuring no parâmetro: em vez de receber o objeto completo
// e escrever produto.nome, produto.preco etc., já extraímos as propriedades
// que precisamos direto na assinatura da função.

const criarCard = ({ id, nome, descricao, preco, porcao, categoria, destaque, disponivel, foto }) => {

  // Cria um novo elemento <article> na memória (não está na tela ainda)
  const article = document.createElement("article")
  article.className = "card"
  article.dataset.id = id              // gera data-id="1" no HTML
  article.setAttribute("role", "listitem")  // semântica de lista
  article.setAttribute("tabindex", "0")     // permite foco por teclado

  // Operador ternário: condição ? valor_se_true : valor_se_false
  // Aqui decidimos se o badge "Destaque" aparece ou não
  const badgeHTML = destaque
    ? '<span class="card-badge">✦ Destaque</span>'
    : ""

  // Badge de disponibilidade: só aparece se o produto não estiver disponível normalmente
  const dispHTML = disponivel !== "sim"
    ? `<div class="card-disponibilidade ${disponivel === "nao" ? "esgotado" : "limitado"}">
         ${textoDisponibilidade(disponivel)}
       </div>`
    : ""

  // Template literal: constrói o HTML interno do card com interpolação ${}
  article.innerHTML = `
    <div class="card-img-wrap">
      <img
        class="card-img"
        src="${foto}"
        alt="Foto de ${nome}"
        loading="lazy"
      />
      ${badgeHTML}
      ${dispHTML}
    </div>
    <div class="card-body">
      <span class="card-category">${categoria}</span>
      <h3 class="card-name">${nome}</h3>
      <p class="card-desc">${descricao}</p>
      <div class="card-footer">
        <div>
          <p class="card-price">${formatarPreco(preco)}</p>
          <p class="card-porcao">${porcao}</p>
        </div>
        <span class="card-ver-mais" aria-hidden="true">Ver mais →</span>
      </div>
    </div>
  `

  return article
}
```

> 💡 **`loading="lazy"` nas imagens**  
> Faz o navegador carregar a imagem só quando ela estiver prestes a entrar na viewport (visão do usuário). Em um cardápio com 10+ produtos, isso economiza dados de quem está no celular — as imagens do final da página não são carregadas até o usuário rolar até lá.

---

### Passo 3.7 — Abrir o modal

```javascript
const abrirModal = (id) => {
  // Array.find: retorna o primeiro elemento que satisfaz a condição
  // Number(id) converte string para número (dataset sempre retorna string)
  const produto = produtos.find((p) => p.id === Number(id))
  if (!produto) return

  produtoAberto = produto  // atualiza o estado

  // Preenche os campos do modal com os dados do produto
  modalImg.src = produto.foto
  modalImg.alt = `Foto de ${produto.nome}`
  modalNome.textContent = produto.nome
  modalDescricao.textContent = produto.descricaoCompleta
  modalPreco.textContent = formatarPreco(produto.preco)

  // Tags de informação: porção + alergênicos
  // Spread operator (...) combina dois arrays em um só
  const tagsHTML = [
    `<span class="modal-info-tag">🍽️ ${produto.porcao}</span>`,
    ...produto.alergicos.map(
      (a) => `<span class="modal-info-tag">⚠️ ${a}</span>`
    )
  ].join("")  // .join("") transforma o array de strings em uma única string

  document.getElementById("modal-infos").innerHTML = tagsHTML

  // showModal() é o método nativo do <dialog> — mais poderoso que mostrar/ocultar via CSS
  modal.showModal()
  backdrop.classList.add("ativo")
  document.body.style.overflow = "hidden"  // bloqueia scroll da página
}
```

> 💡 **Spread operator `...` com arrays**  
> `[itemA, ...outroArray]` cria um novo array que começa com `itemA` e continua com todos os elementos de `outroArray`. Aqui usamos para combinar a tag de porção com as tags de alergênicos em um único array.

---

### Passo 3.8 — Renderizar os produtos com `.filter()` e `.map()`

Esta é a função que atualiza toda a grade de cards quando o usuário filtra ou busca.

```javascript
const renderizarProdutos = () => {

  // filter: retorna novo array com itens que passam na condição (predicado)
  // Se categoriaAtiva for "todos", retorna o array original inteiro
  const filtradosPorCategoria = categoriaAtiva === "todos"
    ? produtos
    : produtos.filter((p) => p.categoria === categoriaAtiva)

  // Segundo filter: pelo termo de busca digitado
  // .includes() verifica se uma string contém outra
  // .toLowerCase() garante que "Morango" e "morango" dão o mesmo resultado
  const filtrados = filtradosPorCategoria.filter((p) =>
    p.nome.toLowerCase().includes(termoBusca.toLowerCase())
  )

  // Limpa o DOM antes de reinjetar os cards
  grid.innerHTML = ""

  // Estado vazio: nenhum produto encontrado
  if (filtrados.length === 0) {
    emptyState.classList.remove("hidden")
    resultsCount.textContent = ""
    return  // sai da função aqui
  }

  emptyState.classList.add("hidden")
  resultsCount.textContent = `${filtrados.length} ${filtrados.length === 1 ? "produto" : "produtos"} encontrados`

  // map: transforma cada objeto produto em um elemento <article>
  // forEach: injeta cada elemento no DOM
  filtrados
    .map(criarCard)
    .forEach((card, i) => {
      card.style.animationDelay = `${i * 60}ms`  // entrada escalonada
      grid.appendChild(card)
    })
}
```

**Resumo visual do fluxo:**

```
produtos (array original)
    ↓ .filter(categoria)
filtradosPorCategoria
    ↓ .filter(busca)
filtrados
    ↓ .map(criarCard)
[<article>, <article>, ...]
    ↓ .forEach(appendChild)
DOM atualizado na tela
```

---

### Passo 3.9 — Eventos

Eventos são a forma como o JavaScript reage às ações do usuário.

```javascript
// Evento 'input': dispara a cada tecla digitada
// e.target = o elemento que disparou o evento (o input)
// e.target.value = o texto digitado até agora
searchInput.addEventListener("input", (e) => {
  termoBusca = e.target.value
  renderizarProdutos()
})

// Delegação de eventos: ouvimos o container pai (categorias)
// em vez de adicionar um listener em cada botão individualmente.
// Isso é mais eficiente e funciona mesmo para botões adicionados dinamicamente.
categorias.addEventListener("click", (e) => {
  const btn = e.target.closest(".category-btn")
  if (!btn) return  // clique em área vazia — ignora

  // Remove active de todos, adiciona no clicado
  categorias.querySelectorAll(".category-btn").forEach((b) => b.classList.remove("active"))
  btn.classList.add("active")

  categoriaAtiva = btn.dataset.categoria
  renderizarProdutos()
})

// Delegação no grid: detecta clique em qualquer card filho
grid.addEventListener("click", (e) => {
  const card = e.target.closest(".card")
  if (!card) return
  abrirModal(card.dataset.id)
})

// Fechar modal
modalClose.addEventListener("click", fecharModal)
backdrop.addEventListener("click", fecharModal)
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.open) fecharModal()
})
```

> 💡 **`e.target.closest(".seletor")`**  
> `.closest()` sobe na árvore HTML a partir do elemento clicado, procurando o ancestral mais próximo que corresponda ao seletor. Se o usuário clicou na imagem dentro do card, `e.target` é a imagem — mas `.closest(".card")` encontra o `<article>` pai. Isso torna a delegação de eventos robusta independente de qual elemento filho foi clicado.

---

### Passo 3.10 — Fetch e assincronismo

```javascript
// async: marca a função como assíncrona — ela pode usar await
const buscarDadosDaAPI = async () => {
  try {
    // await: pausa a execução até a Promise resolver
    // fetch retorna uma Promise que resolve quando o servidor responde
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1")

    // .json() converte o texto da resposta em objeto JavaScript
    // também retorna uma Promise, então precisamos de await
    const data = await response.json()

    console.log("✦ Dado retornado pela API:", data)

  } catch (erro) {
    // catch captura erros de rede, servidor fora do ar, etc.
    console.error("Erro ao buscar da API:", erro)
  }
}
```

> 💡 **Por que assincronismo?**  
> JavaScript é single-threaded — executa uma coisa por vez. Se uma operação demorada (buscar dados de um servidor) bloqueasse o código, a página travaria até a resposta chegar. `async/await` permite que o JS "pause" apenas aquela função enquanto espera, sem travar o restante da página.

---

### Passo 3.11 — Inicialização

```javascript
// Essas três linhas executam assim que o script é carregado
detectarMesa()        // lê ?mesa=N da URL → atualiza o header
renderizarProdutos()  // renderiza os cards na tela pela primeira vez
buscarDadosDaAPI()    // demonstra fetch no console
```

---

## Parte 4 — Como o QR Code funciona

Para que o número da mesa apareça automaticamente no header, o QR code de cada mesa precisa apontar para uma URL diferente:

```
Mesa 1:  https://seudominio.com/cardapio/index.html?mesa=1
Mesa 2:  https://seudominio.com/cardapio/index.html?mesa=2
Mesa 12: https://seudominio.com/cardapio/index.html?mesa=12
```

O JavaScript lê o `?mesa=N` com `URLSearchParams` e exibe o número no badge do header. Isso significa que o **mesmo arquivo HTML** serve para todas as mesas — só a URL muda.

---

## Parte 5 — Tabela de Conceitos por Arquivo

| Conceito                     | Onde aparece no projeto            |
|-----------------------------|------------------------------------|
| `const` / `let`              | Todas as declarações do `script.js` |
| Objetos literais             | Array `produtos` no `script.js`    |
| Template literals            | `criarCard`, `abrirModal`          |
| Arrow functions              | Todas as funções                   |
| Retorno implícito            | `formatarPreco`, `classeDisponibilidade` |
| Destructuring                | Parâmetro de `criarCard`           |
| Spread operator (`...`)      | Montagem das tags em `abrirModal`  |
| `.filter()`                  | `renderizarProdutos`               |
| `.map()`                     | `renderizarProdutos`, `abrirModal` |
| `.forEach()`                 | Injeção dos cards no DOM           |
| `.find()`                    | Busca do produto por id em `abrirModal` |
| `URLSearchParams`            | `detectarMesa`                     |
| `addEventListener`           | Todos os eventos                   |
| Delegação de eventos         | Grid, categorias                   |
| `e.target.closest()`         | Delegação no grid e categorias     |
| `dataset` (data-*)           | `card.dataset.id`, `btn.dataset.categoria` |
| `async/await` + `fetch`      | `buscarDadosDaAPI`                 |
| `classList.add/remove`       | Ativar filtros, abrir/fechar modal |
| `document.createElement`     | Criação de cards no `criarCard`    |
| HTML Semântico               | `index.html` inteiro               |
| Mobile-first                 | `style.css` — base + `@media`     |
| `<dialog>` nativo            | Modal de detalhes                  |
| CSS Variables (`--var`)      | `:root` no `style.css`            |

---

## Parte 6 — Comparação: Vanilla JS × React

Ao terminar este projeto, fica clara a diferença entre os dois paradigmas:

**Vanilla JS (imperativo) — o que você escreveu:**
```javascript
// Você diz COMO fazer:
grid.innerHTML = ""                  // 1. limpe o DOM
filtrados.map(criarCard)             // 2. crie os cards
  .forEach(card => grid.appendChild(card))  // 3. injete no DOM
```

**React (declarativo) — o que virá depois:**
```jsx
// Você diz O QUE quer ver:
return (
  <div className="products-grid">
    {filtrados.map(produto => <Card key={produto.id} {...produto} />)}
  </div>
)
```

A lógica de `filtrados.map(...)` é **idêntica**. O React apenas elimina a necessidade de `innerHTML = ""` e `appendChild`. O JavaScript Moderno que você aprendeu aqui vai para dentro dos componentes React sem nenhuma mudança.

---

*Cardápio Digital Delicatte — Projeto de nivelamento JavaScript Moderno*  
*Produzido para uso em sala de aula.*
