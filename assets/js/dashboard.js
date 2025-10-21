// === dashboard.js ===
// Carrega, exibe, conclui e exclui tarefas.
document.addEventListener("DOMContentLoaded", () => {
  const listaTarefas = document.getElementById("listaTarefas");
  const mensagemVazia = document.getElementById("mensagem-vazia-dashboard");
  const elementoNotificacao = document.getElementById("notificacao-dashboard");

  // =================================================================
  // FUNÇÃO PARA ATUALIZAR O NOME DO USUÁRIO NO HEADER
  // =================================================================
  function carregarNomeUsuario() {
    const elementoNomeUsuario = document.getElementById(
      "nome-usuario-dashboard"
    );
    if (!elementoNomeUsuario) return;

    const nomeSalvo = localStorage.getItem("nome_usuario_logado");
    elementoNomeUsuario.textContent = nomeSalvo || "Usuário";
  }

  carregarNomeUsuario();

  // =================================================================
  // FUNÇÕES DE NOTIFICAÇÃO
  // =================================================================
  function mostrarNotificacao(mensagem, tipo = "sucesso") {
    if (!elementoNotificacao) return;

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

  const mensagem_ls = localStorage.getItem("notificacao_dashboard");
  const tipo_ls = localStorage.getItem("notificacao_tipo");

  if (mensagem_ls && elementoNotificacao) {
    mostrarNotificacao(mensagem_ls, tipo_ls);
    localStorage.removeItem("notificacao_dashboard");
    localStorage.removeItem("notificacao_tipo");
  }

  // =================================================================
  // FUNÇÕES DE MANIPULAÇÃO DE TAREFAS
  // =================================================================

  window.alternarTarefa = function (id) {
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    const tarefa = tarefas.find((t) => t.id === id);
    if (tarefa) {
      tarefa.concluida = !tarefa.concluida;
      tarefa.status = tarefa.concluida ? "✅ Concluída" : "🕓 Pendente";
      localStorage.setItem("tarefas", JSON.stringify(tarefas));
      carregarTarefas();

      mostrarNotificacao(
        tarefa.concluida
          ? "Tarefa marcada como concluída!"
          : "Tarefa desmarcada!",
        "sucesso"
      );
    }
  };

  // NOVA FUNÇÃO PARA REDIRECIONAR PARA A EDIÇÃO
  window.editarTarefa = function (id) {
    window.location.href = `./editar-tarefa.html?id=${id}`;
  };

  window.excluirTarefa = function (id) {
    if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
      let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
      tarefas = tarefas.filter((t) => t.id !== id);
      localStorage.setItem("tarefas", JSON.stringify(tarefas));

      carregarTarefas();
      mostrarNotificacao("Tarefa removida!", "sucesso");
    }
  };

  // =================================================================
  // RENDERIZAÇÃO DE TAREFAS
  // =================================================================
  function carregarTarefas() {
    const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    listaTarefas.innerHTML = "";

    if (tarefas.length === 0) {
      listaTarefas.innerHTML = mensagemVazia
        ? `<div class="sem-tarefas-container" id="mensagem-vazia-dashboard">
             <p class="sem-tarefas">Nenhuma tarefa cadastrada ainda.</p>
           </div>`
        : `<div class="sem-tarefas-container">
             <p class="sem-tarefas">Nenhuma tarefa cadastrada ainda. Adicione uma tarefa!</p>
           </div>`;
      return;
    }

    tarefas.forEach((tarefa) => {
      const card = document.createElement("div");
      card.classList.add("cartao-tarefa");
      if (tarefa.concluida) card.classList.add("concluida");

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
        <p>Descrição: ${tarefa.descricao || "Sem descrição"}</p>
        <div class="acoes-tarefa">
          <button class="botao-editar" data-id="${tarefa.id}">Editar</button>
          <button class="botao-concluir" data-id="${
            tarefa.id
          }">${textoBotaoConcluir}</button>
          <button class="botao-excluir" data-id="${tarefa.id}">Excluir</button>
        </div>
        <p><strong>Status:</strong> ${tarefa.status || "🕓 Pendente"}</p>
      `;

      // Anexar o card à lista
      listaTarefas.appendChild(card);

      // ✅ Evento de editar (Implementação do seu pedido)
      const botaoEditar = card.querySelector(".botao-editar");
      // O data-id está no innerHTML acima, mas vamos usar o ID da tarefa que já temos
      botaoEditar.addEventListener("click", () => {
        window.editarTarefa(tarefa.id); // Chama a nova função de edição
      });

      // ✅ Evento de concluir/desfazer
      const botaoConcluir = card.querySelector(".botao-concluir");
      botaoConcluir.addEventListener("click", () => {
        window.alternarTarefa(tarefa.id);
      });

      // ✅ Evento de excluir
      const botaoExcluir = card.querySelector(".botao-excluir");
      botaoExcluir.addEventListener("click", () => {
        window.excluirTarefa(tarefa.id);
      });
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

// === Novas variáveis no topo do seu dashboard.js ===

const linkMensagens = document.getElementById("link-mensagens");
const modalMensagens = document.getElementById("modal-mensagens");
const botaoFecharModal = document.getElementById("botao-fechar-modal");
const listaMensagensContainer = document.getElementById("lista-mensagens");
const contadorBadge = document.getElementById("badge-contador-mensagens");
const botaoLimparMensagens = document.getElementById("botao-limpar-mensagens");

// Chave para as mensagens no localStorage
const CHAVE_MENSAGENS = "dashboard_mensagens";

// =================================================================
// FUNÇÕES DE GERENCIAMENTO DE MENSAGENS NO LOCALSTORAGE
// =================================================================

function carregarMensagensLS() {
  return JSON.parse(localStorage.getItem(CHAVE_MENSAGENS)) || [];
}

function salvarMensagensLS(mensagens) {
  localStorage.setItem(CHAVE_MENSAGENS, JSON.stringify(mensagens));
  atualizarContador(mensagens.length);
}

// =================================================================
// RENDERIZAÇÃO E FUNCIONALIDADE DO MODAL
// =================================================================

function atualizarContador(quantidade) {
  if (contadorBadge) {
    contadorBadge.textContent = quantidade;
    contadorBadge.style.display = quantidade > 0 ? "inline-block" : "none";
  }
}

function renderizarMensagensNoModal() {
  const mensagens = carregarMensagensLS();
  listaMensagensContainer.innerHTML = ""; // Limpa o conteúdo

  if (mensagens.length === 0) {
    listaMensagensContainer.innerHTML = `
            <div class="mensagem-vazia-modal">
                <p>Nenhuma mensagem nova no momento.</p>
            </div>
        `;
    return;
  }

  mensagens.forEach((msg) => {
    const dataFormatada = new Date(msg.data).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const mensagemHTML = `
            <div class="mensagem ${msg.tipo}" data-id="${msg.id}">
                <p class="mensagem-texto">${msg.texto} <small>(${dataFormatada})</small></p>
                <button class="fechar-mensagem" data-id="${msg.id}">&times;</button>
            </div>
        `;
    listaMensagensContainer.insertAdjacentHTML("beforeend", mensagemHTML);
  });

  // Adiciona o listener para fechar mensagens individuais
  document.querySelectorAll(".fechar-mensagem").forEach((button) => {
    button.addEventListener("click", (e) => {
      const idParaRemover = Number(e.target.dataset.id);
      removerMensagem(idParaRemover);
      renderizarMensagensNoModal(); // Re-renderiza após a remoção
    });
  });
}

// =================================================================
// FUNÇÕES PÚBLICAS DE MENSAGEM
// =================================================================

/**
 * Adiciona uma nova mensagem ao sistema e salva no localStorage.
 * @param {string} texto - O conteúdo da mensagem.
 * @param {string} [tipo='sucesso'] - O tipo ('sucesso', 'erro', 'alerta').
 */
window.adicionarMensagem = function (texto, tipo = "sucesso") {
  const mensagens = carregarMensagensLS();

  const novaMensagem = {
    id: Date.now(), // ID único baseado no timestamp
    texto: texto,
    tipo: tipo,
    data: new Date().getTime(),
  };

  mensagens.push(novaMensagem);
  salvarMensagensLS(mensagens);

  // Opcional: Mostrar uma notificação toast rápida APÓS salvar a mensagem
  mostrarNotificacao("Nova mensagem recebida!", "alerta");
};

function removerMensagem(id) {
  let mensagens = carregarMensagensLS();
  mensagens = mensagens.filter((msg) => msg.id !== id);
  salvarMensagensLS(mensagens);
}

// =================================================================
// EVENT LISTENERS DO MODAL
// =================================================================

// 1. Abrir Modal
if (linkMensagens) {
  linkMensagens.addEventListener("click", (e) => {
    e.preventDefault();
    renderizarMensagensNoModal(); // Carrega o conteúdo antes de abrir
    modalMensagens.style.display = "block";
  });
}

// 2. Fechar Modal (Botão X)
if (botaoFecharModal) {
  botaoFecharModal.addEventListener("click", () => {
    modalMensagens.style.display = "none";
  });
}

// 3. Fechar Modal (Clicar fora)
window.addEventListener("click", (e) => {
  if (e.target === modalMensagens) {
    modalMensagens.style.display = "none";
  }
});

// 4. Limpar Todas as Mensagens
if (botaoLimparMensagens) {
  botaoLimparMensagens.addEventListener("click", () => {
    if (confirm("Tem certeza que deseja limpar todas as mensagens?")) {
      salvarMensagensLS([]); // Zera o array
      renderizarMensagensNoModal();
    }
  });
}

// =================================================================
// INICIALIZAÇÃO
// =================================================================

// Carrega o contador inicial ao carregar o dashboard
const mensagensIniciais = carregarMensagensLS();
atualizarContador(mensagensIniciais.length);

// Altera o bloco de notificação de dashboard (se houver) para usar o novo sistema:
const mensagem_ls = localStorage.getItem("notificacao_dashboard");
const tipo_ls = localStorage.getItem("notificacao_tipo");

if (mensagem_ls) {
  // Adiciona a notificação do localStorage como uma nova mensagem do sistema
  window.adicionarMensagem(mensagem_ls, tipo_ls);
  localStorage.removeItem("notificacao_dashboard");
  localStorage.removeItem("notificacao_tipo");
}
