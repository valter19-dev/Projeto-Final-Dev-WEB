# Layout e Telas de Autenticação + Modo Escuro/Claro

## Objetivo 
Projetar e construir a `interface visual estática` para todas as telas necessárias do sistema, incluindo o fluxo de autenticação (cadastro e login).




### ✨ Funcionalidades

- **Gerenciamento de Tarefas**: Criar, editar, excluir e visualizar tarefas de forma prática.  
- **Detalhamento de Tarefas**: Cada tarefa pode conter título, descrição e informações adicionais.  
- **Dashboard Interativo**: Visualização centralizada de todas as tarefas em andamento.  
- **Organização Simples**: Interface intuitiva para manter as tarefas organizadas.  
- **Autonomia do Usuário**: Possibilidade de editar ou remover tarefas conforme a necessidade.  
- **Design Responsivo**: Sistema adaptado para desktops, tablets e smartphones.  
- **Tema Claro/Escuro**: Alternância de tema para melhor conforto visual.  
- **Persistência de Preferências**: Tema escolhido salvo no navegador entre sessões.  
- **Transições Suaves**: Animações aplicadas para uma experiência mais agradável.  

## 🌙 Sistema de Temas Implementado

Este projeto conta com um sistema completo de alternância entre **tema escuro e claro**, aplicado em todas as páginas do sistema com apenas um clique no botão. 

### 🎨 Temas Disponíveis

#### Tema Escuro (Padrão)
- Fundo principal: `#0f0f1a`
- Sidebar: `#161624`
- Cartões: `#1e1e2f`
- Texto principal: `#f5f5f5`
- Texto secundário: `#9ca3af`

#### Tema Claro
- Fundo principal: `#f8fafc`
- Sidebar: `#ffffff`
- Cartões: `#ffffff`
- Texto principal: `#1f2937`
- Texto secundário: `#6b7280`

### 🔧 Arquivos Modificados

1. **style.css**: Organizado com sistema de variáveis CSS para suporte a temas e estilos globais para todos os elementos das páginas
2. **dashboard.html**: Adicionado botão de alternância e script JavaScript. Além de Cards, Menu de navegação, Botoes com âncoras.
3. **theme.js**: Script global para gerenciamento de temas apenas.
4. **Todas as páginas HTML**: Adicionado toda a estrutura em HTML5 semântica. Incluído o script de tema e links do BOOTSTRAP E CLOUDFLARE para implementação de `icons`.

### 🚀 Como Usar

1. Abra o projeto no navegador acessando o arquivo `index.html`.
2. Faça Login o Cadastre-se (Não obrigatório no momento) para acessar o sistema.
3. Navegue pelas págins utilizando o menu lateral. 4- No menu lateral também é possivel alterar o tema para claro ou escuro clicando no botão correspondente.  
5. No Dashboard, visualize os cards ilustrativos e informações principais.

### 🔄 Funcionamento Técnico

- **HTML e CSS puro**: Estrutura do site feita apenas com HTML5 semântico e estilização com CSS3.
- **CSS Variables**: Uso de variáveis para facilitar troca de cores entre modo claro e escuro, também facilitando a alternãncia de cores do projeto.
- **LocalStorage**: Armazena a preferência do usuário localmente salvando a preferência de tema para futuras visitas.
- **JavaScript Vanilla**: Implementação leve sem dependências externas. 

### 📱 Responsividade

O layout foi desenvolvido com design responsivo usando apenas CSS, funcionando perfeitamente em:
- Desktop (telas grandes)
- Tablet
- Mobile(telas menores)

### 🎯 Benefícios

- **Experiência do Usuário**: Interface simples, intuitiva e com opção de personalização de tema.  
- **Acessibilidade**:  
  - Suporte à navegação por teclado (Tab/Shift+Tab).  
  - Skip link para pular direto para o conteúdo principal.  
  - Foco visível em todos os elementos interativos.  
  - Alternância de contraste (modo claro/escuro).  
- **Performance**: Código leve, rápido e sem dependências externas.  
- **Manutenibilidade**: Estrutura organizada e fácil de atualizar ou expandir.

## Arquitetura de Informação e Páginas 

**Estrutura de diretórios:** 

/ 

|-- page/

|   |-- cadastro.html 

|   |-- criar-tarefa.html 

|   |-- dashboard.html 

|   |-- detalhes-tarefa.html 

|   |-- editar-tarefa.html 

|-- index.html (login)

|-- README.md 

|-- style.css 

|-- theme.js 

 **Mapa do site**  

 Login (index.html) 

│ 

├── Cadastro (cadastro.html) 

│ 

└── Dashboard (dashboard.html) 

    │ 
    ├── Criar Tarefa (criar-tarefa.html) 

    ├── Editar Tarefa (editar-tarefa.html) 

    └── Detalhes da Tarefa (detalhes-tarefa.html) 
---

**Desenvolvido com foco na experiência do usuário e boas práticas de desenvolvimento web, alinhado às recomendações da WCAG e W3C.**

