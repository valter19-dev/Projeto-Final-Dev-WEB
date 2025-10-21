// === login.js (VERSÃO CORRIGIDA E SIMPLIFICADA) ===

document.addEventListener("DOMContentLoaded", () => {
  // ----------------------------------------------------
  // 1. ELEMENTOS DO DOM
  // ----------------------------------------------------
  const formLogin = document.getElementById("form-login");
  const emailInput = document.getElementById("email-login");
  const senhaInput = document.getElementById("senha-login");
  const erroEmail = document.getElementById("erro-email");
  const erroSenha = document.getElementById("erro-senha");

  const elementoNotificacao = document.getElementById("notificacao");

  // ----------------------------------------------------
  // 2. FUNÇÃO DE NOTIFICAÇÃO
  // ----------------------------------------------------
  function mostrarNotificacao(mensagem, tipo = "sucesso") {
    if (!elementoNotificacao) return;

    elementoNotificacao.textContent = mensagem;
    elementoNotificacao.className = `notificacao ${tipo} ativo`;

    setTimeout(() => {
      elementoNotificacao.classList.remove("ativo");
      elementoNotificacao.classList.add("saindo");

      setTimeout(() => {
        elementoNotificacao.className = "notificacao";
        elementoNotificacao.classList.remove("saindo");
      }, 500);
    }, 3000);
  }

  // ----------------------------------------------------
  // 3. FUNÇÃO DE VALIDAÇÃO
  // ----------------------------------------------------
  function validarCampos() {
    let formValido = true;

    const emailValor = emailInput.value.trim();
    const senhaValor = senhaInput.value.trim();

    // --- Validação de EMAIL ---
    if (emailValor === "") {
      erroEmail.textContent = "O campo e-mail não pode ficar vazio.";
      emailInput.classList.add("invalido");
      formValido = false;
    } else {
      erroEmail.textContent = "";
      emailInput.classList.remove("invalido");
    }

    // --- Validação de SENHA ---
    if (senhaValor === "") {
      erroSenha.textContent = "O campo senha não pode ficar vazio.";
      senhaInput.classList.add("invalido");
      formValido = false;
    } else {
      erroSenha.textContent = "";
      senhaInput.classList.remove("invalido");
    }

    return formValido;
  }

  // ----------------------------------------------------
  // 4. VALIDAÇÃO EM TEMPO REAL
  // ----------------------------------------------------
  emailInput.addEventListener("input", validarCampos);
  senhaInput.addEventListener("input", validarCampos);

  // ----------------------------------------------------
  // 5. EVENTO PRINCIPAL: LOGIN
  // ----------------------------------------------------
  if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
      e.preventDefault();

      // Verifica campos vazios
      if (!validarCampos()) {
        mostrarNotificacao("Preencha todos os campos obrigatórios.", "erro");
        return;
      }

      const emailDigitado = emailInput.value.trim();
      const senhaDigitada = senhaInput.value;

      // Recupera usuários salvos
      const usuariosSalvosString = localStorage.getItem("usuarios");
      const listaUsuarios = usuariosSalvosString
        ? JSON.parse(usuariosSalvosString)
        : [];

      // Verifica credenciais
      const usuarioEncontrado = listaUsuarios.find(
        (user) => user.email === emailDigitado && user.senha === senhaDigitada
      );

      if (usuarioEncontrado) {
        // LOGIN BEM-SUCEDIDO
        const nomeParaDashboard = usuarioEncontrado.nome || "Usuário";

        localStorage.setItem("nome_usuario_logado", nomeParaDashboard);
        localStorage.setItem(
          "notificacao_dashboard",
          `Bem-vindo(a) de volta, ${nomeParaDashboard}!`
        );
        localStorage.setItem("notificacao_tipo", "sucesso");

        mostrarNotificacao("Login realizado com sucesso!", "sucesso");

        // Redireciona após 2 segundos
        setTimeout(() => {
          window.location.href = "./dashboard.html";
        }, 2000);
      } else {
        // CREDENCIAIS INCORRETAS
        mostrarNotificacao("E-mail ou senha incorretos.", "erro");
      }
    });
  } else {
    console.error("Elemento 'form-login' não encontrado.");
  }
});
