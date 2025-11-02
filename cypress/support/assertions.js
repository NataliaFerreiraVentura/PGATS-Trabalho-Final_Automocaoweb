// Verifica se o usuário está logado com sucesso
export function verificarUsuarioLogado(nome) {
  // Boa prática: Usar texto visível
  cy.contains(`Logged in as ${nome}`).should('be.visible');
  cy.contains('a', 'Logout').should('be.visible');
}

// Verifica se está na página de login e cadastro
export function verificarFormularioDeLogin() {
  // Boa prática: Usar contexto semântico
  cy.get('.login-form').should('be.visible').within(() => {
    cy.contains('Login to your account').should('be.visible');
  });
}

export function verificarFormularioDeCadastro() {
  // Boa prática: Usar contexto semântico
  cy.get('.signup-form').should('be.visible').within(() => {
    cy.contains('New User Signup!').should('be.visible');
  });
}

export function verificarPaginaDeLoginECadastro() {
  cy.url().should('include', '/login');
  verificarFormularioDeLogin();
  verificarFormularioDeCadastro();
}

// Verifica se a pagina inicial foi carregada corretamente
export function verificarPaginaInicialCarregada() {
  // Boa prática: Usar atributo semântico
  cy.get('img[alt*="automation practice" i]').should('be.visible');
  cy.title().should('include', 'Automation Exercise');
  cy.url().should('eq', Cypress.config().baseUrl);
}
