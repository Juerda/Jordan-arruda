const body = document.body;
const modoBotao = document.getElementById('modoBotao');
const selecionarIdioma = document.getElementById('selecionarIdioma');
const menuIcon = document.querySelector('.menu-icon');
const menuDiv = document.querySelector('.menu'); // Selecionar a div do menu
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
      menuDiv.style.display = 'block'; // Exibir o menu quando o ícone do menu hamburguer for clicado
      menuUl.classList.add('show');
    } else {
      menuDiv.style.display = 'none'; // Ocultar o menu quando o ícone do menu hamburguer for clicado novamente
      menuUl.classList.remove('show');
    }
    isMenuAberto = !isMenuAberto; // Alterar o estado do menu
  }
}

function fecharMenu() {
  if (isMenuAberto) {
    menuDiv.style.display = 'none'; // Ocultar o menu ao chamar a função fecharMenu()
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

// Adicionar evento de redimensionamento da janela para verificar a largura da tela
window.addEventListener('resize', () => {
  const larguraTela = window.innerWidth;
  
  // Verificar se a largura da tela é maior que 768 pixels
  if (larguraTela > 768) {
    menuDiv.style.display = 'block'; // Exibir o menu caso seja maior que 768 pixels
  } else {
    menuDiv.style.display = 'none'; // Ocultar o menu caso seja menor ou igual a 768 pixels
    isMenuAberto = false; // Reiniciar o estado do menu para fechado
  }
});

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

//Formulario
class FormSubmit {
  constructor(settings) {
    this.settings = settings;
    this.form = document.querySelector(settings.form);
    this.formButton = document.querySelector(settings.button);
    if (this.form) {
      this.url = this.form.getAttribute("action");
    }
    this.sendForm = this.sendForm.bind(this);
  }

  displaySuccess() {
    this.form.innerHTML = this.settings.success;
  }

  displayError() {
    this.form.innerHTML = this.settings.error;
  }

  getFormObject() {
    const formObject = {};
    const fields = this.form.querySelectorAll("[name]");
    fields.forEach((field) => {
      formObject[field.getAttribute("name")] = field.value;
    });
    return formObject;
  }

  onSubmission(event) {
    event.preventDefault();
    event.target.disabled = true;
    event.target.innerText = "Enviando...";
  }

  async sendForm(event) {
    try {
      this.onSubmission(event);
      await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(this.getFormObject()),
      });
      this.displaySuccess();
    } catch (error) {
      this.displayError();
      throw new Error(error);
    }
  }

  init() {
    if (this.form) this.formButton.addEventListener("click", this.sendForm);
    return this;
  }
}

const formSubmit = new FormSubmit({
  form: "[data-form]",
  button: "[data-button]",
  success: "<h1 class='success'>Mensagem enviada!</h1>",
  error: "<h1 class='error'>Não foi possível enviar sua mensagem.</h1>",
});
formSubmit.init();
