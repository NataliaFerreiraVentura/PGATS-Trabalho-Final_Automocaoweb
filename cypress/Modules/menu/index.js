class Menu {
    
    navegarParaLogin() {
        cy.get('a[href="/login"]').should('be.visible').click();
    }

    efetuarLogout() {
        cy.get('a[href="/logout"]').should('be.visible').click();
    }

    navegarParaContato() {
        cy.get('a[href="/contact_us"]').should('be.visible').click();
    }

    navegarParaProdutos() {
        cy.get('a[href="/products"]').should('be.visible').click();
    }

    realizarAssinatura(email) {
      cy.get('#susbscribe_email').scrollIntoView();
      cy.get('#susbscribe_email').type(email);
      cy.get('#subscribe').click();
    }
}

// Exporta uma instância da classe
export default new Menu();