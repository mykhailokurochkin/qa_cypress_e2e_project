import PageObject from './PageObject';

class SettingsPageObject extends PageObject {
  get usernameField() {
    return cy.getByDataCy('username-field');
  }

  get emailField() {
    return cy.getByDataCy('email-field');
  }

  get bioField() {
    return cy.getByDataCy('bio-field');
  }

  get currentPasswordField() {
    return cy.getByDataCy('current-password-field');
  }

  get newPasswordField() {
    return cy.getByDataCy('new-password-field');
  }

  get updateSettingsButton() {
    return cy.getByDataCy('update-settings-button');
  }

  get logoutButton() {
    return cy.getByDataCy('logout-button');
  }

  typeUsername(username) {
    this.usernameField.clear().type(username);
  }

  typeEmail(email) {
    this.emailField.clear().type(email);
  }

  typeBio(bio) {
    this.bioField.clear().type(bio);
  }

  typeCurrentPassword(password) {
    this.currentPasswordField.type(password);
  }

  typeNewPassword(password) {
    this.newPasswordField.type(password);
  }

  clickUpdateSettings() {
    this.updateSettingsButton.click();
  }

  clickLogout() {
    this.logoutButton.click();
  }
}

export default SettingsPageObject;
