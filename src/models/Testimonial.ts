
import { ContentItem, Elements } from '@kentico/kontent-delivery';

/**
 * Generated by '@kentico/kontent-model-generator@3.0.0'
 * Timestamp: Thu Feb 20 2020 08:40:57 GMT+0100 (GMT+01:00)
 *
 * Tip: You can replace 'ContentItem' with another generated class to fully leverage strong typing.
 */
export class Testimonial extends ContentItem {
  public testimonialText!: Elements.RichTextElement;
  public image!: Elements.AssetsElement;
  public title!: Elements.TextElement;

  getImageElement = (item: Testimonial): string => {
    if (item.image && item.image.value[0]) {
      return `<img class='testimonial__image' src="${item.image.value[0].url}"/>`
    }
    return '';
  };

  constructor() {
    super({
      propertyResolver: ((elementName: string) => {
        if (elementName === 'testimonial_text') {
          return 'testimonialText';
        }
        return elementName;
      }),
      richTextResolver: ((item: Testimonial) => {
        return `<div class='testimonial'>
            ${this.getImageElement(item)}
            <div class='testimonial__body-wrapper'>
                <div class='testimonial__body-heading'>${item.title.value}</div>
                <div class='testimonial__body-text'>${item.testimonialText.value}</div>
            </div>
          </div>`;
      })
    });
  }
}
