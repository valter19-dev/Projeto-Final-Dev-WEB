// === login.js (CORRIGIDO) ===

document.addEventListener("DOMContentLoaded", () => {
  // 1. Elementos do DOM
  const formLogin = document.getElementById("form-login");
  const emailInput = document.getElementById("email-login");
  const senhaInput = document.getElementById("senha-login");
  const erroEmail = document.getElementById("erro-email");

  // ----------------------------------------------------
  // VARIÁVEIS E FUNÇÃO DE NOTIFICAÇÃO
  // ----------------------------------------------------
  const elementoNotificacao = document.getElementById("notificacao");

  function mostrarNotificacao(mensagem, tipo = "sucesso") {
    if (!elementoNotificacao) return;

    // Limpa a classe 'saindo' para que a animação de entrada funcione imediatamente
    elementoNotificacao.classList.remove("saindo");

    elementoNotificacao.textContent = mensagem;
    elementoNotificacao.className = `notificacao ${tipo} ativo`;

    setTimeout(() => {
      elementoNotificacao.classList.remove("ativo");
      elementoNotificacao.classList.add("saindo");

      setTimeout(() => {
        elementoNotificacao.className = "notificacao";
      }, 500);
    }, 3000);
  }

  // ==========================================================
  // FUNÇÃO DE VALIDAÇÃO REUTILIZÁVEL (Mantida sua lógica)
  // ==========================================================
  function validarCampos() {
    let formValido = true;
    const emailValor = emailInput.value.trim();

    // Validação de Email
    if (
      emailValor === "" ||
      !emailValor.includes("@") ||
      !emailValor.includes(".")
    ) {
      erroEmail.textContent = "Por favor, insira um e-mail válido.";
      emailInput.classList.add("invalido");
      formValido = false;
    } else {
      erroEmail.textContent = "";
      emailInput.classList.remove("invalido");
    }

    // Validação de Senha
    if (senhaInput.value.length < 6) {
      senhaInput.classList.add("invalido");
      formValido = false;
    } else {
      senhaInput.classList.remove("invalido");
    }

    return formValido;
  }

  // ==========================================================
  // EVENTOS DE VALIDAÇÃO EM TEMPO REAL
  // ==========================================================
  emailInput.addEventListener("input", validarCampos);
  senhaInput.addEventListener("input", validarCampos);

  // ==========================================================
  // EVENTO PRINCIPAL: SUBMISSÃO DO FORMULÁRIO (Login/Sessão)
  // ==========================================================
  if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
      e.preventDefault();

      // 1. Revalida todos os campos antes de prosseguir
      if (!validarCampos()) {
        // Notificação de erro de validação (campos vazios/inválidos)
        mostrarNotificacao("Por favor, corrija os campos inválidos.", "erro");
        return;
      }

      // 2. Extrai as credenciais digitadas
      const emailDigitado = emailInput.value.trim();
      const senhaDigitada = senhaInput.value;

      // 3. RECUPERA E BUSCA O USUÁRIO
      const usuariosSalvosString = localStorage.getItem("usuarios");
      const listaUsuarios = usuariosSalvosString
        ? JSON.parse(usuariosSalvosString)
        : [];

      const usuarioEncontrado = listaUsuarios.find(
        (user) => user.email === emailDigitado && user.senha === senhaDigitada
      );

      // 4. LÓGICA DE AUTENTICAÇÃO
      if (usuarioEncontrado) {
        // LOGIN BEM-SUCEDIDO!

        // --- Lógica de extração de nome (Mantida sua lógica aprimorada) ---
        let parteInicialEmail = emailDigitado.split("@")[0];
        const separadores = [".", "_", "-"];
        let primeiroNome = parteInicialEmail;

        for (const separador of separadores) {
          if (parteInicialEmail.includes(separador)) {
            primeiroNome = parteInicialEmail.split(separador)[0];
            break;
          }
        }

        primeiroNome = primeiroNome.replace(/\d+$/, "");

        // Usa o nome extraído ou o nome salvo no cadastro (melhor opção)
        const nomeParaDashboard = usuarioEncontrado.nome || primeiroNome;

        // 5. CRIA A SESSÃO e Redireciona
        localStorage.setItem("nome_usuario_logado", nomeParaDashboard);
        localStorage.setItem(
          "notificacao_dashboard",
          `Bem-vindo(a) de volta, ${nomeParaDashboard}!`
        );
        localStorage.setItem("notificacao_tipo", "sucesso");

        window.location.href = "./dashboard.html";
      } else {
        // LOGIN FALHOU!
        // Notificação de credenciais incorretas
        mostrarNotificacao(
          "Email ou senha incorretos. Verifique suas credenciais.",
          "erro"
        );
      }

      // **IMPORTANTE**: Nada de código deve vir aqui, pois ele rodará
      // após o 'if'/'else' e pode causar redirecionamento indesejado.
    });
  } else {
    console.error("Elemento 'form-login' não encontrado.");
  }
});
