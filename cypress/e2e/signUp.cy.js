/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  beforeEach(() => {
    cy.task('db:clear');
  });

  it('should provide an ability to register with valid data', () => {
    const user = {
      username: `testuser_${Date.now()}`,
      email: `test_${Date.now()}@example.com`,
      password: 'Password123!'
    };

    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not allow registration with existing email', () => {
    const user = {
      username: `testuser_${Date.now()}`,
      email: `test_${Date.now()}@example.com`,
      password: 'Password123!'
    };

    cy.register(user.email, user.username, user.password);

    signUpPage.visit();
    signUpPage.typeUsername(`new_${user.username}`);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    cy.get('.error-messages')
      .should('be.visible')
      .and('contain', 'email has already been taken');
  });

  it('should not allow registration with existing username', () => {
    const user = {
      username: `testuser_${Date.now()}`,
      email: `test_${Date.now()}@example.com`,
      password: 'Password123!'
    };

    cy.register(user.email, user.username, user.password);

    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(`new_${user.email}`);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    cy.get('.error-messages')
      .should('be.visible')
      .and('contain', 'username has already been taken');
  });

  it('should validate required fields', () => {
    signUpPage.visit();
    signUpPage.clickSignUpBtn();

    cy.get('.error-messages')
      .should('be.visible')
      .and('contain', 'username can\'t be blank')
      .and('contain', 'email can\'t be blank')
      .and('contain', 'password can\'t be blank');
  });

  it('should validate email format', () => {
    signUpPage.visit();
    signUpPage.typeEmail('invalid-email');
    signUpPage.clickSignUpBtn();

    cy.get('.error-messages')
      .should('be.visible')
      .and('contain', 'email is invalid');
  });

  it('should validate password length', () => {
    signUpPage.visit();
    signUpPage.typePassword('short');
    signUpPage.clickSignUpBtn();

    cy.get('.error-messages')
      .should('be.visible')
      .and('contain', 'password is too short (minimum is 8 characters)');
  });
});
