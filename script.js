const body = document.body;
const modoBotao = document.getElementById('modoBotao');
const selecionarIdioma = document.getElementById('selecionarIdioma');
const menuIcon = document.querySelector('.menu-icon');
const menuUl = document.querySelector('.menu ul');
let isModoDark = false;
let isMenuAberto = false; // Variável para controlar o estado do menu hamburguer
let idioma = 'pt'; // Iniciamos com idioma português por padrão

// Verifica se já há uma preferência de modo no localStorage
const modoSalvo = localStorage.getItem('modo');

// Se já houver uma preferência, aplica o modo correspondente
if (modoSalvo === 'dark') {
  body.classList.add('dark-mode');
  body.classList.remove('light-mode');
  modoBotao.innerHTML = '<i class="fas fa-moon"></i>';
  isModoDark = true;
} else {
  body.classList.add('light-mode');
  body.classList.remove('dark-mode');
  modoBotao.innerHTML = '<i class="fas fa-sun"></i>';
  isModoDark = false;
}

function trocarModo() {
  isModoDark = !isModoDark;

  if (isModoDark) {
    body.classList.add('dark-mode');
    body.classList.remove('light-mode');
    modoBotao.innerHTML = '<i class="fas fa-moon"></i>';
    // Salva a preferência de modo no localStorage
    localStorage.setItem('modo', 'dark');
  } else {
    body.classList.add('light-mode');
    body.classList.remove('dark-mode');
    modoBotao.innerHTML = '<i class="fas fa-sun"></i>';
    // Salva a preferência de modo no localStorage
    localStorage.setItem('modo', 'light');
  }
}

function toggleMenu() {
  if (window.innerWidth <= 768) { // Verificar se a largura da tela é menor ou igual a 768 pixels (tamanho do menu hamburguer)
    if (!isMenuAberto) {
      menuUl.classList.add('show');
    } else {
      menuUl.classList.remove('show');
    }
    isMenuAberto = !isMenuAberto; // Alterar o estado do menu
  }
}

function fecharMenu() {
  if (isMenuAberto) {
    menuUl.classList.remove('show');
    isMenuAberto = false; // Alterar o estado do menu para fechado
  }
}

function trocarIdioma() {
  idioma = selecionarIdioma.value;
  atualizarTextos();
  atualizarFooter();
}

// Função para atualizar os textos no body de acordo com o idioma selecionado
function atualizarTextos() {
  const textosPt = document.querySelectorAll('.pt');
  const textosEn = document.querySelectorAll('.en');

  // Mostrar textos em português e esconder textos em inglês se o idioma selecionado for 'pt'
  if (idioma === 'pt') {
    textosPt.forEach((element) => {
      element.style.display = 'block';
    });
    textosEn.forEach((element) => {
      element.style.display = 'none';
    });
  } else { // Mostrar textos em inglês e esconder textos em português se o idioma selecionado for 'en'
    textosPt.forEach((element) => {
      element.style.display = 'none';
    });
    textosEn.forEach((element) => {
      element.style.display = 'block';
    });
  }

  // Fechar o menu hamburguer ao selecionar um idioma
  fecharMenu();
}

function atualizarFooter() {
  const footerPt = document.getElementById('footer-pt');
  const footerEn = document.getElementById('footer-en');

  if (idioma === 'pt') {
    footerPt.style.display = 'block';
    footerEn.style.display = 'none';
  } else {
    footerPt.style.display = 'none';
    footerEn.style.display = 'block';
  }
}

// Evento onclick para acionar a função toggleMenu ao clicar no ícone de menu
menuIcon.onclick = toggleMenu;

// Evento onchange para acionar a função trocarIdioma ao alterar a seleção na caixa de idiomas
selecionarIdioma.onchange = function() {
  trocarIdioma();
  atualizarFooter();
};

// Chamar a função atualizarTextos e atualizarFooter para exibir os textos corretos no carregamento da página
atualizarTextos();
atualizarFooter();
