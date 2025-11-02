
/// <reference types="cypress" />

import menu from '../Modules/menu';
import produtos from '../Modules/produtos';
import { verificarPaginaInicialCarregada } from '../support/assertions';

describe('Produtos', () => {
  beforeEach(() => {
    cy.visit('/');
    verificarPaginaInicialCarregada();
  });

  it('Test Case 08 - Verificar todos os produtos e a página de detalhes do produto', () => {
    // ACT
    menu.navegarParaProdutos();
    produtos.acessaDetalhesDoProduto();

    // ASSERT
    cy.url().should('include', '/product_details/');
    produtos.validarInformacoesDoProduto();
  });

  it('Test Case 09 - Pesquisar produto', () => {
    // ARRANGE
    const termoPesquisa = 'Dress';

    // ACT
    menu.navegarParaProdutos();
    produtos.pesquisarProduto(termoPesquisa);

    // ASSERT
    cy.contains('Searched Products').should('be.visible');
    produtos.validarProdutosPesquisados(termoPesquisa);
  });
});