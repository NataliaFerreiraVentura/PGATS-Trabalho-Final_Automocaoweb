class Carrinho {    
    adicionarProdutoAoCarrinho(productId = '1') {
        cy.get(`[data-product-id="${productId}"]`).first().click();
        cy.get('#cartModal', { timeout: 10000 }).should('be.visible');
        cy.get('button[data-dismiss="modal"]').click();
    }

    adicionarMultiplosProdutos(productIds = ['1', '2', '5']) {
        productIds.forEach(id => {
            this.adicionarProdutoAoCarrinho(id);
        });
    }

    navegarParaCarrinho() {
        cy.get('a[href="/view_cart"]').first().click();
        cy.url().should('include', '/view_cart');
    }

    verificarProdutosNoCarrinho() {
        // Verifica se a página do carrinho carregou
        cy.contains('Shopping Cart').should('be.visible');
        // Verifica se há pelo menos um produto no carrinho
        cy.get('table').should('be.visible');
        cy.get('tbody tr').should('have.length.at.least', 1);
    }

    prosseguirParaCheckout() {
        // Boa prática: Usar texto visível
        cy.contains('a', 'Proceed To Checkout').click();
        cy.url().should('include', '/checkout');
    }

    prosseguirParaPagamento() {
        // Boa prática: Usar texto visível
        cy.contains('a', 'Place Order').click();
        cy.url().should('include', '/payment');
    }
    
    concluirPagamento(cardData) {

        cy.get('[data-qa="name-on-card"]')
            .clear()
            .type(cardData.cardHolderName);
            
        cy.get('[data-qa="card-number"]')
            .clear()
            .type(cardData.cardNumber);
            
        cy.get('[data-qa="cvc"]')
            .clear()
            .type(cardData.cvv);
            
        cy.get('[data-qa="expiry-month"]')
            .clear()
            .type(cardData.expirationMonth);
            
        cy.get('[data-qa="expiry-year"]')
            .clear()
            .type(cardData.expirationYear);
            
        cy.get('[data-qa="pay-button"]').click();
    }

    continuarAposPagamento() {
        cy.get('[data-qa="continue-button"]').click();
    }

    verificarPedidoConfirmado() {
        cy.contains('Congratulations! Your order has been confirmed!')
            .should('be.visible');
        cy.url().should('include', '/payment_done');
    }
}

// Exporta uma instância da classe
export default new Carrinho();