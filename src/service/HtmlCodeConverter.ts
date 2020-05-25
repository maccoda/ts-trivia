export default class HtmlCodeConverter {
  public static convertFromHtml(s: string): string {
    const element = document.createElement('div')
    element.innerHTML = s
    return element.childNodes[0].nodeValue || ''
  }
}
