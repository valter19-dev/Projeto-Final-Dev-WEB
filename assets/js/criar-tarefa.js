// === criar-tarefa.js ===
// Valida o formulário e salva a tarefa no LocalStorage

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formTarefa");

  if (!form) {
    console.error("Formulário de tarefa não encontrado (ID incorreto).");
    return;
  }

  // Função simples de notificação local (na página de criação)
  function mostrarNotificacaoLocal(mensagem, tipo = "sucesso") {
    // Cria o elemento dinamicamente, sem depender do dashboard
    const notificacao = document.createElement("div");
    notificacao.className = `notificacao ${tipo} ativo`;
    notificacao.textContent = mensagem;
    document.body.appendChild(notificacao);

    // Remove após 2 segundos com animação simples
    setTimeout(() => {
      notificacao.classList.add("saindo");
      setTimeout(() => notificacao.remove(), 500);
    }, 2000);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const titulo = document.getElementById("titulo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();

    // 🔍 Validação: título ≥ 5 caracteres, descrição (se preenchida) ≥ 3
    if (titulo.length < 5) {
      alert("O título deve ter pelo menos 5 caracteres.");
      return;
    }

    if (descricao !== "" && descricao.length < 3) {
      alert("A descrição deve ter pelo menos 3 caracteres, se preenchida.");
      return;
    }

    // Cria o objeto da tarefa
    const novaTarefa = {
      id: Date.now(),
      titulo,
      descricao,
      status: "Pendente",
      concluida: false,
    };

    // Recupera tarefas existentes
    const tarefasSalvas = JSON.parse(localStorage.getItem("tarefas")) || [];
    tarefasSalvas.push(novaTarefa);

    // Salva
    localStorage.setItem("tarefas", JSON.stringify(tarefasSalvas));

    // 🔔 Notificação para o dashboard
    localStorage.setItem(
      "notificacao_dashboard",
      "Tarefa adicionada com sucesso!"
    );
    localStorage.setItem("notificacao_tipo", "sucesso");

    // 🔔 Mostra notificação imediata (na própria tela)
    mostrarNotificacaoLocal("Tarefa criada com sucesso!", "sucesso");

    // ⏳ Redireciona após 2 segundos
    setTimeout(() => {
      window.location.href = "./dashboard.html";
    }, 2000);
  });
});
