const body = document.body;
const modoBotao = document.getElementById('modoBotao');
const selecionarIdioma = document.getElementById('selecionarIdioma');
let isModoDark = false;
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

function trocarIdioma() {
  idioma = selecionarIdioma.value;
  const menuLinks = document.querySelectorAll('.menu nav li a');

  // Traduz as opções do menu com base no idioma selecionado
  if (idioma === 'pt') {
    document.documentElement.lang = 'pt'; // Alterando o idioma da página para português
    menuLinks[0].innerText = 'Home';
    menuLinks[1].innerText = 'Sobre';
    menuLinks[2].innerText = 'Contato';
    // Texto das opções da caixa de seleção de idioma
    selecionarIdioma.options[0].innerText = 'Português';
    selecionarIdioma.options[1].innerText = 'Inglês';
  } else {
    document.documentElement.lang = 'en'; // Alterando o idioma da página para inglês
    menuLinks[0].innerText = 'Home';
    menuLinks[1].innerText = 'About';
    menuLinks[2].innerText = 'Contact';
    // Texto das opções da caixa de seleção de idioma
    selecionarIdioma.options[0].innerText = 'Portuguese';
    selecionarIdioma.options[1].innerText = 'English';
  }
}

function toggleMenu() {
  const menuUl = document.querySelector('.menu ul');
  menuUl.classList.toggle('show');
}