import AbstractComponent from "./abstract-task.js";

export default class SmartComponent extends AbstractComponent {
  recoveryListeners() {
    throw new Error(`recoveryListeners in not defined..`);
  }
  rerender() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;
    this.removeElement();
    const newElement = this.getElement();

    if (oldElement && parent && newElement) {
      parent.replaceChild(newElement, oldElement);
    }
    this.recoveryListeners();
  }
}
