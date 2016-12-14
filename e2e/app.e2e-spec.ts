import { AngstromctfPage } from './app.po';

describe('angstromctf App', function() {
  let page: AngstromctfPage;

  beforeEach(() => {
    page = new AngstromctfPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
