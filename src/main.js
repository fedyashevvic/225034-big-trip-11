import TripInfoComponent from './components/trip-info-template.js';
import TripPriceComponent from './components/trip-price-template';
import TripMenuComponent from './components/site-menu-template.js';
import TripFilterComponent from './components/site-filters-template.js';
import TripSortComponent from './components/site-sort-template.js';
import TripEditComponent from './components/site-form-template.js';
import TripPointComponent from './components/trip-point-template.js';
import {tempData} from "./components/tempData.js";
import {RenderPlace} from "./components/const.js";

const {BEFOREEND, AFTERBEGIN} = RenderPlace;
const pageHeaderEl = document.querySelector(`.page-header`);
const pageTripOverviewEl = pageHeaderEl.querySelector(`.trip-main`);
const pageTripControlsEl = pageTripOverviewEl.querySelector(`.trip-controls`);
const pageMainEl = document.querySelector(`main.page-main`);
const pageTripEventsEl = pageMainEl.querySelector(`.trip-events`);
let dayCount = 0;
let currentDate = tempData[0].tripDateStart;

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

const renderTask = () => {
  tempData.forEach((it) => {
    const isNextDay = currentDate.getDate() < it.tripDateStart.getDate() || currentDate === it.tripDateStart ? true : false;
    let tripPoint;
    if (isNextDay) {
      currentDate = isNextDay ? it.tripDateStart : currentDate;
      dayCount = isNextDay ? ++dayCount : dayCount;
      tripPoint = new TripPointComponent(it, dayCount, currentDate);
    } else {
      tripPoint = new TripPointComponent(it, ``, ``);
    }
    renderElement(pageTripEventsEl, tripPoint.getElement());
    renderElement(pageTripEventsEl, new TripEditComponent(it).getElement());
  });
};

renderElement(pageTripOverviewEl, new TripInfoComponent().getElement(), AFTERBEGIN);
const pageTripInfoEl = pageTripOverviewEl.querySelector(`.trip-info`);
renderElement(pageTripInfoEl, new TripPriceComponent().getElement());
renderElement(pageTripControlsEl, new TripMenuComponent().getElement(), AFTERBEGIN);
renderElement(pageTripControlsEl, new TripFilterComponent().getElement());
renderElement(pageTripEventsEl, new TripSortComponent().getElement());

renderTask();
