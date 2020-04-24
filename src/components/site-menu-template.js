import AbstractComponent from "./abstract-task.js";

const renderMenuTamplate = () => {
  return (
    `<div><h2 class="visually-hidden">Switch trip view</h2>
    <nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
      <a class="trip-tabs__btn" href="#">Stats</a>
    </nav></div>`
  );
};

export default class TripMenuComponent extends AbstractComponent {
  getTemplate() {
    return renderMenuTamplate();
  }
}

