# 🚀 PGATS - Trabalho Final - Automação Web

## 📋 Descrição do Projeto

Projeto de automação de testes E2E desenvolvido como trabalho final da pós-graduação em **Automação de Testes de Software**. O projeto utiliza **Cypress** para automatizar testes no site [Automation Exercise](https://automationexercise.com/), aplicando as melhores práticas de automação e padrões de desenvolvimento.

## 🎯 Objetivos

- ✅ Implementar testes automatizados E2E
- ✅ Aplicar padrões de boas práticas (AAA, Modularização)
- ✅ Gerar relatórios profissionais de execução
- ✅ Demonstrar conhecimento em automação de testes web

## 🛠️ Tecnologias Utilizadas

| Tecnologia      | Versão  | Descrição                  |
| --------------- | ------- | -------------------------- |
| **Cypress**     | ^13.7.3 | Framework de testes E2E    |
| **JavaScript**  | ES6+    | Linguagem de programação   |
| **Faker.js**    | ^10.1.0 | Geração de dados dinâmicos |
| **Mochawesome** | ^4.0.2  | Gerador de relatórios HTML |

## 🏗️ Estrutura do Projeto

```
📦 PGATS_TrabalhoFinal_AutomocaoWEB
├── 📁 cypress/
│   ├── 📁 e2e/
│   │   └── automation-exercise.cy.js    # Testes principais
│   ├── 📁 Modules/
│   │   ├── 📁 login/                    # Módulo de login/signup
│   │   ├── 📁 cadastro/                 # Módulo de cadastro
│   │   ├── 📁 menu/                     # Módulo de navegação/menu
│   │   ├── 📁 carrinho/                 # Módulo de carrinho
│   │   └── 📁 contato/                  # Módulo de contato
│   ├── 📁 fixtures/
│   │   └── userData.json                # Dados de teste
│   ├── 📁 support/
│   │   ├── commands.js                  # Comandos customizados
│   │   ├── e2e.js                       # Configurações globais
│   │   └── helpers.js                   # Funções auxiliares
│   └── 📁 reports/                      # Relatórios gerados
├── cypress.config.js                    # Configurações do Cypress
├── package.json                         # Dependências do projeto
└── README.md                           # Documentação do projeto
```

## 🎯 Casos de Teste Implementados

### **Test Case 01 - Cadastrar Usuário**

- **Objetivo**: Validar criação de conta com sucesso
- **Passos**:
  1. Acessar página inicial
  2. Navegar para cadastro
  3. Preencher dados de pré-cadastro
  4. Preencher dados pessoais completos
  5. Criar conta
  6. Validar conta criada e login automático

### **Test Case 02 - Login do Usuário com E-mail e Senha Corretos**

- **Objetivo**: Validar login com credenciais válidas
- **Passos**:
  1. Acessar página de login
  2. Inserir credenciais válidas
  3. Validar login bem-sucedido

### **Test Case 03 - Login do Usuário com E-mail e Senha Incorretos**

- **Objetivo**: Validar mensagem de erro para credenciais inválidas
- **Passos**:
  1. Acessar página de login
  2. Inserir credenciais inválidas
  3. Validar mensagem de erro

### **Test Case 04 - Fazer Logout do Usuário**

- **Objetivo**: Validar funcionalidade de logout
- **Passos**:
  1. Fazer login com usuário válido
  2. Executar logout
  3. Validar redirecionamento para página de login


## 📊 Padrões e Práticas Aplicados

### **🎯 Padrão AAA (Arrange, Act, Assert)**

```javascript
// ARRANGE - Preparar dados
const newUser = createNewUserData();

// ACT - Executar ações
login.preencherFormularioPreCadastro(newUser);
cadastro.cadastrarUsuarioCompleto(newUser);

// ASSERT - Verificar resultados
cy.url().should("eq", Cypress.config().baseUrl);
cy.contains(`Logged in as ${newUser.name}`).should("be.visible");
```

### **🏗️ Modularização**

- **Separação por responsabilidade**: Cada módulo tem uma função específica
- **Reutilização**: Módulos podem ser usados em diferentes testes
- **Manutenibilidade**: Mudanças centralizadas por funcionalidade

### **📊 Geração de Dados Dinâmicos**

```javascript
// Uso do Faker.js para dados únicos
const newUser = {
  name: faker.person.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};
```

## 🚀 Como Executar

### **Pré-requisitos**

- Node.js (versão 16+)
- npm ou yarn

### **Instalação**

```bash
# 1. Clonar o repositório
git clone https://github.com/NataliaFerreiraVentura/PGATS-Trabalho-Final_Automocaoweb.git

# 2. Entrar no diretório
cd PGATS-Trabalho-Final_Automocaoweb

# 3. Instalar dependências
npm install
```

### **Execução dos Testes**

```bash
# Abrir interface do Cypress
npm run test:open

# Executar testes em modo headless
npm run test

# Executar com relatórios
npm run test:report

# Executar em navegador específico
npm run test:chrome
npm run test:firefox
npm run test:edge
```

### **Scripts Disponíveis**

| Script                 | Descrição                              |
| ---------------------- | -------------------------------------- |
| `npm run test`         | Executa testes em modo headless        |
| `npm run test:open`    | Abre interface gráfica do Cypress      |
| `npm run test:report`  | Executa testes e gera relatórios       |
| `npm run test:chrome`  | Executa no Chrome                      |
| `npm run test:firefox` | Executa no Firefox                     |
| `npm run clean:all`    | Limpa relatórios, screenshots e vídeos |

## 📊 Relatórios

Os relatórios são gerados automaticamente na pasta `cypress/reports/` com:

- ✅ **Dashboard visual** com estatísticas
- ✅ **Screenshots** automáticos em falhas
- ✅ **Logs detalhados** de cada passo
- ✅ **Tempo de execução** por teste
- ✅ **Status colorido** (Pass/Fail)

## 🏆 Funcionalidades Implementadas

### **✅ Automação Robusta**

- Testes estáveis e confiáveis
- Tratamento de elementos dinâmicos
- Waits inteligentes

### **✅ Dados Dinâmicos**

- Geração automática com Faker.js
- Evita conflitos entre execuções
- Testes sempre com dados únicos

### **✅ Relatórios Profissionais**

- HTML com visual atrativo
- Screenshots em falhas
- Métricas detalhadas

### **✅ Configuração Flexível**

- BaseUrl configurável
- Múltiplos ambientes
- Scripts otimizados

## 📚 Documentação Adicional

- 📖 [Padrão AAA Implementado](PADRÃO-AAA-COM-ASSERÇÕES.md)
- 🏗️ [Guia de Modularização](MODULARIZAÇÃO-IMPLEMENTADA.md)
- 📊 [Estrutura com BeforeEach](ESTRUTURA-COMPLETA-BEFOREEACH.md)
- ⚖️ [AAA Rigoroso vs Adaptado](AAA-RIGOROSO-VS-ADAPTADO.md)

## 👨‍💻 Autor

**Natália Ferreira Ventura**

- 🎓 Pós-graduanda em Automação de Testes de Software
- 🚀 Especialista em Quality Assurance
- � [GitHub](https://github.com/NataliaFerreiraVentura)

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos como parte do trabalho final da pós-graduação em Automação de Testes de Software.

---

## 🏁 Status do Projeto

✅ **Concluído** - Trabalho Final da Pós-graduação

### **Checklist de Entrega:**

- [x] Implementação de testes E2E
- [x] Aplicação do padrão AAA
- [x] Modularização do código
- [x] Geração de dados dinâmicos
- [x] Relatórios automatizados
- [x] Documentação completa
- [x] Boas práticas de automação

---

**🎯 Projeto desenvolvido com foco em qualidade, boas práticas e demonstração de conhecimento técnico em automação de testes web.**
