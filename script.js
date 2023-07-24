const body = document.body;
const modoBotao = document.getElementById('modoBotao');
const selecionarIdioma = document.getElementById('selecionarIdioma');
const menuIcon = document.querySelector('.menu-icon');
const menuUl = document.querySelector('.menu ul');
let isModoDark = false;
let isMenuAberto = false; // Variável para controlar o estado do menu hamburguer
let idioma = 'pt'; // Iniciamos com idioma português por padrão

function trocarModo() {
  isModoDark = !isModoDark;

  if (isModoDark) {
    body.classList.add('dark-mode');
    body.classList.remove('light-mode');
    modoBotao.innerHTML = '<i class="fas fa-moon"></i>';
  } else {
    body.classList.add('light-mode');
    body.classList.remove('dark-mode');
    modoBotao.innerHTML = '<i class="fas fa-sun"></i>';
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

  // Traduzir textos no header (menu)
  if (idioma === 'pt') {
    document.documentElement.lang = 'pt'; // Alterando o idioma da página para português
    document.getElementById('referencias').innerText = 'Referências';
    document.getElementById('guias').innerText = 'Guias';
    document.getElementById('contato').innerText = 'Contato';
  } else {
    document.documentElement.lang = 'en'; // Alterando o idioma da página para inglês
    document.getElementById('referencias').innerText = 'References';
    document.getElementById('guias').innerText = 'Guides';
    document.getElementById('contato').innerText = 'Contact';
  }

  // Atualizar todos os textos do body com base no idioma selecionado
  atualizarTextos();
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

// Evento onclick para acionar a função toggleMenu ao clicar no ícone de menu
menuIcon.onclick = toggleMenu;

// Evento onchange para acionar a função trocarIdioma ao alterar a seleção na caixa de idiomas
selecionarIdioma.onchange = trocarIdioma;

// Chamar a função atualizarTextos para exibir os textos corretos no carregamento da página
atualizarTextos();
