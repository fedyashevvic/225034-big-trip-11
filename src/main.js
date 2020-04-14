import {renderTripInfoTamplate} from './components/trip-info-template.js';
import {renderTripPriceTemplate} from './components/trip-price-template';
import {renderMenuTamplate} from './components/site-menu-template.js';
import {renderFiltersTamplate} from './components/site-filters-template.js';
import {renderSortTamplate} from './components/site-sort-template.js';
import {renderTripCreationFormTamplate} from './components/site-form-template.js';
import {renderTripPointTamplate} from './components/trip-point-template.js';
import {tempData} from "./components/tempData.js";


const pageHeaderEl = document.querySelector(`.page-header`);
const pageTripOverviewEl = pageHeaderEl.querySelector(`.trip-main`);
const pageTripControlsEl = pageTripOverviewEl.querySelector(`.trip-controls`);
const pageMainEl = document.querySelector(`main.page-main`);
const pageTripEventsEl = pageMainEl.querySelector(`.trip-events`);
let dayCount = 0;
let currentDate = tempData[1].tripDateStart;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

render(pageTripOverviewEl, renderTripInfoTamplate(), `afterbegin`);
const pageTripInfoEl = pageTripOverviewEl.querySelector(`.trip-info`);
render(pageTripInfoEl, renderTripPriceTemplate());
render(pageTripControlsEl, renderMenuTamplate(), `afterbegin`);
render(pageTripControlsEl, renderFiltersTamplate());
render(pageTripEventsEl, renderSortTamplate(), `afterbegin`);
render(pageTripEventsEl, renderTripCreationFormTamplate(tempData[0]));

tempData.slice(1).forEach((it) => {
  const isNextDay = currentDate.getDate() < it.tripDateStart.getDate() || currentDate === it.tripDateStart ? true : false;

  if (isNextDay) {
    currentDate = isNextDay ? it.tripDateStart : currentDate;
    dayCount = isNextDay ? ++dayCount : dayCount;
    render(pageTripEventsEl, renderTripPointTamplate(it, dayCount, currentDate));
  } else {
    render(pageTripEventsEl, renderTripPointTamplate(it, ``, ``));
  }

});
