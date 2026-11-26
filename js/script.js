const formLogin = document.getElementById('form-login');

if (formLogin) {
  formLogin.addEventListener('submit', function(event) {
    event.preventDefault();

    const loadingScreen = document.getElementById('loading-screen');
    const progressFill = document.getElementById('progress-fill');
    const bobRunner = document.getElementById('bob-runner');
    const loadingPercent = document.getElementById('loading-percent');

    // Mostra a tela de carregamento
    loadingScreen.classList.remove('hidden');

    let progresso = 0;
    const intervalo = setInterval(() => {
      progresso += 2; // Aumenta 2% a cada 50ms (total ~2.5 segundos)
      
      progressFill.style.width = progresso + '%';
      // Limita o movimento do GIF a 85% para ele não sair da tela antes da água-viva
      bobRunner.style.left = (progresso * 0.85) + '%';
      loadingPercent.textContent = progresso + '%';

      if (progresso >= 100) {
        clearInterval(intervalo);
        window.location.href = 'index.html';
      }
    }, 50);
  });
}

// --- Controle de Acessibilidade ---
const btnAcess = document.getElementById('btn-acessibilidade');
const painelAcess = document.getElementById('painel-acessibilidade');
const btnTheme = document.getElementById('toggle-theme');
const btnInc = document.getElementById('font-increase');
const btnDec = document.getElementById('font-decrease');
const btnReset = document.getElementById('font-reset');
const btnRead = document.getElementById('btn-read-aloud');

// Abre/fecha o painel de acessibilidade
if (btnAcess) {
  btnAcess.addEventListener('click', () => {
    painelAcess.classList.toggle('hidden');
  });
}

// Mantém o tema salvo entre páginas
if (localStorage.getItem('tema') === 'dark') {
  document.body.classList.add('dark-mode');
}

// Alternar Modo Claro / Escuro
if (btnTheme) {
  btnTheme.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('tema', isDark ? 'dark' : 'light');
  });
}

// Controle de Tamanho de Fonte
let tamanhoFonte = 100; // em porcentagem
if (btnInc && btnDec && btnReset) {
  btnInc.addEventListener('click', () => {
    if (tamanhoFonte < 140) {
      tamanhoFonte += 10;
      document.documentElement.style.fontSize = tamanhoFonte + '%';
    }
  });

  btnDec.addEventListener('click', () => {
    if (tamanhoFonte > 80) {
      tamanhoFonte -= 10;
      document.documentElement.style.fontSize = tamanhoFonte + '%';
    }
  });

  btnReset.addEventListener('click', () => {
    tamanhoFonte = 100;
    document.documentElement.style.fontSize = '100%';
  });
}

// Leitura em Voz Alta (Text-to-Speech nativo)
if (btnRead) {
  btnRead.addEventListener('click', () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel(); // Para a leitura se clicar de novo
      btnRead.textContent = '🔊 Ler texto da página';
      return;
    }

    const conteudo = document.querySelector('main').innerText;
    const fala = new SpeechSynthesisUtterance(conteudo);
    fala.lang = 'pt-BR';
    
    fala.onend = () => {
      btnRead.textContent = '🔊 Ler texto da página';
    };

    btnRead.textContent = '⏹️ Parar leitura';
    window.speechSynthesis.speak(fala);
  });
}

// --- Função reutilizável para mostrar a tela de carregamento e ir para o index.html ---
function iniciarCarregamento() {
  const loadingScreen = document.getElementById('loading-screen');
  const progressFill = document.getElementById('progress-fill');
  const bobRunner = document.getElementById('bob-runner');
  const loadingPercent = document.getElementById('loading-percent');

  if (!loadingScreen) {
    window.location.href = 'index.html';
    return;
  }

  loadingScreen.classList.remove('hidden');

  let progresso = 0;
  const intervalo = setInterval(() => {
    progresso += 2; // Aumenta 2% a cada 50ms (~2.5 segundos no total)

    if (progressFill) progressFill.style.width = progresso + '%';
    if (bobRunner) bobRunner.style.left = (progresso * 0.85) + '%';
    if (loadingPercent) loadingPercent.textContent = progresso + '%';

    if (progresso >= 100) {
      clearInterval(intervalo);
      window.location.href = 'index.html';
    }
  }, 50);
}

// 1. Dispara ao enviar o formulário de login
if (formLogin) {
  formLogin.addEventListener('submit', function(event) {
    event.preventDefault();
    iniciarCarregamento();
  });
}

// 2. Dispara ao clicar em "Entrar como turista (sem login)"
const linkTurista = document.querySelector('.link-voltar');
if (linkTurista) {
  linkTurista.addEventListener('click', function(event) {
    event.preventDefault(); // Impede de pular direto sem ver o carregamento
    iniciarCarregamento();
  });
}

// ==========================================
// 3. CARROSSEL DE IMAGENS (index.html)
// ==========================================
const slides = document.querySelectorAll('.carousel-slide');
const btnPrev = document.getElementById('prev-slide');
const btnNext = document.getElementById('next-slide');
let slideAtual = 0;

function mostrarSlide(indice) {
  if (slides.length === 0) return;
  slides.forEach(slide => slide.classList.remove('active'));
  slideAtual = (indice + slides.length) % slides.length;
  slides[slideAtual].classList.add('active');
}

if (btnPrev && btnNext && slides.length > 0) {
  btnPrev.addEventListener('click', () => mostrarSlide(slideAtual - 1));
  btnNext.addEventListener('click', () => mostrarSlide(slideAtual + 1));

  // Troca automática a cada 5 segundos
  setInterval(() => mostrarSlide(slideAtual + 1), 5000);
}

// ==========================================
// 4. FILTRO DE MORADORES E LOCAIS (index.html)
// ==========================================
const filterBtns = document.querySelectorAll('.filter-btn');
const guideCards = document.querySelectorAll('.guide-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const categoria = btn.getAttribute('data-filter');

    guideCards.forEach(card => {
      if (categoria === 'todos' || card.getAttribute('data-category') === categoria) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// --- Controle de Música de Fundo ---
const bgMusic = document.getElementById('bg-music');
const btnMusic = document.getElementById('btn-music');

if (bgMusic && btnMusic) {
  bgMusic.volume = 0.35; // Volume agradável (35%)

  const atualizarIcone = () => {
    btnMusic.textContent = bgMusic.paused ? '🔇' : '🎵';
  };

  // Tenta tocar automaticamente ao abrir a página
  bgMusic.play().then(() => {
    atualizarIcone();
  }).catch(() => {
    // Se o navegador bloquear o autoplay, toca no primeiro clique na página
    const iniciarNoClique = () => {
      bgMusic.play().then(atualizarIcone).catch(() => {});
      document.removeEventListener('click', iniciarNoClique);
    };
    document.addEventListener('click', iniciarNoClique);
  });

  // Botão manual para pausar ou tocar
  btnMusic.addEventListener('click', (e) => {
    e.stopPropagation();
    if (bgMusic.paused) {
      bgMusic.play();
    } else {
      bgMusic.pause();
    }
    atualizarIcone();
  });
}

