/// <reference types="cypress" />

import { createNewUserData } from '../support/helpers';
import login from '../Modules/login';
import cadastro from '../Modules/cadastro';
import menu from '../Modules/menu';
import userData from '../fixtures/userData.json';
import { verificarPaginaInicialCarregada,verificarPaginaDeLoginECadastro,verificarUsuarioLogado } from '../support/assertions';

describe('Automation Exercise - Testes E2E - Cadastro Usuarios', () => {
  beforeEach(() => {
    cy.visit('/');
    verificarPaginaInicialCarregada();
    menu.navegarParaLogin();
    verificarPaginaDeLoginECadastro();
  });

  it('Test Case 01 - Cadastrar usuário', () => {
      // ARRANGE
      const newUser = createNewUserData();

      // ACT
      login.preencherFormularioPreCadastro(newUser);
      cadastro.preencherFormularioCadastro(newUser);

      // ASSERT
      cy.get('[data-qa="account-created"]')
        .should('be.visible')
        .and('contain.text', 'Account Created!');
      cadastro.continuarAposCriacao();
      verificarUsuarioLogado(newUser.name);
    });

    it('Test Case 05 - Cadastrar usuário com e-mail existente', () => {
      // ARRANGE
      const existingUser = userData.validUser;

      // ACT
      login.preencherFormularioPreCadastro({
        name: existingUser.name,
        email: existingUser.userValid
      });

      // ASSERT
      cy.contains('Email Address already exist!').should('be.visible');
    });
});


