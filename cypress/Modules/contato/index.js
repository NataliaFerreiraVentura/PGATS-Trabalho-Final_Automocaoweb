class Contato {

    preencherFormularioContato(userData) {
      cy.get('[data-qa="name"]').clear().type(userData.name);
      cy.get('[data-qa="email"]').clear().type(userData.email);
      cy.get('[data-qa="subject"]').clear().type(userData.subject);
      cy.get('[data-qa="message"]').clear().type(userData.message);
      
      // Upload do arquivo de exemplo
      cy.fixture('exemplo.txt').as('arquivo');
      cy.get('input[type=file]').selectFile('@arquivo');
      
      // Verificar se o arquivo foi carregado
      cy.get('input[type=file]').should('have.prop', 'files').should('have.length.greaterThan', 0);
      cy.get('input[type=file]').invoke('prop', 'files').its('0').should('have.property', 'name', 'exemplo.txt');
      
      cy.get('[data-qa="submit-button"]').click();
    }

    continuarAposEnvio() {
      cy.get('a[class="btn btn-success"]').click();
    }
}

export default new Contato();