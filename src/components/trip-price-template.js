import {tempData} from "./tempData.js";
import AbstractComponent from "./abstract-task.js";

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

export default class TripPriceComponent extends AbstractComponent {
  getTemplate() {
    return renderTripPriceTemplate();
  }
}
