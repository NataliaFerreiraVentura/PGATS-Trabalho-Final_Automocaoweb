// Verifica se o usuário está logado com sucesso
export function verificarUsuarioLogado(nome) {
  cy.contains(`Logged in as ${nome}`).should('be.visible');
  cy.get('a[href="/logout"]').should('be.visible');
}

// Verifica se está na página de login e cadastro
export function verificarFormularioDeLogin() {
  cy.get('.login-form').should('be.visible').contains('Login to your account');
}

export function verificarFormularioDeCadastro() {
  cy.get('.signup-form h2').should('contain', 'New User Signup!');
}

export function verificarPaginaDeLoginECadastro() {
  cy.url().should('include', '/login');
  verificarFormularioDeLogin();
  verificarFormularioDeCadastro();
}

// Verifica se a pagina inicial foi carregada corretamente
export function verificarPaginaInicialCarregada() {
  cy.get('img[alt="Website for automation practice"]').should('be.visible');
  cy.title().should('include', 'Automation Exercise');
  cy.url().should('eq', Cypress.config().baseUrl);
}
