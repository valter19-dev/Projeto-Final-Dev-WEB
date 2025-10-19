// === criar-tarefa.js ===
// Este script valida o formulário e salva a tarefa no LocalStorage

document.addEventListener("DOMContentLoaded", () => {
  // Note: Mudei para 'form-tarefa' para seguir o padrão do seu código inicial,
  // mas mantenho o 'formTarefa' se for o ID que está no seu HTML.
  const form = document.getElementById("formTarefa");
  // const form = document.getElementById("form-tarefa"); // Se o ID for este.

  // Elemento para notificação (se houver no formulário de criação)
  // const notificacao = document.getElementById('notificacao-criacao'); // Exemplo

  // Função para mostrar notificações (poderia ser usada aqui, mas você usa alert)
  function mostrarNotificacao(mensagem, tipo = "sucesso") {
    // Se você tiver um elemento de notificação nesta página (criar-tarefa.html)
    // você implementaria a função 'mostrarNotificacao' aqui.
    // Por enquanto, vou manter o 'alert' para a validação.
    alert(mensagem);
  }

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

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // impede o recarregamento da página

    // Obtendo os campos
    const titulo = document.getElementById("titulo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();

    // === Validação básica ===
    if (titulo === "" || descricao === "") {
      // Em vez de 'alert', usamos a notificação, se o elemento existir
      // mostrarNotificacao("Por favor, preencha o título e a descrição da tarefa.", 'erro');
      alert("Por favor, preencha o título e a descrição da tarefa.");
      return;
    }

    // === Cria o objeto da tarefa ===
    const novaTarefa = {
      id: Date.now(), // gera um ID único
      titulo: titulo,
      descricao: descricao,
      // Status inicial é Pendente (corresponde a 'concluida: false')
      status: "Pendente",
      concluida: false, // Adicionamos 'concluida' para facilitar a lógica de alternar
    };

    // === Recupera as tarefas existentes ===
    const tarefasSalvas = JSON.parse(localStorage.getItem("tarefas")) || [];

    // === Adiciona a nova tarefa ===
    tarefasSalvas.push(novaTarefa);

    // === Salva novamente no LocalStorage ===
    localStorage.setItem("tarefas", JSON.stringify(tarefasSalvas));

    // ********** NOTIFICAÇÃO PARA O DASHBOARD **********
    localStorage.setItem(
      "notificacao_dashboard",
      "Tarefa adicionada com sucesso!"
    );
    localStorage.setItem("notificacao_tipo", "sucesso");

    // Redirecionamento
    window.location.href = "./dashboard.html";
  });
});

// === Menu Responsivo (mantido) ===
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.querySelector(".sidebar");

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});
