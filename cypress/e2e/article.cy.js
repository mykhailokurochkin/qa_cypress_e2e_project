/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from '../support/pages/article.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const articlePage = new ArticlePageObject();
const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Article Management', () => {
  let user;
  let articleData;

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
    });

    articleData = {
      title: `Test Article ${Date.now()}`,
      about: 'This is a test article',
      content: 'This is the content of the test article',
      tags: ['test', 'cypress', 'e2e']
    };
  });

  it('should be created using New Article form', () => {
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    articlePage.clickNewArticle();

    articlePage.typeTitle(articleData.title);
    articlePage.typeAbout(articleData.about);
    articlePage.typeContent(articleData.content);
    articlePage.typeTags(articleData.tags.join(' '));

    articlePage.clickPublishArticle();

    articlePage.articleTitle.should('contain', articleData.title);
    articlePage.articleContent.should('contain', articleData.content);
  });

  it('should be edited using Edit button', () => {
    const updatedContent = 'Updated article content';

    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    cy.createArticle(articleData);

    articlePage.clickEditArticle();
    articlePage.articleContentField.clear().type(updatedContent);
    articlePage.clickPublishArticle();

    articlePage.articleContent.should('contain', updatedContent);
  });

  it('should be deleted using Delete button', () => {
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    cy.createArticle(articleData);

    articlePage.clickDeleteArticle();

    cy.url().should('not.include', '/article/');
    homePage.articleList.should('not.contain', articleData.title);
  });

  it('should validate required fields when creating an article', () => {
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    articlePage.clickNewArticle();
    articlePage.clickPublishArticle();

    cy.get('.error-messages')
      .should('be.visible')
      .and('contain', 'title can\'t be blank')
      .and('contain', 'description can\'t be blank')
      .and('contain', 'body can\'t be blank');
  });
});
