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
      cy.get('.status').should('contain.text', 'Success! Your details have been submitted successfully.');
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
      cy.get('.single-widget').should('be.visible').and('contain', 'Subscription');
      cy.get('.alert-success').should('be.visible').and('have.text', 'You have been successfully subscribed!');
    });

    it('Test Case 15 - Fazer pedido: Registre-se antes de finalizar a compra', () => {
      // ARRANGE - Preparar dados e cadastrar usuário
      const newUser = createNewUserData();
      const cardData = createFakeCardData();
      
      // Cadastrar novo usuário
      menu.navegarParaLogin();
      login.preencherFormularioPreCadastro(newUser);
      cadastro.preencherFormularioCadastro(newUser);
      cadastro.continuarAposCriacao();
      verificarUsuarioLogado(newUser.name);

      // ACT - Realizar processo completo de compra
      // 1. Navegar para produtos e adicionar ao carrinho
      menu.navegarParaProdutos();
      cy.get('.features_items').should('be.visible');
      carrinho.adicionarProdutoAoCarrinho('1');
      
      // 2. Navegar para o carrinho e verificar
      carrinho.navegarParaCarrinho();
      carrinho.verificarProdutosNoCarrinho();
      
      // 3. Prosseguir para checkout e verificar endereços
      carrinho.prosseguirParaCheckout();
      cy.get('#address_delivery').should('be.visible').and('contain.text', newUser.address);
      cy.get('#address_invoice').should('be.visible').and('contain.text', newUser.address);
      
      // 4. Prosseguir para pagamento
      carrinho.prosseguirParaPagamento();
      
      // 5. Finalizar pagamento
      carrinho.concluirPagamento(cardData);

      // ASSERT - Verificar se pedido foi realizado com sucesso
      carrinho.verificarPedidoConfirmado();
      
      // Retornar à página inicial
      carrinho.continuarAposPagamento();
      verificarPaginaInicialCarregada();
    });

  });

});