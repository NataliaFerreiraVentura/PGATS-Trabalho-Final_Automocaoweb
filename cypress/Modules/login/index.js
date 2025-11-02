class Login {

    preencherFormularioPreCadastro(user) {        
        cy.get('[data-qa="signup-name"]')
            .clear()
            .type(user.name);
            
        cy.get('[data-qa="signup-email"]')
            .clear()
            .type(user.email);
            
        cy.get('[data-qa="signup-button"]')
            .click();
    }

    preencherFormularioDeLogin(email, password) {
        cy.get('[data-qa="login-email"]')
            .clear()
            .type(email);
            
        cy.get('[data-qa="login-password"]')
            .clear()
            .type(password);
            
        cy.get('[data-qa="login-button"]').click();
    }
}

// Exporta uma instância da classe
export default new Login();