import AbstractComponent from "./abstract-task.js";
import {SortType} from "./const.js";

const renderSortTamplate = () => {
  const {EVENT, TIME, PRICE} = SortType;
  return (
    `<div><h2 class="visually-hidden">Trip events</h2>
      <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
        <span class="trip-sort__item  trip-sort__item--day"></span>

        <div class="trip-sort__item  trip-sort__item--event">
          <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event">
          <label class="trip-sort__btn" data-sort-type="${EVENT}" for="sort-event">Event</label>
        </div>

        <div class="trip-sort__item  trip-sort__item--time">
          <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" checked>
          <label class="trip-sort__btn  trip-sort__btn--active  trip-sort__btn--by-increase" data-sort-type="${TIME}" for="sort-time">
            Time
          </label>
        </div>

        <div class="trip-sort__item  trip-sort__item--price">
          <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
          <label class="trip-sort__btn" data-sort-type="${PRICE}" for="sort-price">
            Price
          </label>
        </div>

        <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
      </form></div>`
  );
};

export default class TripSortComponent extends AbstractComponent {
  constructor() {
    super();
    this._sortType = SortType.TIME;
  }
  getTemplate() {
    return renderSortTamplate();
  }
  getSortType() {
    return this._sortType;
  }
  setClickListener(handler) {
    this.getElement().querySelector(`form`).addEventListener(`click`, (evt) => {
      const target = evt.target;
      const currentSortType = target.dataset.sortType;

      if (target.tagName !== `LABEL`) {
        return;
      }
      if (this.getSortType() === currentSortType) {
        return;
      }

      this._sortType = currentSortType;
      handler();
    });
  }
}
