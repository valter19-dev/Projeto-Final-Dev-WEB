// === dashboard.js ===
// Carrega, exibe, conclui e exclui tarefas.
document.addEventListener("DOMContentLoaded", () => {
  const listaTarefas = document.getElementById("listaTarefas");
  const mensagemVazia = document.getElementById("mensagem-vazia-dashboard"); // Novo ID para a mensagem vazia
  const elementoNotificacao = document.getElementById("notificacao-dashboard"); // Elemento de notificação

  // =================================================================
  // FUNÇÃO PARA ATUALIZAR O NOME DO USUÁRIO NO HEADER
  // =================================================================

  function carregarNomeUsuario() {
    // Pega o elemento <span> usando o ID que definimos no HTML
    const elementoNomeUsuario = document.getElementById(
      "nome-usuario-dashboard"
    );

    if (!elementoNomeUsuario) return;

    // Recupera o nome salvo na página de login
    const nomeSalvo = localStorage.getItem("nome_usuario_logado");

    // Se houver um nome salvo, usa ele. Senão, mantém o texto padrão.
    if (nomeSalvo) {
      elementoNomeUsuario.textContent = nomeSalvo;
    } else {
      elementoNomeUsuario.textContent = "Usuário";
    }
  }

  // =================================================================
  // CHAMADA DA FUNÇÃO
  // =================================================================

  // Chama a função para exibir o nome assim que o dashboard carregar
  carregarNomeUsuario();

  // =================================================================
  // FUNÇÕES DE NOTIFICAÇÃO (Adaptadas do seu código inicial)
  // =================================================================

  function mostrarNotificacao(mensagem, tipo = "sucesso") {
    if (!elementoNotificacao) return;

    elementoNotificacao.textContent = mensagem;

    // ENTRADA: Aplica a classe 'ativo' para rodar a animação 'slideIn'
    elementoNotificacao.className = `notificacao ${tipo} ativo`;

    // Remove a notificação após 3 segundos
    setTimeout(() => {
      // SAÍDA: 1. Adiciona a classe 'saindo' para rodar a animação 'slideOut'
      elementoNotificacao.classList.remove("ativo");
      elementoNotificacao.classList.add("saindo");

      // 2. Remove o elemento completamente após o tempo da animação de saída (ex: 0.5s)
      setTimeout(() => {
        // Limpa as classes e reseta para o estado inicial 'notificacao'
        elementoNotificacao.className = "notificacao";
      }, 500); // 500ms é a duração da animação slideOut
    }, 3000); // 3 segundos para visualização
  }

  // =================================================================
  // EXIBIÇÃO DE NOTIFICAÇÃO PÓS-REDIRECIONAMENTO (mantido do seu código)
  // =================================================================
  const mensagem_ls = localStorage.getItem("notificacao_dashboard");
  const tipo_ls = localStorage.getItem("notificacao_tipo");

  if (mensagem_ls && elementoNotificacao) {
    mostrarNotificacao(mensagem_ls, tipo_ls); // Usa a função unificada

    // Limpa o localStorage imediatamente após exibir
    localStorage.removeItem("notificacao_dashboard");
    localStorage.removeItem("notificacao_tipo");
  }

  // =================================================================
  // MANIPULAÇÃO DO LOCALSTORAGE
  // =================================================================

  // ✅ Alternar status da tarefa (equivalente ao 'alternarTarefa' do código inicial)
  window.alternarTarefa = function (id) {
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

    // Encontra e atualiza a tarefa
    const tarefa = tarefas.find((t) => t.id === id);
    if (tarefa) {
      tarefa.concluida = !tarefa.concluida;
      tarefa.status = tarefa.concluida ? "✅ Concluída" : "🕓 Pendente";

      localStorage.setItem("tarefas", JSON.stringify(tarefas));
      carregarTarefas(); // Atualiza a lista na tela

      // Notificação na tela
      const mensagem = tarefa.concluida
        ? "Tarefa marcada como concluída!"
        : "Tarefa desmarcada!";
      mostrarNotificacao(mensagem, "sucesso");
    }
  };

  //funciona

  // 🗑️ Excluir tarefa (equivalente ao 'removerTarefa' do código inicial)
  window.excluirTarefa = function (id) {
    if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
      let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
      tarefas = tarefas.filter((t) => t.id !== id);
      localStorage.setItem("tarefas", JSON.stringify(tarefas));

      carregarTarefas(); // Atualiza a lista na tela
      mostrarNotificacao("Tarefa removida!", "sucesso");
    }
  };

  // =================================================================
  // RENDERIZAÇÃO DE TAREFAS (Adaptada para usar a nova lógica de status)
  // =================================================================

  function carregarTarefas() {
    const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

    listaTarefas.innerHTML = "";

    // Se não há tarefas, mostra mensagem vazia (precisa do elemento no HTML)
    if (tarefas.length === 0) {
      if (mensagemVazia) {
        // Se você tiver o elemento 'mensagem-vazia-dashboard'
        listaTarefas.innerHTML = `
                <div class="sem-tarefas-container" id="mensagem-vazia-dashboard">
                    <p class="sem-tarefas">Nenhuma tarefa cadastrada ainda.</p>
                </div>
                `;
      } else {
        // Mantém o HTML original se não tiver um ID separado para a mensagem
        listaTarefas.innerHTML = `
                <div class="sem-tarefas-container">
                    <p class="sem-tarefas">Nenhuma tarefa cadastrada ainda. Adicione uma tarefa!</p>
            
                </div>
            `;
      }
      return;
    }

    tarefas.forEach((tarefa) => {
      const card = document.createElement("div");
      // Adiciona classe 'concluida' para estilização visual (CSS)
      card.classList.add("cartao-tarefa");
      if (tarefa.concluida) {
        card.classList.add("concluida");
      }

      // Define o texto do botão com base no status de conclusão
      const textoBotaoConcluir = tarefa.concluida ? "Desfazer" : "Concluir";

      card.innerHTML = `
                <div class="cabecalho-cartao">
                    <h3>${tarefa.titulo}</h3>
                    <a href="./detalhes-tarefa.html?id=${
                      tarefa.id
                    }" class="icone-olho" title="Ver detalhes da tarefa">
                        <i class="bi bi-eye olho normal"></i>
                        <i class="bi bi-eye-fill olho cheio"></i>
                    </a>
                </div>

                <p>Descrição: ${tarefa.descricao}</p>

                <div class="acoes-tarefa">
                    <a href="./editar-tarefa.html?id=${
                      tarefa.id
                    }" class="botao-editar">Editar</a>
                    <button class="botao-concluir" onclick="alternarTarefa(${
                      tarefa.id
                    })">${textoBotaoConcluir}</button>
                    <button class="botao-excluir" onclick="excluirTarefa(${
                      tarefa.id
                    })">Excluir</button>
                </div>

                <p><strong>Status:</strong> ${
                  tarefa.status || "🕓 Pendente"
                }</p>
            `;

      listaTarefas.appendChild(card);
    });
  }

  // Chamada inicial para carregar as tarefas
  carregarTarefas();
});

// === Menu Responsivo (mantido) ===
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.querySelector(".sidebar");

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});
