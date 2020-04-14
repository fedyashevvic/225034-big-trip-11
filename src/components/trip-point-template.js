import {EVENT_TYPES} from "./const.js";
import {formatTime, formatDuration, formateFullDate, formatMonthAndDate} from "./utils.js";


const returnOfferTemplate = (obj) => {
  return (
    `<li class="event__offer">
      <span class="event__offer-title">${obj.description}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${obj.price}</span>
    </li>`
  );
};

const renderMultiTemplate = (arr, func) => {
  let currentTemplate = ``;
  arr.forEach((it) => {
    currentTemplate += func(it);
  });
  return currentTemplate;
};

export const renderTripPointTamplate = (data, dayCounter, dayDate) => {
  const {tripPointTitle, tripEventType, tripPointPrice, tripOffer, tripDateStart, tripDateEnd} = data;

  const isStartDate = tripDateStart instanceof Date ? true : false;
  const isEndDate = tripDateEnd instanceof Date ? true : false;

  const offerTemplate = tripOffer instanceof Array ? renderMultiTemplate(tripOffer, returnOfferTemplate) : ``;
  const startDate = isStartDate ? formateFullDate(tripDateStart) : ``;
  const endDate = isEndDate ? formateFullDate(tripDateStart) : ``;
  const startTime = isStartDate ? formatTime(tripDateStart) : ``;
  const endTime = isEndDate ? formatTime(tripDateEnd) : ``;
  const tripDuration = formatDuration(Math.abs((tripDateEnd - tripDateStart)));

  return (
    `<ul class="trip-days">
      <li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${dayCounter ? dayCounter : ``}</span>
          <time class="day__date" datetime="${dayDate ? startDate : ``}">${dayDate ? formatMonthAndDate(dayDate) : ``}</time>  
        </div>
        <ul class="trip-events__list">
          <li class="trip-events__item">
            <div class="event">
              <div class="event__type">
                <img class="event__type-icon" width="42" height="42" src="img/icons/${tripEventType}.png" alt="Event type icon">
              </div>
              <h3 class="event__title">${tripEventType} ${EVENT_TYPES.includes(tripEventType) ? `in` : `to`} ${tripPointTitle}</h3>
              <div class="event__schedule">
                <p class="event__time">
                  <time class="event__start-time" datetime="${startDate}T${startTime}">${startTime}</time>
                  &mdash;
                  <time class="event__end-time" datetime="${endDate}T${endTime}">${endTime}</time>
                </p>
                <p class="event__duration">${tripDuration}</p>
              </div>

              <p class="event__price">
                &euro;&nbsp;<span class="event__price-value">${tripPointPrice}</span>
              </p>

              <h4 class="visually-hidden">Offers:</h4>
              <ul class="event__selected-offers">
                ${offerTemplate}
              </ul>

              <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
              </button>
            </div>
          </li>
        </ul>`
  );
};
