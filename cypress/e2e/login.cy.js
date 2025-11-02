/// <reference types="cypress" />

import menu from '../Modules/menu';
import login from '../Modules/login';
import userData from '../fixtures/userData.json';
import { verificarPaginaInicialCarregada,verificarPaginaDeLoginECadastro, verificarUsuarioLogado } from '../support/assertions';

describe('Automation Exercise - Testes E2E - Login', () => {

  beforeEach(() => {
    cy.visit('/');
    verificarPaginaInicialCarregada();
    menu.navegarParaLogin();
    verificarPaginaDeLoginECadastro();
  
  });

  describe('Login e Logout', () => {

    it('Test Case 02 - Login do usuário com e-mail e senha corretos', () => {
      // ACT
      login.preencherFormularioDeLogin(
        userData.validUser.userValid,
        userData.validUser.password
      );

      // ASSERT
      verificarUsuarioLogado(userData.validUser.name);
    });

    it('Test Case 03 - Login do usuário com e-mail e senha incorretos', () => {
      // ACT
      login.preencherFormularioDeLogin(
        userData.invalidUser.userInvalid,
        userData.invalidUser.passwordInvalid
      );

      // ASSERT
      cy.get('.login-form > form > p')
        .should('contain', 'Your email or password is incorrect!');
    });

    it('Test Case 04 - Fazer logout do usuário', () => {
      // ACT
      login.preencherFormularioDeLogin(
        userData.validUser.userValid,
        userData.validUser.password
      );
      menu.efetuarLogout();

      // ASSERT
      verificarPaginaDeLoginECadastro();
      cy.get('a[href="/login"]').should('contain', 'Signup / Login');
    });
  });
});