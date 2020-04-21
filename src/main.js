import TripInfoComponent from './components/trip-info-template.js';
import TripPriceComponent from './components/trip-price-template';
import TripMenuComponent from './components/site-menu-template.js';
import TripFilterComponent from './components/site-filters-template.js';
import TripSortComponent from './components/site-sort-template.js';
import TripEditComponent from './components/site-form-template.js';
import TripPointComponent from './components/trip-point-template.js';
import NoPointComponent from "./components/no-point-template.js";
import {tempData} from "./components/tempData.js";
import {RenderPlace, Key} from "./components/const.js";

const {BEFOREEND, AFTERBEGIN} = RenderPlace;
const pageHeaderEl = document.querySelector(`.page-header`);
const pageTripOverviewEl = pageHeaderEl.querySelector(`.trip-main`);
const pageTripControlsEl = pageTripOverviewEl.querySelector(`.trip-controls`);
const pageMainEl = document.querySelector(`main.page-main`);
const pageTripEventsEl = pageMainEl.querySelector(`.trip-events`);
const pageTripInfoEl = pageTripOverviewEl.querySelector(`.trip-info`);

let dayCount = 0;
let currentDate = tempData.length ? tempData[0].tripDateStart : ``;

const renderElement = (container, element, place = BEFOREEND) => {
  switch (place) {
    case AFTERBEGIN:
      container.prepend(element);
      break;
    case BEFOREEND:
      container.append(element);
      break;
  }
};

const renderTask = (element, data) => {
  const isNextDay = currentDate.getDate() < data.tripDateStart.getDate() || currentDate === data.tripDateStart ? true : false;
  let tripPointElement = new TripPointComponent(data, ``, ``);
  const tripEditElement = new TripEditComponent(data);

  const editButtonHandler = () => {
    element.replaceChild(tripEditElement.getElement(), tripPointElement.getElement());
    const closeOnEsc = (evt) => {
      if (evt.key === Key.ESC) {
        saveEditHandler();
        window.removeEventListener(`keydown`, closeOnEsc);
      }
    };
    window.addEventListener(`keydown`, closeOnEsc);
  };
  const saveEditHandler = () => {
    element.replaceChild(tripPointElement.getElement(), tripEditElement.getElement());
  };

  if (isNextDay) {
    currentDate = isNextDay ? data.tripDateStart : currentDate;
    dayCount = isNextDay ? ++dayCount : dayCount;
    tripPointElement = new TripPointComponent(data, dayCount, currentDate);
  }
  const editButton = tripPointElement.getElement().querySelector(`.event__rollup-btn`);
  const saveEditButton = tripEditElement.getElement();

  editButton.addEventListener(`click`, editButtonHandler);
  saveEditButton.addEventListener(`submit`, saveEditHandler);

  renderElement(element, tripPointElement.getElement());
};

renderElement(pageTripInfoEl, new TripPriceComponent().getElement());
renderElement(pageTripControlsEl, new TripMenuComponent().getElement(), AFTERBEGIN);
renderElement(pageTripControlsEl, new TripFilterComponent().getElement());

if (!tempData.length) {
  renderElement(pageTripEventsEl, new NoPointComponent().getElement());
} else {
  renderElement(pageTripInfoEl, new TripInfoComponent().getElement(), AFTERBEGIN);
  renderElement(pageTripEventsEl, new TripSortComponent().getElement());
  tempData.forEach((it) => {
    renderTask(pageTripEventsEl, it);
  });
}

