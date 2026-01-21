import '/style.css' // Importa o CSS
import { setupNavigation } from './navigation' // Importa a lógica dos botões
import { DNAAnimation } from './animations/background.ts' // Importa o DNA (se já tiver criado o arquivo)

new DNAAnimation();

const loaderScreen = document.getElementById('loader-screen');
const appContent = document.getElementById('app');

// Inicia o fundo animado de DNA imediatamente
// (Só vai funcionar se você já tiver colado o código no background.ts)
new DNAAnimation(); 

function iniciarSistema() {
  if (!loaderScreen || !appContent) return;

  
  // Chamamos a função para ativar os botões
  setupNavigation(); 

  // Lógica do Loading
  setTimeout(() => {
    loaderScreen.classList.add('fade-out');
    appContent.classList.remove('hidden');
    
    setTimeout(() => {
      loaderScreen.remove();
    }, 1000);

  }, 3000); 
}

iniciarSistema();