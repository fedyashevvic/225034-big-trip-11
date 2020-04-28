import {createElement} from "../utils/utils.js";

export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw Error(`You should not use abstract component...`);
    }
    this._element = null;
  }
  getTemplate() {
    throw Error(`Method should be defined...`);
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
  rerender() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;
    this.removeElement();
    const newElement = this.getElement();

    parent.replaceChild(oldElement, newElement);
  }
  removeElement() {
    this._element = null;
  }
}
