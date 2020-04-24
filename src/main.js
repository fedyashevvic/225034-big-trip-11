import TripInfoComponent from './components/trip-info-template.js';
import TripPriceComponent from './components/trip-price-template';
import TripMenuComponent from './components/site-menu-template.js';
import TripFilterComponent from './components/site-filters-template.js';
import TripSortComponent from './components/site-sort-template.js';
import TripEditComponent from './components/site-form-template.js';
import TripPointComponent from './components/trip-point-template.js';
import NoPointComponent from "./components/no-point-template.js";
import {tempData} from "./components/tempData.js";
import {Key, RenderPlace} from "./components/const.js";
import {renderElement, replaceElement} from "./utils/render.js";

const {AFTERBEGIN} = RenderPlace;
const pageHeaderEl = document.querySelector(`.page-header`);
const pageTripOverviewEl = pageHeaderEl.querySelector(`.trip-main`);
const pageTripControlsEl = pageTripOverviewEl.querySelector(`.trip-controls`);
const pageMainEl = document.querySelector(`main.page-main`);
const pageTripEventsEl = pageMainEl.querySelector(`.trip-events`);
const pageTripInfoEl = pageTripOverviewEl.querySelector(`.trip-info`);

let dayCount = 0;
let currentDate = tempData.length ? tempData[0].tripDateStart : ``;

const renderTask = (element, data) => {
  const isNextDay = currentDate.getDate() < data.tripDateStart.getDate() || currentDate === data.tripDateStart ? true : false;
  let tripPointElement = new TripPointComponent(data, ``, ``);
  const tripEditElement = new TripEditComponent(data);

  const editButtonHandler = () => {
    replaceElement(element, tripEditElement, tripPointElement);
    const closeOnEsc = (evt) => {
      if (evt.key === Key.ESC) {
        saveEditHandler();
        window.removeEventListener(`keydown`, closeOnEsc);
      }
    };
    window.addEventListener(`keydown`, closeOnEsc);
  };
  const saveEditHandler = () => {
    replaceElement(element, tripPointElement, tripEditElement);
  };

  if (isNextDay) {
    currentDate = isNextDay ? data.tripDateStart : currentDate;
    dayCount = isNextDay ? ++dayCount : dayCount;
    tripPointElement = new TripPointComponent(data, dayCount, currentDate);
  }

  tripPointElement.setEditButtonClickEvt(editButtonHandler);
  tripEditElement.setFormSubmitEvt(saveEditHandler);

  renderElement(element, tripPointElement);
};

renderElement(pageTripInfoEl, new TripPriceComponent());
renderElement(pageTripControlsEl, new TripMenuComponent(), AFTERBEGIN);
renderElement(pageTripControlsEl, new TripFilterComponent());

if (!tempData.length) {
  renderElement(pageTripEventsEl, new NoPointComponent());
} else {
  renderElement(pageTripInfoEl, new TripInfoComponent(), AFTERBEGIN);
  renderElement(pageTripEventsEl, new TripSortComponent());
  tempData.forEach((it) => {
    renderTask(pageTripEventsEl, it);
  });
}

