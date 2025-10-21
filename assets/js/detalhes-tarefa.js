// === Menu Responsivo ===
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.querySelector(".sidebar");

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

function carregarNomeUsuario() {
  // Pega o elemento <span> usando o ID que definimos no HTML
  const elementoNomeUsuario = document.getElementById("nome-usuario-dashboard");

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

// === detalhes-tarefa.js ===

document.addEventListener("DOMContentLoaded", () => {
  // 1. Obter o ID da tarefa da URL
  const params = new URLSearchParams(window.location.search);
  const idTarefaString = params.get("id");

  if (!idTarefaString) {
    alert("Nenhuma tarefa selecionada para visualização.");
    window.location.href = "./dashboard.html";
    return;
  }

  // Converter o ID para número (assumindo que seus IDs são numéricos)
  const idTarefa = Number(idTarefaString);

  // 2. Obter a lista de tarefas
  const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  const tarefa = tarefas.find((t) => t.id === idTarefa);

  // 3. Verificar se a tarefa existe
  if (!tarefa) {
    alert("Tarefa não encontrada. Redirecionando.");
    window.location.href = "./dashboard.html";
    return;
  }

  // ==========================================================
  // 4. Referências aos Elementos HTML
  // (Você precisará adicionar IDs aos seus elementos no HTML!)
  // ==========================================================
  const tituloElemento = document.getElementById("detalhe-titulo");
  const statusElemento = document.getElementById("detalhe-status");
  const criadoEmElemento = document.getElementById("detalhe-criado-em");
  const descricaoElemento = document.getElementById("detalhe-descricao");
  const formAcoes = document.getElementById("form-acoes-detalhes");
  const botaoExcluir = document.getElementById("botao-excluir-detalhes");

  // ==========================================================
  // 5. Preencher os Detalhes da Tarefa no HTML
  // ==========================================================

  // Título
  if (tituloElemento) {
    tituloElemento.textContent = tarefa.titulo;
  }

  // Status
  if (statusElemento) {
    statusElemento.textContent = tarefa.status;

    // Adiciona classe de status para estilo (se você tiver CSS para isso)
    statusElemento.className = ""; // Limpa classes existentes
    if (tarefa.concluida) {
      statusElemento.classList.add("status-concluida-detalhes");
    } else {
      statusElemento.classList.add("status-pendente-detalhes");
    }
  }

  // Criado em (Se você guarda a data de criação, use-a. Se for o ID, converta para data)
  if (criadoEmElemento) {
    // ASSUMINDO QUE O ID É UM TIMESTAMP (ex: Date.now())
    const dataCriacao = new Date(tarefa.id);
    criadoEmElemento.textContent = dataCriacao.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    // Se a data de criação estiver em outra propriedade (ex: tarefa.dataCriacao), use essa propriedade.
  }

  // Descrição
  if (descricaoElemento) {
    descricaoElemento.innerHTML = `<p>${
      tarefa.descricao || "Sem descrição detalhada."
    }</p>`;
  }

  // ==========================================================
  // 6. Configurar Ações (Editar e Excluir)
  // ==========================================================

  // Botão Editar: Redireciona para a página de edição com o ID
  if (formAcoes) {
    // Garante que o formulário de ações leve para a edição com o ID correto
    formAcoes.action = `./editar-tarefa.html?id=${idTarefa}`;
  }

  // Botão Excluir: Usa a mesma lógica de exclusão do dashboard
  if (botaoExcluir) {
    botaoExcluir.addEventListener("click", () => {
      if (
        confirm(`Tem certeza que deseja excluir a tarefa "${tarefa.titulo}"?`)
      ) {
        let tarefasAtualizadas = tarefas.filter((t) => t.id !== idTarefa);
        localStorage.setItem("tarefas", JSON.stringify(tarefasAtualizadas));

        // Notificação e redirecionamento
        localStorage.setItem(
          "notificacao_dashboard",
          "Tarefa excluída com a partir da página de detalhes!"
        );
        localStorage.setItem("notificacao_tipo", "erro");
        window.location.href = "./dashboard.html";
      }
    });
  }
});
