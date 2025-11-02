# 🎓 Projeto Final — Automação de Testes na Interface Web com Cypress

## 📘 Visão Geral

Este repositório apresenta o projeto final da disciplina "Automação de Testes na Camada de Interface - Web", parte do curso de pós-graduação em Automação de Testes de Software. A proposta consiste na construção de uma suíte robusta de testes automatizados E2E utilizando Cypress, aplicada ao site [Automation Exercise](https://automationexercise.com/).

## 🎯 Objetivos Acadêmicos

### **Objetivo Geral**

Desenvolver uma solução prática e escalável de automação de testes web, evidenciando domínio técnico dos conceitos abordados na disciplina.

### **Objetivos Específicos**

- ✅ Implementar testes E2E com boas práticas recomendadas
- ✅ Aplicar o padrão AAA (Arrange, Act, Assert)
- ✅ Modularizar o código para reutilização e manutenção
- ✅ Utilizar dados dinâmicos para testes independentes
- ✅ Gerar relatórios automatizados com métricas de qualidade
- ✅ Demonstrar proficiência em automação web moderna

## 🛠️ Tecnologias Utilizadas

| Ferramenta      | Versão  | Finalidade                             |
| --------------- | ------- | -------------------------------------- |
| **Cypress**     | ^13.7.3 | Framework de testes E2E                |
| **JavaScript**  | ES6+    | Linguagem de desenvolvimento           |
| **Faker.js**    | ^10.1.0 | Geração de dados dinâmicos             |
| **Mochawesome** | ^4.0.2  | Relatórios HTML com evidências visuais |

## 🏗️ Estrutura do Projeto

```bash
📦 PGATS_TrabalhoFinal_AutomocaoWEB
├── cypress/
│   ├── e2e/                     # Casos de teste principais
│   ├── Modules/                 # Módulos funcionais (login, cadastro, etc.)
│   ├── fixtures/                # Dados estáticos de teste
│   ├── support/                 # Comandos e helpers reutilizáveis
│   └── reports/                 # Relatórios gerados
├── cypress.config.js           # Configuração do Cypress
├── package.json                # Dependências do projeto
└── README.md                   # Documentação técnica
```

## 🧪 Casos de Teste Implementados

A suíte contempla **10 cenários E2E** que simulam funcionalidades essenciais de um e-commerce:

### 🔐 **Autenticação**

- **TC01:** Cadastro de novo usuário
- **TC02:** Login com credenciais válidas
- **TC03:** Login com credenciais inválidas
- **TC04:** Logout
- **TC05:** Cadastro com email já existente

### 🛒 **Funcionalidades de E-commerce**

- **TC06:** Envio de formulário de contato
- **TC08:** Visualização de detalhes do produto
- **TC09:** Pesquisa de produtos
- **TC10:** Assinatura de newsletter
- **TC15:** Fluxo completo de compra (cadastro → produto → carrinho → checkout → pagamento)

## 📐 Boas Práticas Aplicadas

### **🎯 1. Padrão AAA (Arrange, Act, Assert)**

_Conceito fundamental aplicado em 100% dos casos de teste_

```javascript
it("Test Case 01 - Cadastrar usuário", () => {
  // ARRANGE - Preparação dos dados de teste
  const newUser = createNewUserData();

  // ACT - Execução das ações do usuário
  login.preencherFormularioPreCadastro(newUser);
  cadastro.preencherFormularioCadastro(newUser);

  // ASSERT - Validação dos resultados esperados
  cy.get('[data-qa="account-created"]')
    .should("be.visible")
    .and("contain.text", "Account Created!");
  verificarUsuarioLogado(newUser.name);
});
```

### **🏗️ 2. Modularização de Código**

_Arquitetura orientada à manutenibilidade e reutilização_

| Módulo       | Responsabilidade     | Benefício                        |
| ------------ | -------------------- | -------------------------------- |
| **Login**    | Autenticação         | Centraliza lógica de login       |
| **Cadastro** | Registro de usuários | Reutilização em múltiplos fluxos |
| **Menu**     | Navegação            | Consistência na navegação        |
| **Produtos** | Catálogo e busca     | Isolamento de funcionalidades    |
| **Carrinho** | E-commerce           | Fluxo de compra organizado       |

### **🎲 3. Dados Dinâmicos e Fixtures**

_Eliminação de dependências entre testes_

```javascript
// Geração dinâmica com Faker.js
function createNewUserData() {
  return {
    name: fakerPT_BR.person.fullName(),
    email: `qatester.${Date.now()}@teste.com`,
    password: "Teste@123",
    birthDay: faker.date.birthdate().getDate().toString(),
  };
}

// Dados estáticos via fixtures
cy.fixture("userData.json").then((userData) => {
  login.preencherFormularioDeLogin(
    userData.validUser.email,
    userData.validUser.password
  );
});
```

### **🎯 4. Seletores Robustos e Boas Práticas**

_Hierarquia de confiabilidade aplicada_

```javascript
// 🥇 Prioridade 1: data-qa attributes (mais confiável)
cy.get('[data-qa="login-button"]').click();

// 🥈 Prioridade 2: Texto visível (semântico)
cy.contains("View Product").click();

// 🥉 Prioridade 3: IDs únicos (quando necessário)
cy.get("#id_gender2").check();
```

### **🔄 5. Hooks e Reutilização**

_Setup e teardown automatizados_

```javascript
// Setup global para todos os testes
beforeEach(() => {
  cy.visit("/");
  verificarPaginaInicialCarregada();
});

// Funções auxiliares reutilizáveis
export function verificarUsuarioLogado(nome) {
  cy.contains(`Logged in as ${nome}`).should("be.visible");
  cy.contains("a", "Logout").should("be.visible");
}
```

## ⚙️ Execução dos Testes

### **Pré-requisitos**

- **Node.js** v18+
- **NPM** v8+
- **Git**

### **Setup**

```bash
git clone https://github.com/NataliaFerreiraVentura/PGATS-Trabalho-Final_Automocaoweb.git
cd PGATS-Trabalho-Final_Automocaoweb
npm install
npx cypress verify
```

### **Execução**

```bash
# Modo headless (recomendado para avaliação)
npm run cy:run

# Modo interativo (debug e análise visual)
npm run cy:open

# Execução por módulo
npx cypress run --spec "cypress/e2e/login.cy.js"
```

## 📊 Relatórios e Evidências

Relatórios HTML gerados com **Mochawesome**, incluindo:

- Taxa de sucesso dos testes
- Tempo de execução
- Screenshots automáticos
- Vídeos dos fluxos
- Logs detalhados

**Localização:**

```
📁 cypress/reports/html/
📁 cypress/screenshots/
📁 cypress/videos/
```

## 🚀 Integração Contínua com GitHub Actions

**Arquivo:** `.github/workflows/cypress_E2E_Tests.yml`

**Funcionalidades:**

- Execução automática dos testes em push/pull request
- Geração de relatórios e evidências
- Ambiente padronizado com Node.js 20
- Cache inteligente e timeout otimizado

## 🏆 Competências Demonstradas

- **Automação web** com Cypress
- **Programação JavaScript** moderna
- **Estratégias de teste** e validação
- **DevOps básico** com CI/CD
- **Documentação técnica** clara e objetiva

## 👩‍🎓 Informações Acadêmicas

**Autora:** Natália Ferreira Ventura  
**Disciplina:** Automação de Testes na Camada de Interface - Web  
**Curso:** Pós-graduação em Automação de Testes de Software  
**GitHub:** [NataliaFerreiraVentura](https://github.com/NataliaFerreiraVentura)
