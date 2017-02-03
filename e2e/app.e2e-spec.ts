import { CatLazyLoadingPage } from './app.po';

describe('cat-lazy-loading App', function() {
  let page: CatLazyLoadingPage;

  beforeEach(() => {
    page = new CatLazyLoadingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
