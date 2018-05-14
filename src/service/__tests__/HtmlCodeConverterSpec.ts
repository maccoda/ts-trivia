import HtmlCodeConverter from '../HtmlCodeConverter';

describe('HtmlCodeCoverter', () => {
  it('should convert &#039; to "\'"', () => {
    const result = HtmlCodeConverter.convertFromHtml('Bob&#039;s Burgers');
    expect(result).toEqual("Bob's Burgers");
  });

  it('should convert &#38; to "&"', () => {
    const result = HtmlCodeConverter.convertFromHtml('Tom &#38; Jerry');
    expect(result).toEqual('Tom & Jerry');
  });
});
