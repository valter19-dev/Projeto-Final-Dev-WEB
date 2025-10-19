// Arquivo: ../assets/js/theme.js

document.addEventListener("DOMContentLoaded", () => {
  // 1. Constantes (Mantidas)
  const body = document.body;
  const CHAVE_TEMA = "theme";
  const TEMA_CLARO = "light";
  const TEMA_ESCURO = "dark";
  const ICONE_CLARO = "☀️";
  const ICONE_ESCURO = "🌙";

  /**
   * Aplica o tema visual no <body>.
   * Esta função não depende do botão.
   * @param {string} theme - 'light' ou 'dark'
   */
  function aplicarTemaVisual(theme) {
    if (theme === TEMA_CLARO) {
      body.setAttribute("data-theme", TEMA_CLARO);
    } else {
      body.removeAttribute("data-theme");
    }
  }

  /**
   * Inicializa o tema ao carregar a página.
   * Esta função é a única que precisa rodar em todas as páginas (incluindo login).
   */
  function initTheme() {
    // Verifica tema salvo (padrão 'dark')
    const savedTheme = localStorage.getItem(CHAVE_TEMA) || TEMA_ESCURO;
    aplicarTemaVisual(savedTheme);
    // Retorna o tema aplicado para uso posterior (opcional)
    return savedTheme;
  }

  // --- LÓGICA DE INTERAÇÃO DO BOTÃO ---

  // 2. Tenta selecionar o botão
  const themeToggle = document.getElementById("themeToggle");

  // 3. Executa a inicialização do tema
  const temaAtual = initTheme();

  // 4. Se o botão NÃO for encontrado (como na página de login), a função encerra aqui.
  if (!themeToggle) {
    return;
  }

  // O código ABAIXO só é executado se o botão 'themeToggle' existir na página.

  const icon = themeToggle.querySelector(".icon");

  // Atualiza o ícone e aria-label APENAS se o botão existir
  function updateButtonState(theme) {
    if (theme === TEMA_CLARO) {
      icon.textContent = ICONE_ESCURO; // Lua, indicando que o clique muda para Escuro
      themeToggle.setAttribute("aria-label", "Alternar para Modo Escuro");
    } else {
      icon.textContent = ICONE_CLARO; // Sol, indicando que o clique muda para Claro
      themeToggle.setAttribute("aria-label", "Alternar para Modo Claro");
    }
  }

  /**
   * Alterna o tema de forma responsiva (e salva no localStorage).
   */
  function toggleTheme() {
    const isLight = body.hasAttribute("data-theme");
    const novoTema = isLight ? TEMA_ESCURO : TEMA_CLARO;

    // Aplica o visual
    aplicarTemaVisual(novoTema);

    // Atualiza o localStorage
    localStorage.setItem(CHAVE_TEMA, novoTema);

    // Atualiza o estado do botão
    updateButtonState(novoTema);
  }

  // 5. Inicializa o estado do botão com o tema que foi aplicado
  updateButtonState(temaAtual);

  // 6. Adiciona o evento de clique
  themeToggle.addEventListener("click", toggleTheme);
});
