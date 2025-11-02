class Produtos {
    acessaDetalhesDoProduto() {
        cy.contains('View Product').first().click();
    }

    validarInformacoesDoProduto() {
        cy.get('.product-information').should('be.visible').within(() => {
            cy.get('h2').should('be.visible').and('not.be.empty');
            cy.contains('Category:').should('be.visible');
            cy.contains('Rs.').should('be.visible');
            cy.contains('Availability:').should('be.visible');
            cy.contains('Condition:').should('be.visible');
            cy.contains('Brand:').should('be.visible');
        });
    }

    pesquisarProduto(nomeDoProduto) {
        cy.get('#search_product').clear().type(nomeDoProduto);
        cy.get('#submit_search').click();
    }

    validarProdutosPesquisados(termoPesquisa) {
        cy.get('.features_items .col-sm-4').should('have.length.at.least', 1);
        cy.get('.features_items .productinfo p')
          .should('contain.text', termoPesquisa);
    }
}

export default new Produtos();