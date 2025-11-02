class Cadastro {

    preencherFormularioCadastro(user) {        
      // Informações pessoais - aguarda página carregar
      cy.url().should('include', '/signup');
      cy.get('input[type="radio"][value="Mrs"]').check();  // Seleciona Mrs. ao invés de #id_gender2
    
      // Preenche senha
      cy.get('[data-qa="password"]')
        .clear()
        .type('Teste@123');
    
      // Data de nascimento
      cy.get('select[data-qa="days"]').select(user.birthDay);
      cy.get('select[data-qa="months"]').select(user.birthMonth);
      cy.get('select[data-qa="years"]').select(user.birthYear);
    
      // Newsletter e ofertas
      cy.get('input[type=checkbox]#newsletter').check();
      cy.get('input[type=checkbox]#optin').check();
    
      // Informações do endereço - Padronizando para data-qa quando disponível
      cy.get('[data-qa="first_name"]').clear().type(user.firstName);
      cy.get('[data-qa="last_name"], input#last_name').clear().type(user.lastName);
      cy.get('[data-qa="company"], input#company').clear().type(user.company);
      cy.get('[data-qa="address"], input#address1').clear().type(user.address);
      cy.get('[data-qa="country"], select#country').select(user.country);
      cy.get('[data-qa="city"], input#city').clear().type(user.city);
      cy.get('[data-qa="state"], input#state').clear().type(user.state);
      cy.get('[data-qa="zipcode"]').clear().type(user.zipcode);
      cy.get('[data-qa="mobile_number"]').clear().type(user.mobile);
    
      // Submeter formulário
      cy.get('[data-qa="create-account"]').click();
    }

    continuarAposCriacao() {        
        // Clica no botão Continue após criar a conta
        cy.get('[data-qa="continue-button"]').click();
    }

    cadastrarUsuarioCompleto(user) {
        this.preencherFormularioCadastro(user);
        this.continuarAposCriacao();
    }

}

// Exporta uma instância da classe
export default new Cadastro();