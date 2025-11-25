import PageObject from './PageObject';

class ArticlePageObject extends PageObject {
  get newArticleLink() {
    return cy.getByDataCy('new-article-link');
  }

  get articleTitleField() {
    return cy.getByDataCy('article-title');
  }

  get articleAboutField() {
    return cy.getByDataCy('article-about');
  }

  get articleContentField() {
    return cy.getByDataCy('article-content');
  }

  get articleTagsField() {
    return cy.getByDataCy('article-tags');
  }

  get publishArticleBtn() {
    return cy.getByDataCy('publish-article-btn');
  }

  get editArticleBtn() {
    return cy.getByDataCy('edit-article-btn');
  }

  get deleteArticleBtn() {
    return cy.getByDataCy('delete-article-btn');
  }

  get articleTitle() {
    return cy.getByDataCy('article-title-display');
  }

  get articleContent() {
    return cy.getByDataCy('article-content-display');
  }

  clickNewArticle() {
    this.newArticleLink.click();
  }

  typeTitle(title) {
    this.articleTitleField.type(title);
  }

  typeAbout(about) {
    this.articleAboutField.type(about);
  }

  typeContent(content) {
    this.articleContentField.type(content);
  }

  typeTags(tags) {
    this.articleTagsField.type(tags);
  }

  clickPublishArticle() {
    this.publishArticleBtn.click();
  }

  clickEditArticle() {
    this.editArticleBtn.click();
  }

  clickDeleteArticle() {
    this.deleteArticleBtn.click();
  }
}

export default ArticlePageObject;
