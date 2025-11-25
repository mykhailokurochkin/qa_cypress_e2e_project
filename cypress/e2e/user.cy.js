/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';

const signInPage = new SignInPageObject();
const profilePage = new ProfilePageObject();
const settingsPage = new SettingsPageObject();

describe('User Profile Management', () => {
  let user1, user2;

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((generateUser) => {
      user1 = generateUser;
      cy.register(user1.email, user1.username, user1.password);
    });

    cy.task('generateUser').then((generateUser) => {
      user2 = generateUser;
      cy.register(user2.email, user2.username, user2.password);
    });
  });

  it('should follow and unfollow another user', () => {
    signInPage.visit();
    signInPage.typeEmail(user1.email);
    signInPage.typePassword(user1.password);
    signInPage.clickSignInBtn();

    profilePage.visitUserProfile(user2.username);
    profilePage.followButton.should('be.visible');
    profilePage.clickFollowButton();

    profilePage.unfollowButton.should('be.visible');

    profilePage.clickUnfollowButton();
    profilePage.followButton.should('be.visible');
  });

  it('should update user profile settings', () => {
    const updatedBio = 'Updated bio for testing';

    signInPage.visit();
    signInPage.typeEmail(user1.email);
    signInPage.typePassword(user1.password);
    signInPage.clickSignInBtn();

    cy.visit('/settings');
    settingsPage.typeBio(updatedBio);
    settingsPage.clickUpdateSettings();

    cy.get('.alert.alert-success').should('be.visible');
    cy.get('.user-info').should('contain', updatedBio);
  });

  it('should update username', () => {
    const newUsername = `updated_${Date.now()}`;

    signInPage.visit();
    signInPage.typeEmail(user1.email);
    signInPage.typePassword(user1.password);
    signInPage.clickSignInBtn();

    cy.visit('/settings');
    settingsPage.typeUsername(newUsername);
    settingsPage.clickUpdateSettings();

    cy.get('.alert.alert-success').should('be.visible');
    cy.get('.nav-link').should('contain', newUsername);
    profilePage.visitUserProfile(newUsername);
    cy.url().should('include', `/profile/${newUsername}`);
  });

  it('should update email', () => {
    const newEmail = `updated_${Date.now()}@example.com`;

    signInPage.visit();
    signInPage.typeEmail(user1.email);
    signInPage.typePassword(user1.password);
    signInPage.clickSignInBtn();

    cy.visit('/settings');
    settingsPage.typeEmail(newEmail);
    settingsPage.clickUpdateSettings();
    cy.get('.alert.alert-success').should('be.visible');
    settingsPage.clickLogout();
    signInPage.typeEmail(newEmail);
    signInPage.typePassword(user1.password);
    signInPage.clickSignInBtn();
    cy.get('.nav-link').should('contain', user1.username);
  });

  it('should update password', () => {
    const newPassword = 'NewSecurePass123!';
    signInPage.visit();
    signInPage.typeEmail(user1.email);
    signInPage.typePassword(user1.password);
    signInPage.clickSignInBtn();

    cy.visit('/settings');
    settingsPage.typeCurrentPassword(user1.password);
    settingsPage.typeNewPassword(newPassword);
    settingsPage.clickUpdateSettings();
    cy.get('.alert.alert-success').should('be.visible');
    settingsPage.clickLogout();
    signInPage.typeEmail(user1.email);
    signInPage.typePassword(newPassword);
    signInPage.clickSignInBtn();
    cy.get('.nav-link').should('contain', user1.username);
  });
});
