/// <reference types="cypress" />
import { getRandomEmail } from '../support/helpers';
import contato from '../Modules/contato';
import menu from '../Modules/menu';
import { createNewUserData, createFakeCardData } from '../support/helpers';
import login from '../Modules/login';
import cadastro from '../Modules/cadastro';
import userData from '../fixtures/supportContact.json';
import { verificarPaginaInicialCarregada, verificarUsuarioLogado } from '../support/assertions';
import carrinho from '../Modules/carrinho';


describe('Automation Exercise - Testes E2E - Navegação - Contato, Newsletter e Compras', () => {
  
  beforeEach(() => {
    cy.visit('/');
    verificarPaginaInicialCarregada();
  });

  describe('Formulário de Contato', () => {
    it('Test Case 06 - Formulário de contato', () => {
      // ARRANGE
      
      // ACT
      menu.navegarParaContato();
      contato.preencherFormularioContato(userData);
      // ASSERT
      cy.get('.status')
        .should('be.visible')
        .and('contain.text', 'Success! Your details have been submitted successfully.');
      
      cy.url().should('include', '/contact_us');
      cy.get('h2').should('contain.text', 'Get In Touch');
      
      contato.continuarAposEnvio();
      cy.url().should('eq', Cypress.config().baseUrl);
      verificarPaginaInicialCarregada();
    });
  });

  describe('Assinatura e Pedido', () => {
    it('Test Case 10 - Verificar assinatura na página inicial', () => {
      // ARRANGE
      const email = getRandomEmail();

      // ACT
      menu.realizarAssinatura(email);
      // ASSERT
      cy.get('.single-widget')
        .should('be.visible')
        .and('contain', 'Subscription');
      
      cy.get('.alert-success')
        .should('be.visible')
        .and('have.text', 'You have been successfully subscribed!');
    });

    it('Test Case 15 - Fazer pedido: Registre-se antes de finalizar a compra', () => {
      // ARRANGE
      const newUser = createNewUserData();
      const cardData = createFakeCardData();
      
      // ACT
      // Cadastrar novo usuário
      menu.navegarParaLogin();
      login.preencherFormularioPreCadastro(newUser);
      cadastro.preencherFormularioCadastro(newUser);
      cadastro.continuarAposCriacao();
      verificarUsuarioLogado(newUser.name);

      // Realizar processo completo de compra
      menu.navegarParaProdutos();
      carrinho.adicionarProdutoAoCarrinho('1');
      carrinho.navegarParaCarrinho();
      carrinho.verificarProdutosNoCarrinho();
      carrinho.prosseguirParaCheckout();
      
      // Verificar endereços
      cy.get('#address_delivery')
        .should('be.visible')
        .and('contain.text', newUser.address);
      cy.get('#address_invoice')
        .should('be.visible') 
        .and('contain.text', newUser.address);
      
      carrinho.prosseguirParaPagamento();
      carrinho.concluirPagamento(cardData);

      // ASSERT
      carrinho.verificarPedidoConfirmado();
      carrinho.continuarAposPagamento();
      verificarPaginaInicialCarregada();
    });

  });

});