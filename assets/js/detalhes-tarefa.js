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
