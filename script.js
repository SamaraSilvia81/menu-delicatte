// ══════════════════════════════════════════════════════
//   DELICATTE — Cardápio Digital v3
//   Conceitos de JS cobertos neste arquivo:
//   ✦ const / let
//   ✦ Template literals
//   ✦ Objetos literais
//   ✦ Arrow functions (retorno implícito e explícito)
//   ✦ Array methods: map, filter
//   ✦ Destructuring de objetos
//   ✦ URLSearchParams (leitura de parâmetros da URL)
//   ✦ Eventos e delegação de eventos
//   ✦ Manipulação do DOM
//   ✦ fetch básico com async/await
// ══════════════════════════════════════════════════════


// ── 1. DADOS DOS PRODUTOS ─────────────────────────────────────
// Array de objetos literais. Cada objeto representa um produto.
// Novidades em relação à v2:
//   • "porcao": informa a unidade/tamanho (ex: "serve 2 pessoas")
//   • "disponivel": pode ser 'sim', 'nao' ou 'limitado'
//   • "alergicos": array de ingredientes alergênicos
//   • "descricaoCompleta": texto longo para o modal

const produtos = [
  {
    id: 1,
    nome: "Torta de Morango",
    descricao: "Massa amanteigada, creme pâtissière e morangos frescos.",
    descricaoCompleta: "Nossa torta de morango é preparada diariamente com massa amanteigada feita à mão, recheada com creme pâtissière aveludado e coberta com morangos frescos selecionados. Cada fatia é uma experiência de sabor e leveza.",
    preco: 89.90,
    porcao: "Fatia · serve 1",
    categoria: "tortas",
    destaque: true,
    disponivel: "sim",
    alergicos: ["glúten", "leite", "ovos"],
    foto: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80&fit=crop"
  },
  {
    id: 2,
    nome: "Bolo de Cenoura",
    descricao: "Clássico com cobertura de ganache de chocolate meio amargo.",
    descricaoCompleta: "Um clássico brasileiro reinventado. Nossa massa de cenoura é úmida e perfumada, coberta com uma generosa camada de ganache de chocolate meio amargo belga. Simplesmente irresistível.",
    preco: 65.00,
    porcao: "Fatia · serve 1",
    categoria: "bolos",
    destaque: false,
    disponivel: "sim",
    alergicos: ["glúten", "leite", "ovos"],
    foto: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&q=80&fit=crop"
  },
  {
    id: 3,
    nome: "Bombom de Trufa",
    descricao: "Trufa de chocolate belga com recheio de caramelo salgado.",
    descricaoCompleta: "Bombom artesanal com casca de chocolate belga 70% cacau, recheado com caramelo salgado feito com manteiga francesa e flor de sal. Um contraponto perfeito entre amargo e doce.",
    preco: 12.50,
    porcao: "Por unidade",
    categoria: "bombons",
    destaque: true,
    disponivel: "limitado",
    alergicos: ["leite", "soja"],
    foto: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=600&q=80&fit=crop"
  },
  {
    id: 4,
    nome: "Torta de Limão",
    descricao: "Merengue tostado na hora, recheio cremoso de limão siciliano.",
    descricaoCompleta: "A preferida da casa. Base de biscoito amanteigado, recheio de curd de limão siciliano e merengue suíço tostado na hora do pedido. Acidez e leveza em equilíbrio.",
    preco: 79.90,
    porcao: "Fatia · serve 1",
    categoria: "tortas",
    destaque: false,
    disponivel: "nao",
    alergicos: ["glúten", "ovos", "leite"],
    foto: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=600&q=80&fit=crop"
  },
  {
    id: 5,
    nome: "Caixa de Macarons",
    descricao: "6 unidades em sabores sortidos: pistache, framboesa e baunilha.",
    descricaoCompleta: "Seis macarons artesanais sortidos nos sabores do dia: pistache, framboesa e baunilha de Madagascar. Cada macaron é assado na manhã do dia de consumo para garantir a textura perfeita.",
    preco: 48.00,
    porcao: "Caixa com 6 un.",
    categoria: "especial",
    destaque: true,
    disponivel: "sim",
    alergicos: ["amêndoas", "ovos", "leite"],
    foto: "https://images.unsplash.com/photo-1558326567-98ae2405596b?w=600&q=80&fit=crop"
  },
  {
    id: 6,
    nome: "Bolo Red Velvet",
    descricao: "Massa aveludada com cream cheese frosting e pétalas de rosas.",
    descricaoCompleta: "O Red Velvet da Delicatte é uma experiência visual e gastronômica. Massa levíssima com cacau e corante natural, coberta com frosting de cream cheese e decorada com pétalas de rosas comestíveis.",
    preco: 95.00,
    porcao: "Fatia · serve 1",
    categoria: "bolos",
    destaque: false,
    disponivel: "sim",
    alergicos: ["glúten", "leite", "ovos"],
    foto: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=600&q=80&fit=crop"
  },
  {
    id: 7,
    nome: "Bombom de Pistache",
    descricao: "Chocolate branco com recheio cremoso de pasta de pistache.",
    descricaoCompleta: "Casca de chocolate branco Callebaut com recheio de ganache de pistache iraniano. Uma combinação sofisticada com notas amanteigadas e levemente salgadas.",
    preco: 15.00,
    porcao: "Por unidade",
    categoria: "bombons",
    destaque: false,
    disponivel: "sim",
    alergicos: ["leite", "pistache", "soja"],
    foto: "https://images.unsplash.com/photo-1511381939415-e44d37f3f7d3?w=600&q=80&fit=crop"
  },
  {
    id: 8,
    nome: "Seleção Especial",
    descricao: "Curadoria exclusiva de doces artesanais para momentos únicos.",
    descricaoCompleta: "Uma caixa curada especialmente para presentear ou para uma ocasião especial. A composição varia conforme a produção do dia — pergunte ao atendente quais doces fazem parte da seleção hoje.",
    preco: 189.00,
    porcao: "Caixa com 12 un.",
    categoria: "especial",
    destaque: true,
    disponivel: "limitado",
    alergicos: ["glúten", "leite", "ovos", "nozes"],
    foto: "https://images.unsplash.com/photo-1607478900766-efe13248b125?w=600&q=80&fit=crop"
  },
  {
    id: 9,
    nome: "Cheesecake de Frutas",
    descricao: "Base de biscoito, recheio cremoso e coulis de frutas vermelhas.",
    descricaoCompleta: "Cheesecake no estilo Nova-iorquino: base de biscoito amanteigado, recheio de cream cheese com baunilha e coulis de frutas vermelhas frescas. Servida bem gelada.",
    preco: 72.00,
    porcao: "Fatia · serve 1",
    categoria: "tortas",
    destaque: false,
    disponivel: "sim",
    alergicos: ["glúten", "leite", "ovos"],
    foto: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&q=80&fit=crop"
  },
  {
    id: 10,
    nome: "Éclair de Chocolate",
    descricao: "Massa choux recheada com creme de chocolate e glacê brilhante.",
    descricaoCompleta: "Éclair clássica de massa choux assada no dia, recheada com creme de chocolate meio amargo e coberta com glacê espelhado. Um clássico da confeitaria francesa reinterpretado com finesse.",
    preco: 18.00,
    porcao: "Por unidade",
    categoria: "especial",
    destaque: false,
    disponivel: "sim",
    alergicos: ["glúten", "leite", "ovos"],
    foto: "https://images.unsplash.com/photo-1509461399763-ae67a981b254?w=600&q=80&fit=crop"
  }
]


// ── 2. NÚMERO DO WHATSAPP DO RESTAURANTE ──────────────────────
// Em produção, substitua pelo número real com DDI+DDD.
// Exemplo: "5581999999999" = Brasil (55) + Recife (81) + número

const WHATSAPP_NUMERO = "5581999999999"


// ── 3. ESTADO DA APLICAÇÃO ────────────────────────────────────
// let: pode ser reatribuído conforme o usuário interage.

let categoriaAtiva = "todos"
let termoBusca = ""
let produtoAberto = null   // guarda o objeto do produto no modal


// ── 4. SELEÇÃO DE ELEMENTOS DO DOM ────────────────────────────
// Referências aos elementos HTML que o JS vai manipular.
// const porque a referência ao elemento não muda — só o conteúdo.

const grid           = document.getElementById("products-grid")
const emptyState     = document.getElementById("empty-state")
const searchInput    = document.getElementById("search-input")
const categorias     = document.getElementById("categories")
const resultsCount   = document.getElementById("results-count")
const mesaBadge      = document.getElementById("mesa-badge")
const mesaNumero     = document.getElementById("mesa-numero")
const modal          = document.getElementById("modal")
const modalClose     = document.getElementById("modal-close")
const modalImg       = document.getElementById("modal-img")
const modalBadge     = document.getElementById("modal-badge")
const modalCategoria = document.getElementById("modal-categoria")
const modalNome      = document.getElementById("modal-nome")
const modalDescricao = document.getElementById("modal-descricao")
const modalInfos     = document.getElementById("modal-infos")
const modalPreco     = document.getElementById("modal-preco")
const modalDisp      = document.getElementById("modal-disponibilidade")
const backdrop       = document.getElementById("modal-backdrop")
const fabGarcom      = document.getElementById("fab-garcom")


// ── 5. FUNÇÕES UTILITÁRIAS ────────────────────────────────────

// Arrow function com retorno implícito (uma linha, sem chaves nem return).
// Formata um número para Real Brasileiro: 89.9 → "R$ 89,90"
const formatarPreco = (valor) =>
  valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })


// Arrow function com retorno implícito.
// Recebe um status de disponibilidade e retorna o texto para exibição.
const textoDisponibilidade = (status) => {
  if (status === "nao")      return "Esgotado hoje"
  if (status === "limitado") return "Últimas unidades"
  return "Disponível"
}

// Retorna a classe CSS correta para o badge de disponibilidade.
const classeDisponibilidade = (status) => {
  if (status === "nao")      return "esgotado"
  if (status === "limitado") return "limitado"
  return "disponivel"
}


// ── 6. DETECTAR NÚMERO DA MESA PELA URL ──────────────────────
// Quando o garçom imprime o QR code, ele aponta para:
//   /cardapio/index.html?mesa=12
// URLSearchParams lê esses parâmetros da URL atual.

const detectarMesa = () => {
  // new URL(location.href) cria um objeto com todas as partes da URL atual.
  const params = new URLSearchParams(window.location.search)

  // .get("mesa") retorna o valor do parâmetro ?mesa=N, ou null se não existir.
  const mesa = params.get("mesa")

  if (mesa) {
    mesaNumero.textContent = mesa   // preenche o número visível
    mesaBadge.hidden = false        // torna o badge visível (estava hidden no HTML)
    fabGarcom.href = `https://wa.me/${WHATSAPP_NUMERO}?text=Ol%C3%A1%21+Estou+na+Mesa+${mesa}+e+gostaria+de+fazer+um+pedido.`
  } else {
    // Sem parâmetro de mesa: link genérico
    fabGarcom.href = `https://wa.me/${WHATSAPP_NUMERO}?text=Ol%C3%A1%21+Gostaria+de+fazer+um+pedido.`
  }
}


// ── 7. CRIAR UM CARD ──────────────────────────────────────────
// Arrow function com destructuring no parâmetro:
// em vez de receber o objeto inteiro e escrever produto.nome, produto.preco...
// já extraímos as propriedades que precisamos diretamente.

const criarCard = ({ id, nome, descricao, preco, porcao, categoria, destaque, disponivel, foto }) => {

  // document.createElement cria um novo elemento HTML na memória
  // (ainda não está na tela — só vai aparecer quando appendarmos no grid)
  const article = document.createElement("article")
  article.className = "card"
  article.dataset.id = id                     // data-id="1" no HTML gerado
  article.setAttribute("role", "listitem")    // semântica para o role="list" do grid
  article.setAttribute("tabindex", "0")       // permite receber foco via teclado

  // Operador ternário: condição ? valor_se_true : valor_se_false
  const badgeHTML = destaque
    ? '<span class="card-badge">✦ Destaque</span>'
    : ""

  // Indicador de disponibilidade — só aparece se não estiver disponível normalmente
  const dispHTML = disponivel !== "sim"
    ? `<div class="card-disponibilidade ${disponivel === "nao" ? "esgotado" : "limitado"}">
         ${textoDisponibilidade(disponivel)}
       </div>`
    : ""

  // Template literal: construção de HTML com interpolação ${}
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


// ── 8. ABRIR MODAL ────────────────────────────────────────────
// Recebe o id do produto, busca o objeto correspondente no array
// e preenche todos os campos do <dialog>.

const abrirModal = (id) => {
  // Array.find retorna o primeiro elemento que satisfaz a condição.
  // Convertemos id para Number porque dataset retorna string.
  const produto = produtos.find((p) => p.id === Number(id))
  if (!produto) return

  produtoAberto = produto   // guarda referência no estado

  // Preenche os elementos do modal com os dados do produto
  modalImg.src = produto.foto
  modalImg.alt = `Foto de ${produto.nome}`

  if (produto.destaque) {
    modalBadge.hidden = false
  } else {
    modalBadge.hidden = true
  }

  modalCategoria.textContent = produto.categoria
  modalNome.textContent = produto.nome
  modalDescricao.textContent = produto.descricaoCompleta
  modalPreco.textContent = formatarPreco(produto.preco)

  // Disponibilidade
  const classeDisp = classeDisponibilidade(produto.disponivel)
  modalDisp.textContent = textoDisponibilidade(produto.disponivel)
  modalDisp.className = `modal-disponibilidade ${classeDisp}`

  // Tags de informações (porção + alergênicos)
  // .map transforma cada string do array em um elemento HTML de tag
  const tagsHTML = [
    `<span class="modal-info-tag">🍽️ ${produto.porcao}</span>`,
    ...produto.alergicos.map(
      (a) => `<span class="modal-info-tag">⚠️ ${a}</span>`
    )
  ].join("")   // .join("") concatena tudo em uma única string

  modalInfos.innerHTML = tagsHTML

  // Abre o dialog nativo do HTML
  modal.showModal()

  // Exibe o backdrop
  backdrop.classList.add("ativo")

  // Bloqueia o scroll da página enquanto o modal estiver aberto
  document.body.style.overflow = "hidden"
}


// ── 9. FECHAR MODAL ───────────────────────────────────────────
const fecharModal = () => {
  modal.close()
  backdrop.classList.remove("ativo")
  document.body.style.overflow = ""
  produtoAberto = null
}


// ── 10. RENDERIZAR PRODUTOS ───────────────────────────────────
// Função principal de atualização do DOM.
// Aplica filter duas vezes (categoria e busca) e depois map para criar os cards.

const renderizarProdutos = () => {

  // filter: retorna novo array apenas com itens que passam na condição (predicado).
  // Se categoria for "todos", retorna o array original sem alterar.
  const filtradosPorCategoria = categoriaAtiva === "todos"
    ? produtos
    : produtos.filter((p) => p.categoria === categoriaAtiva)

  // Segundo filter: pelo termo de busca digitado
  // .toLowerCase() garante que a busca não seja case-sensitive
  const filtrados = filtradosPorCategoria.filter((p) =>
    p.nome.toLowerCase().includes(termoBusca.toLowerCase())
  )

  // Limpeza imperativa do DOM — necessária antes de reinjetar os cards
  grid.innerHTML = ""

  // Estado vazio: quando nenhum produto corresponde à busca
  if (filtrados.length === 0) {
    emptyState.classList.remove("hidden")
    resultsCount.textContent = ""
    return   // sai da função aqui — nada mais a fazer
  }

  emptyState.classList.add("hidden")

  // Template literal com ternário para singular/plural
  resultsCount.textContent = `${filtrados.length} ${filtrados.length === 1 ? "produto" : "produtos"} encontrados`

  // .map transforma cada objeto produto em um elemento HTML (<article>)
  // .forEach injeta cada elemento no DOM
  filtrados
    .map(criarCard)
    .forEach((card, i) => {
      card.style.animationDelay = `${i * 60}ms`   // entrada escalonada
      grid.appendChild(card)
    })
}


// ── 11. FETCH — demonstração de API ──────────────────────────
// async/await: sintaxe para lidar com operações assíncronas.
// Em produção, a URL seria do backend real da Delicatte.

const buscarDadosDaAPI = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1")
    const data = await response.json()
    console.log("✦ Exemplo de dado retornado por API:", data)
    console.log("Em produção: fetch('https://api.delicatte.com/cardapio')")
  } catch (erro) {
    console.error("Falha ao buscar da API:", erro)
  }
}


// ── 12. EVENTOS ───────────────────────────────────────────────

// Evento 'input': dispara a cada tecla digitada no campo de busca
searchInput.addEventListener("input", (e) => {
  termoBusca = e.target.value   // e.target é o elemento que disparou o evento
  renderizarProdutos()
})

// Delegação de eventos nos botões de categoria:
// ouvimos o container pai em vez de adicionar listener em cada botão.
categorias.addEventListener("click", (e) => {
  const btn = e.target.closest(".category-btn")
  if (!btn) return   // clique fora de um botão — ignora

  categorias.querySelectorAll(".category-btn").forEach((b) => b.classList.remove("active"))
  btn.classList.add("active")
  categoriaAtiva = btn.dataset.categoria
  renderizarProdutos()
})

// Delegação de eventos no grid: detecta clique em qualquer card
grid.addEventListener("click", (e) => {
  const card = e.target.closest(".card")
  if (!card) return
  abrirModal(card.dataset.id)
})

// Suporte a teclado no grid (Enter ou Espaço abre o modal)
grid.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    const card = e.target.closest(".card")
    if (!card) return
    e.preventDefault()
    abrirModal(card.dataset.id)
  }
})

// Fechar modal pelo botão X
modalClose.addEventListener("click", fecharModal)

// Fechar modal clicando no backdrop
backdrop.addEventListener("click", fecharModal)

// Fechar modal com tecla Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.open) fecharModal()
})


// ── 13. INICIALIZAÇÃO ────────────────────────────────────────
// Executado assim que o script é carregado pelo navegador.

detectarMesa()        // lê ?mesa=N da URL e atualiza o header
renderizarProdutos()  // renderiza os cards na tela
buscarDadosDaAPI()    // demonstra o conceito de fetch no console
