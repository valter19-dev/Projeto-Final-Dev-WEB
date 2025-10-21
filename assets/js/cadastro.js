// === cadastro.js ===

document.addEventListener("DOMContentLoaded", () => {
  // ----------------------------------------------------
  // 1. ELEMENTOS ESSENCIAIS
  // ----------------------------------------------------
  const formCadastro = document.getElementById("form-cadastro");

  // ⚠️ Correção: .trim() só pode ser usado em strings, não em elementos.
  const nomeInput = document.getElementById("nome-cadastro");
  const emailInput = document.getElementById("email-cadastro");
  const senhaInput = document.getElementById("senha-cadastro");

  const erroNome = document.getElementById("erro-nome");
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
  // 3. FUNÇÃO DE VALIDAÇÃO GERAL
  // ----------------------------------------------------
  function validarCampos() {
    let formValido = true;

    const nomeValor = nomeInput.value.trim();
    const emailValor = emailInput.value.trim();
    const senhaValor = senhaInput.value;

    // --- Validação de NOME ---
    // Deve ter pelo menos 5 caracteres e conter um espaço entre nome e sobrenome.
    if (nomeValor.length < 5 || !nomeValor.includes(" ")) {
      erroNome.textContent =
        "O nome deve ter pelo menos 5 caracteres e conter nome e sobrenome.";
      nomeInput.classList.add("invalido");
      formValido = false;
    } else {
      erroNome.textContent = "";
      nomeInput.classList.remove("invalido");
    }

    // --- Validação de EMAIL ---
    // Expressão regular para validar: algo@algo.com ou algo@algo.com.br
    const regexEmail = /^[^\s@]+@[^\s@]+\.(com|com\.br)$/i;
    if (!regexEmail.test(emailValor)) {
      erroEmail.textContent =
        "Insira um e-mail válido no formato exemplo@dominio.com ou .com.br";
      emailInput.classList.add("invalido");
      formValido = false;
    } else {
      erroEmail.textContent = "";
      emailInput.classList.remove("invalido");
    }

    // --- Validação de SENHA ---
    if (senhaValor.length < 8) {
      erroSenha.textContent = "A senha deve ter pelo menos 8 caracteres.";
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
  nomeInput.addEventListener("input", validarCampos);
  emailInput.addEventListener("input", validarCampos);
  senhaInput.addEventListener("input", validarCampos);

  // ----------------------------------------------------
  // 5. EVENTO DE SUBMISSÃO DO FORMULÁRIO
  // ----------------------------------------------------
  if (formCadastro) {
    formCadastro.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!validarCampos()) {
        mostrarNotificacao("Por favor, corrija os campos inválidos.", "erro");
        return;
      }

      const nomeUsuario = nomeInput.value.trim();
      const emailUsuario = emailInput.value.trim();
      const senhaUsuario = senhaInput.value;

      const novoUsuario = {
        nome: nomeUsuario,
        email: emailUsuario,
        senha: senhaUsuario,
      };

      // Recupera usuários do LocalStorage
      const usuariosSalvos = localStorage.getItem("usuarios");
      const listaUsuarios = usuariosSalvos ? JSON.parse(usuariosSalvos) : [];

      // Verifica duplicidade de email
      const emailExiste = listaUsuarios.some(
        (user) => user.email === emailUsuario
      );

      if (emailExiste) {
        mostrarNotificacao(
          "Este e-mail já está cadastrado. Tente fazer login.",
          "erro"
        );
        return;
      }

      // Salva novo usuário
      listaUsuarios.push(novoUsuario);
      localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));

      // Salva nome logado
      localStorage.setItem("nome_usuario_logado", nomeUsuario);

      mostrarNotificacao(
        `Cadastro de ${nomeUsuario} realizado com sucesso!`,
        "sucesso"
      );

      // Redireciona para login
      setTimeout(() => {
        window.location.href = "./login.html";
      }, 3500);
    });
  } else {
    console.error(
      "Elemento 'form-cadastro' não encontrado. Verifique o ID no HTML."
    );
  }
});
