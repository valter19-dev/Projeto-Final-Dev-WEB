// === editar-tarefa.js ===

document.addEventListener("DOMContentLoaded", () => {
  // Referências aos elementos do formulário
  const tituloInput = document.getElementById("titulo-tarefa-edicao");
  const descricaoInput = document.getElementById("descricao-tarefa-edicao");
  const statusSelect = document.getElementById("status-tarefa");
  const form = document.querySelector(".formulario-tarefa");
  const botaoExcluir = document.querySelector(".botao-excluir-tarefa");

  // 1️⃣ Pegar ID da tarefa pela URL
  const params = new URLSearchParams(window.location.search);
  const idTarefaString = params.get("id"); // Mantemos como string inicialmente

  if (!idTarefaString) {
    alert("Nenhuma tarefa selecionada para edição.");
    window.location.href = "./dashboard.html";
    return;
  }

  // Converte o ID da URL para número, garantindo a compatibilidade.
  const idTarefa = Number(idTarefaString);
  // Se seus IDs são strings (ex: UUIDs), remova esta linha e use idTarefaString
  // E use 't.id === idTarefaString' na busca.

  // 2️⃣ Pegar tarefas do localStorage e encontrar a tarefa
  let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

  // CORREÇÃO: Usamos o ID convertido (Number) para a comparação estrita
  const tarefa = tarefas.find((t) => t.id === idTarefa);

  if (!tarefa) {
    alert("Tarefa não encontrada. Redirecionando para o dashboard.");
    window.location.href = "./dashboard.html";
    return;
  }

  // 3️⃣ Preencher o formulário
  if (tituloInput) tituloInput.value = tarefa.titulo;
  if (descricaoInput) descricaoInput.value = tarefa.descricao || "";
  // Garantir que o select tem o valor correto. Se não tiver, o default será usado.
  if (statusSelect) statusSelect.value = tarefa.status;

  // 4️⃣ Salvar alterações (Evento de Submit)
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const novoTitulo = tituloInput.value.trim();
    const novaDescricao = descricaoInput.value.trim();
    const novoStatus = statusSelect.value;

    // Determinar se a tarefa foi concluída ou não com base no status
    const isConcluida = novoStatus === "✅ Concluída";

    // Validação simples
    if (novoTitulo.length < 5) {
      alert("O título deve ter pelo menos 5 caracteres.");
      return;
    }
    if (novaDescricao && novaDescricao.length < 3) {
      alert("A descrição deve ter pelo menos 3 caracteres.");
      return;
    }

    // Atualizar tarefa
    tarefa.titulo = novoTitulo;
    tarefa.descricao = novaDescricao;
    tarefa.status = novoStatus;
    tarefa.concluida = isConcluida; // Atualiza o flag 'concluida'

    // Encontrar o índice da tarefa no array (para ter certeza de que estamos atualizando a referência)
    const tarefaIndex = tarefas.findIndex((t) => t.id === idTarefa);
    if (tarefaIndex !== -1) {
      tarefas[tarefaIndex] = tarefa;
    }

    // Salvar no localStorage
    localStorage.setItem("tarefas", JSON.stringify(tarefas));

    // Notificação
    localStorage.setItem(
      "notificacao_dashboard",
      "Tarefa atualizada com sucesso!"
    );
    localStorage.setItem("notificacao_tipo", "sucesso");

    // Redirecionar
    window.location.href = "./dashboard.html";
  });

  // 5️⃣ Excluir tarefa (Evento de Clique)
  botaoExcluir.addEventListener("click", (e) => {
    e.preventDefault();

    const confirmar = confirm(
      "Tem certeza que deseja excluir esta tarefa? Esta ação é irreversível."
    );
    if (!confirmar) return;

    // Filtra o array, removendo a tarefa com o ID atual
    const novasTarefas = tarefas.filter((t) => t.id !== idTarefa);
    localStorage.setItem("tarefas", JSON.stringify(novasTarefas));

    localStorage.setItem(
      "notificacao_dashboard",
      "Tarefa excluída com sucesso!"
    );
    localStorage.setItem("notificacao_tipo", "erro");

    // Redirecionar
    window.location.href = "./dashboard.html";
  });
});
