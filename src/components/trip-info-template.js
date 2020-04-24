import {tempData} from "./tempData.js";
import {MONTH_NAMES} from "./const.js";
import AbstractComponent from "./abstract-task.js";

const returnTripTitle = (data) => {
  const startLocation = data[0].tripPointTitle;
  const midLocation = data.length > 3 ? `...` : data[1].tripPointTitle;
  const endLocation = data[data.length - 1].tripPointTitle;
  return (
    `<h1 class="trip-info__title">${startLocation} &mdash; ${midLocation} &mdash; ${endLocation}</h1>`
  );
};

const returnTripDates = (data) => {
  const tripInfoStartDate = data[0].tripDateStart;
  const thisInfoEndDate = data[data.length - 1].tripDateEnd;
  const tripMonth = tripInfoStartDate.getMonth() === thisInfoEndDate.getMonth() ? MONTH_NAMES[thisInfoEndDate.getMonth()] : `${MONTH_NAMES[tripInfoStartDate.getMonth()]} - ${MONTH_NAMES[thisInfoEndDate.getMonth()]}`;
  return (
    `<p class="trip-info__dates">${tripMonth} ${tripInfoStartDate.getDate()}&nbsp;&mdash;&nbsp;${thisInfoEndDate.getDate()}</p>`
  );
};

const renderTripInfoTamplate = () => {
  const tripInfoTitle = returnTripTitle(tempData);
  const tripDates = returnTripDates(tempData);

  return (
    `<div class="trip-info__main">
        ${tripInfoTitle}
        ${tripDates}
      </div>`
  );
};

export default class TripInfoComponent extends AbstractComponent {
  getTemplate() {
    return renderTripInfoTamplate();
  }
}
