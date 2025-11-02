class Menu {
    
    navegarParaLogin() {
        // Boa prática: Usar texto visível ao invés de href
        cy.contains('a', 'Signup / Login').should('be.visible').click();
    }

    efetuarLogout() {
        // Boa prática: Usar texto visível
        cy.contains('a', 'Logout').should('be.visible').click();
    }

    navegarParaContato() {
        // Boa prática: Usar texto visível
        cy.contains('a', 'Contact us').should('be.visible').click();
    }

    navegarParaProdutos() {
        // Boa prática: Usar texto visível
        cy.contains('a', 'Products').should('be.visible').click();
    }

    realizarAssinatura(email) {
        // Boa prática: Seletores simples e confiáveis
        cy.get('#susbscribe_email').scrollIntoView();
        cy.get('#susbscribe_email').type(email);
        cy.get('#subscribe').click();
    }

}

// Exporta uma instância da classe
export default new Menu();