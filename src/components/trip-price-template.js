import {tempData} from "./tempData.js";
import {createElement} from "./utils.js";

const calculateTotalPrice = (data) => {
  let total = 0;
  data.forEach((it) => {
    total += +it.tripPointPrice;
  });
  return total;
};

const renderTripPriceTemplate = () => {
  const totalPrice = calculateTotalPrice(tempData);
  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
    </p>`
  );
};

export default class TripPriceComponent {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return renderTripPriceTemplate();
  }
  getElement() {
    if (!this._element) {
      return createElement(this.getTemplate());
    }
    return this._element;
  }
  removeElement() {
    this._element = null;
  }
}
