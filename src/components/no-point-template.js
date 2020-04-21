import {createElement} from "./utils.js";

const renderNoPointTamplate = () => {
  return (
    `<section class="trip-events">
      <h2 class="visually-hidden">Trip events</h2>

      <p class="trip-events__msg">Click New Event to create your first point</p>
    </section>`
  );
};


export default class NoPointComponent {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return renderNoPointTamplate();
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
  removeElement() {
    this._element = null;
  }
}
