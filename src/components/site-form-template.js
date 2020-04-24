import {TRANSPORT_TYPES, TRIP_DESTINATIONS, EVENT_TYPES} from "./const.js";
import {formatTime, formateFullCreationDate} from "./utils.js";
import AbstractComponent from "./abstract-task.js";

const returnTransportTemplate = (type) => {
  return (
    `<div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
    </div>`
  );
};

const returnEventTypeTemplate = (type) => {
  return (
    `<div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
    </div>`
  );
};
const returnOfferTemplate = (obj) => {
  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${obj.title}-1" type="checkbox" name="event-offer-${obj.title}">
      <label class="event__offer-label" for="event-offer-${obj.title}-1">
        <span class="event__offer-title">${obj.description}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${obj.price}</span>
      </label>
    </div>`
  );
};
const returnDestinationPoints = (destination) => {
  return (
    `<option value="${destination}"></option>`
  );
};
const returnImageTepmlate = (src) => {
  return (
    `<img class="event__photo" src="${src}" alt="Event photo">`
  );
};
const renderMultiTemplate = (arr, func) => {
  let currentTemplate = ``;
  arr.forEach((it) => {
    currentTemplate += func(it);
  });
  return currentTemplate;
};


const renderTripCreationFormTamplate = (data) => {
  const {tripDescription, tripEventType, tripImage, tripOffer, tripDateStart, tripDateEnd, tripPointTitle} = data;

  const isStartDate = tripDateStart instanceof Date ? true : false;
  const isEndDate = tripDateEnd instanceof Date ? true : false;

  const startDate = isStartDate ? formateFullCreationDate(tripDateStart) : ``;
  const endDate = isEndDate ? formateFullCreationDate(tripDateEnd) : ``;
  const startTime = isStartDate ? formatTime(tripDateStart) : ``;
  const endTime = isEndDate ? formatTime(tripDateEnd) : ``;

  const tripImageTemplate = tripImage instanceof Array ? renderMultiTemplate(tripImage, returnImageTepmlate) : ``;
  const tripOfferTemplate = tripOffer instanceof Array ? renderMultiTemplate(tripOffer, returnOfferTemplate) : ``;
  const tripTransport = renderMultiTemplate(TRANSPORT_TYPES, returnTransportTemplate);
  const tripDestination = renderMultiTemplate(TRIP_DESTINATIONS, returnDestinationPoints);
  const eventType = renderMultiTemplate(EVENT_TYPES, returnEventTypeTemplate);

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${tripEventType}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>
              ${tripTransport}
              </fieldset>
              <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>

              ${eventType}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
          ${tripEventType} ${EVENT_TYPES.includes(tripEventType) ? `in` : `to`} 
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${tripPointTitle}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${tripDestination}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDate} ${startTime}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDate} ${endTime}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
      <section class="event__details">
      ${tripOfferTemplate ? `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${tripOfferTemplate}
      </div>
    </section>` : ``}
        
    ${tripDescription || tripImageTemplate ? `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${tripDescription}</p>

    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${tripImageTemplate}
      </div>
    </div>
  </section>` : ``}
      </section>
    </form>`
  );
};

export default class TripEditComponent extends AbstractComponent {
  constructor(data) {
    super();
    this._data = data;
  }
  getTemplate() {
    return renderTripCreationFormTamplate(this._data);
  }
}
