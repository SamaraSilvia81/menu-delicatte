<div align="center">
  <img src="assets/img/banner-delicatte.jpg" alt="Delicatte Confeitaria" width="100%" style="border-radius: 12px; max-height: 340px; object-fit: cover;" />
</div>

<br />

<div align="center">
  <h1>✦ Delicatte — Cardápio Digital</h1>
  <p>Cardápio digital para uso presencial via QR code, construído com HTML e CSS puros.</p>
</div>

<br />

<div align="center">

![Status](https://img.shields.io/static/v1?label=STATUS&message=Em%20andamento&color=860120&style=for-the-badge)
![Fase](https://img.shields.io/static/v1?label=FASE&message=Sem%20JavaScript&color=5c0116&style=for-the-badge)
![HTML5](https://img.shields.io/static/v1?label=HTML&message=5&color=e34f26&style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/static/v1?label=CSS&message=3&color=1572b6&style=for-the-badge&logo=css3&logoColor=white)

</div>

---

## Sobre o projeto

A Delicatte é uma confeitaria artesanal fictícia usada como projeto de ensino no curso **Técnico em Desenvolvimento de Sistemas** da ETE Cícero Dias, Recife — PE.

O cardápio digital é pensado para uso presencial: o cliente escaneia o QR code na mesa, navega pelo cardápio e chama o atendente para pedir. Não há carrinho, não há pedido online. É uma **vitrine digital** — o equivalente a um cardápio físico, só que no celular.

Este repositório representa a **fase sem JavaScript**. Toda a navegação e estrutura funciona exclusivamente com HTML e CSS.

---

## Jornada do usuário

```
Cliente senta na mesa
       ↓
Escaneia o QR code
       ↓
Tela de boas-vindas (index.html)
       ↓
Clica em "Ver cardápio"  →  cardapio.html
       ↓
Navega pelos produtos
       ↓
Clica em um card  →  produtos/nome-do-produto.html
       ↓
Chama o atendente para pedir
```

---

## Stack

| Tecnologia | Uso |
|---|---|
| HTML5 | Estrutura e semântica de todas as páginas |
| CSS3 | Estilização, layout responsivo e design tokens |
| Google Fonts | Cormorant Garamond + DM Sans |
| Unsplash | Imagens dos produtos (URLs externas) |

Sem frameworks, sem bibliotecas, sem bundler, sem JavaScript.

---

## Estrutura de pastas

```
cardapio/
├── index.html              ← tela de boas-vindas
├── cardapio.html           ← grade de produtos
├── css/
│   ├── global.css          ← variáveis, reset e utilitários
│   ├── capa.css            ← estilos da tela de boas-vindas
│   ├── cardapio.css        ← estilos do cardápio
│   └── produto.css         ← estilos das páginas de detalhe
├── assets/
│   └── img/
│       ├── about.jpg       ← foto da vitrine (usada na capa)
│       └── hero.jpg
├── db.json                 ← dados dos produtos (usado na fase com JS)
└── produtos/
    ├── torta-morango.html
    ├── torta-limao.html
    ├── cheesecake.html
    ├── bolo-cenoura.html
    ├── red-velvet.html
    ├── bombom-trufa.html
    ├── bombom-pistache.html
    ├── macarons.html
    ├── eclair.html
    └── selecao-da-casa.html
```

---

## Tópicos abordados

### HTML
- Estrutura base de um documento (`DOCTYPE`, `head`, `body`)
- Tags semânticas: `header`, `main`, `footer`, `section`, `aside`, `nav`
- Hierarquia de títulos: `h1` → `h3`
- Tags de texto: `p`, `strong`, `em`, `span`
- Agrupamento: `div`
- Mídia: `img` com `alt`, `loading="lazy"`
- Formulário: `input`, `label`, `button`
- Navegação com `<a href>` e caminhos relativos
- Atributos globais: `class`, `id`, `hidden`, `tabindex`
- Acessibilidade: `aria-label`, `aria-hidden`, `role`
- Dados customizados: `data-*`
- Modal nativo: `<dialog>`

### CSS
- Design tokens com variáveis CSS (`:root` + `var()`)
- Reset e `box-sizing: border-box`
- Box model: `margin`, `padding`, `border`
- Tipografia: `font-family`, `font-size`, `line-height`, `letter-spacing`
- Cores: hexadecimal, `rgba()`, `opacity`
- Backgrounds: `linear-gradient`, `radial-gradient`
- Seletores: classe, pseudo-classe (`:hover`, `:focus-visible`), pseudo-elemento (`::before`, `::after`)
- Posicionamento: `relative`, `absolute`, `fixed`, `sticky`
- `z-index` e contexto de empilhamento
- `overflow: hidden` para recorte de imagens
- `object-fit: cover`
- Flexbox: `display: flex`, `align-items`, `justify-content`, `gap`
- CSS Grid: `grid-template-columns`, `repeat()`, `auto-fill`, `minmax()`
- `clamp()` para tipografia fluida
- `transition` e `transform`
- `backdrop-filter: blur`
- `filter: blur` e `pointer-events`
- Media queries (mobile-first e desktop-first)
- Acessibilidade no CSS: `.sr-only`, `:focus-visible`

---

## Próxima fase

A branch `com-js` vai adicionar JavaScript ao projeto. O HTML e o CSS não mudam — o script assume o que hoje é feito por navegação entre páginas:

| Hoje (sem JS) | Com JS |
|---|---|
| Card é `<a href="produtos/...">` — navega | Script intercepta o clique e abre modal |
| Produtos escritos manualmente no HTML | `fetch(db.json)` gera os cards automaticamente |
| Filtros e busca são visuais apenas | Script ativa o comportamento |
| Mesa: badge oculto | Script lê `?mesa=N` da URL e exibe o badge |

---

## Documentação

A documentação completa está na **Wiki** deste repositório:

- `HTML — Conceitos e referência` — o que é cada tag, atributo e elemento do projeto
- `CSS — Conceitos e referência` — o que é cada propriedade, seletor e técnica usada
- `Tutorial` — passo a passo de como o projeto foi construído

---

<div align="center">
  <sub>Projeto didático — ETE Cícero Dias · Recife, PE</sub>
</div>
