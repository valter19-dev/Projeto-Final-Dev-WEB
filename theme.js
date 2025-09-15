
// Sistema de alternância de tema global
(function() {
    // Função para aplicar tema
    function applyTheme(theme) {
        const body = document.body;
        
        if (theme === "light") {
            body.setAttribute("data-theme", "light");
        } else {
            body.removeAttribute("data-theme");
        }
    }

    // Função para inicializar tema
    function initTheme() {
        const savedTheme = localStorage.getItem("theme") || "dark";
        applyTheme(savedTheme);
    }

    // Inicializar quando o DOM estiver carregado
    document.addEventListener("DOMContentLoaded", function() {
        initTheme();
    });

    // Expor funções globalmente se necessário
    window.ThemeSystem = {
        apply: applyTheme,
        init: initTheme
    };
})();
