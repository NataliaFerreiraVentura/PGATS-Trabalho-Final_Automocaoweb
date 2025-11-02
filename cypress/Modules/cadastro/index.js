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
    
      // Informações do endereço
      cy.get('[data-qa="first_name"]').clear().type(user.firstName);
      cy.get('input#last_name').clear().type(user.lastName);
      cy.get('input#company').clear().type(user.company);
      cy.get('input#address1').clear().type(user.address);
      cy.get('select#country').select(user.country);
      cy.get('input#city').clear().type(user.city);
      cy.get('input#state').clear().type(user.state);
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