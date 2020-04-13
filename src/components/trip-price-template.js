import {tempData} from "./tempData.js";

const calculateTotalPrice = (data) => {
  let total = 0;
  data.forEach((it) => {
    total += +it.tripPointPrice;
  });
  return total;
};

export const renderTripPriceTemplate = () => {
  const totalPrice = calculateTotalPrice(tempData);
  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
    </p>`
  );
};
