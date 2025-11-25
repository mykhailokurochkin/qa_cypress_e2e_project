import PageObject from './PageObject';

class ProfilePageObject extends PageObject {
  get followButton() {
    return cy.getByDataCy('follow-button');
  }

  get unfollowButton() {
    return cy.getByDataCy('unfollow-button');
  }

  get userInfo() {
    return cy.getByDataCy('user-info');
  }

  get userArticles() {
    return cy.getByDataCy('user-articles');
  }

  get favoritedArticles() {
    return cy.getByDataCy('favorited-articles');
  }

  clickFollowButton() {
    this.followButton.click();
  }

  clickUnfollowButton() {
    this.unfollowButton.click();
  }

  visitUserProfile(username) {
    cy.visit(`/profile/${username}`);
  }
}

export default ProfilePageObject;
