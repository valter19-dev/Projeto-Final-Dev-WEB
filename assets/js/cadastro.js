// === cadastro.js ===

document.addEventListener("DOMContentLoaded", () => {
  // ----------------------------------------------------
  // 1. ELEMENTOS ESSENCIAIS (Certifique-se que o FORMULÁRIO tem o ID 'form-cadastro')
  // ----------------------------------------------------
  const formCadastro = document.getElementById("form-cadastro");

  const nomeInput = document.getElementById("nome-cadastro");
  const emailInput = document.getElementById("email-cadastro");
  const senhaInput = document.getElementById("senha-cadastro");

  const erroNome = document.getElementById("erro-nome");
  const erroEmail = document.getElementById("erro-email");
  const erroSenha = document.getElementById("erro-senha");

  // Elemento para a notificação
  const elementoNotificacao = document.getElementById("notificacao"); // ID no HTML

  // ----------------------------------------------------
  // 2. FUNÇÃO DE NOTIFICAÇÃO (Com animação slideIn/slideOut)
  // ----------------------------------------------------
  function mostrarNotificacao(mensagem, tipo = "sucesso") {
    if (!elementoNotificacao) return;

    elementoNotificacao.textContent = mensagem;

    // Entrada: Aplica 'ativo' (slideIn)
    elementoNotificacao.className = `notificacao ${tipo} ativo`;

    // Saída: Prepara a animação de saída após 3 segundos
    setTimeout(() => {
      // Remove 'ativo' e adiciona 'saindo' (slideOut) - Requer a classe .saindo no CSS
      elementoNotificacao.classList.remove("ativo");
      elementoNotificacao.classList.add("saindo");

      // Limpa o elemento completamente após o tempo da animação (500ms)
      setTimeout(() => {
        elementoNotificacao.className = "notificacao";
        elementoNotificacao.classList.remove("saindo"); // Garante que a classe 'saindo' seja removida
      }, 500);
    }, 3000);
  }

  // ----------------------------------------------------
  // 3. FUNÇÃO DE VALIDAÇÃO GERAL
  //    Centralizamos a lógica para reuso no 'input' e 'submit'
  // ----------------------------------------------------
  function validarCampos() {
    let formValido = true;

    // Validação de Nome (Seu código adaptado)
    if (nomeInput.value.trim().length < 3) {
      erroNome.textContent = "O nome deve ter pelo menos 3 caracteres.";
      nomeInput.classList.add("invalido");
      formValido = false;
    } else {
      erroNome.textContent = "";
      nomeInput.classList.remove("invalido");
    }

    // Validação de Email (Seu código adaptado)
    // Adicionamos a verificação para o '.' (ponto) para ser mais rigoroso.
    if (!emailInput.value.includes("@") || !emailInput.value.includes(".")) {
      erroEmail.textContent = "Insira um e-mail válido.";
      emailInput.classList.add("invalido");
      formValido = false;
    } else {
      erroEmail.textContent = "";
      emailInput.classList.remove("invalido");
    }

    // Validação de Senha (Seu código adaptado)
    if (senhaInput.value.length < 6) {
      erroSenha.textContent = "A senha deve ter pelo menos 6 caracteres.";
      senhaInput.classList.add("invalido");
      formValido = false;
    } else {
      erroSenha.textContent = "";
      senhaInput.classList.remove("invalido");
    }

    return formValido;
  }

  // ----------------------------------------------------
  // 4. VALIDAÇÃO EM TEMPO REAL (Seus eventos 'input' originais, agora chamando validarCampos)
  // ----------------------------------------------------
  // Usamos 'keyup' para garantir que a classe invalido seja removida mais rapidamente
  nomeInput.addEventListener("input", validarCampos);
  emailInput.addEventListener("input", validarCampos);
  senhaInput.addEventListener("input", validarCampos);

  // ----------------------------------------------------
  // 5. EVENTO PRINCIPAL: SUBMISSÃO DO FORMULÁRIO (Ação de Salvar e Notificar)
  // ----------------------------------------------------
  if (formCadastro) {
    // Verifica se o formulário existe antes de adicionar o listener
    formCadastro.addEventListener("submit", (e) => {
      e.preventDefault();

      // 1. Revalida tudo. Se falhar, notifica o usuário sobre o erro.
      if (!validarCampos()) {
        mostrarNotificacao("Por favor, corrija os campos inválidos.", "erro");
        return;
      }

      // 1. Extrai os dados
      const nomeUsuario = nomeInput.value.trim();
      const emailUsuario = emailInput.value.trim();
      const senhaUsuario = senhaInput.value; // Senhas NUNCA devem ser salvas assim em produção!

      // 2. Cria o objeto do usuário
      const novoUsuario = {
        nome: nomeUsuario,
        email: emailUsuario,
        senha: senhaUsuario, // Apenas para fins de aprendizado/teste
      };

      // 3. RECUPERA USUÁRIOS EXISTENTES OU INICIA UMA NOVA LISTA
      // O LocalStorage armazena apenas strings.
      // A chave 'usuarios' guardará uma lista de todos os cadastros.
      const usuariosSalvosString = localStorage.getItem("usuarios");
      const listaUsuarios = usuariosSalvosString
        ? JSON.parse(usuariosSalvosString)
        : [];

      // 4. VERIFICA SE O EMAIL JÁ ESTÁ CADASTRADO (Profissionalismo!)
      const emailExiste = listaUsuarios.some(
        (user) => user.email === emailUsuario
      );
      if (emailExiste) {
        mostrarNotificacao(
          "Este e-mail já está cadastrado. Tente fazer login.",
          "erro"
        );
        return; // Interrompe o processo
      }

      // 5. ADICIONA O NOVO USUÁRIO À LISTA E SALVA DE VOLTA NO LOCALSTORAGE
      listaUsuarios.push(novoUsuario);
      localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));

      // 6. NOTIFICAÇÃO DE SUCESSO!
      mostrarNotificacao(
        `Cadastro de ${nomeUsuario} realizado com sucesso!`,
        "sucesso"
      );

      // 7. Redirecionamento (Recomendado: ir para a página de login)
      setTimeout(() => {
        window.location.href = "./login.html";
      }, 3500);

      // --- LÓGICA DE CADASTRO BEM-SUCEDIDO ---
      const Usuario = nomeInput.value.trim();

      // 2. SALVAMENTO (Simulação)
      // Em um projeto real, aqui você faria a chamada à API para registrar o usuário.

      // Salva o nome para ser usado no dashboard após o login
      localStorage.setItem("nome_usuario_logado", Usuario);

      // 3. NOTIFICAÇÃO DE SUCESSO!
      mostrarNotificacao(
        `Cadastro de ${Usuario} realizado com sucesso!`,
        "sucesso"
      );

      // 4. Redirecionamento (Ação profissional: redirecionar após a notificação)
      // Você pode redirecionar para a página de Login ou diretamente para o Dashboard
      setTimeout(() => {
        window.location.href = "./login.html"; // Redireciona para o login
      }, 3500); // 3.5 segundos para o usuário ver a notificação
    });
  } else {
    console.error(
      "Elemento 'form-cadastro' não encontrado. Verifique o ID no seu HTML."
    );
  }
});
