// Text utility for fitting text within a maximum size
export default class TextUtil {
  static fitText(text, maxSize) {
    if (text.width > maxSize) {
      let defaultStyle = text.style;
      let defaultFontSize = defaultStyle.fontSize;
      defaultStyle.fontSize = maxSize / text.width * defaultFontSize;
      text.update();
    }
  }
}