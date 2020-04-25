import TripInfoComponent from '../components/trip-info-template.js';
import TripPriceComponent from '../components/trip-price-template';
import TripMenuComponent from '../components/site-menu-template.js';
import TripFilterComponent from '../components/site-filters-template.js';
import TripSortComponent from '../components/site-sort-template.js';
import TripEditComponent from '../components/site-form-template.js';
import TripPointComponent from '../components/trip-point-template.js';
import NoPointComponent from "../components/no-point-template.js";
import {tempData} from "../components/tempData.js";
import {Key, RenderPlace, SortType} from "../components/const.js";
import {renderElement, replaceElement} from "../utils/render.js";

const sortData = (type) => {
  const {EVENT, TIME, PRICE} = SortType;
  const newData = tempData.slice();
  let sortedPoints = [];

  switch (type) {
    case EVENT:
      sortedPoints = newData.sort((a, b) => a.tripEventType < b.tripEventType ? -1 : 0);
      break;
    case TIME:
      sortedPoints = newData.sort((a, b) => a.tripDateStart < b.tripDateStart ? -1 : 0);
      break;
    case PRICE:
      sortedPoints = newData.sort((a, b) => b.tripPointPrice - a.tripPointPrice);
      break;
  }
  return sortedPoints;
};

export default class ControllerComponent {
  constructor() {
    this._tripInfo = new TripInfoComponent();
    this._tripPrice = new TripPriceComponent();
    this._menu = new TripMenuComponent();
    this._filters = new TripFilterComponent();
    this._sort = new TripSortComponent();
    this._noPoint = new NoPointComponent();
  }
  render() {
    const {AFTERBEGIN} = RenderPlace;
    const pageHeaderEl = document.querySelector(`.page-header`);
    const pageTripOverviewEl = pageHeaderEl.querySelector(`.trip-main`);
    const pageTripControlsEl = pageTripOverviewEl.querySelector(`.trip-controls`);
    const pageMainEl = document.querySelector(`main.page-main`);
    const pageTripEventsEl = pageMainEl.querySelector(`.trip-events`);
    const pageTripInfoEl = pageTripOverviewEl.querySelector(`.trip-info`);
    let isFirstRendering = true;

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
      if (isNextDay && isFirstRendering) {
        currentDate = isNextDay ? data.tripDateStart : currentDate;
        dayCount = isNextDay ? ++dayCount : dayCount;
        tripPointElement = new TripPointComponent(data, dayCount, currentDate);
      }
      tripPointElement.setEditButtonClickEvt(editButtonHandler);
      tripEditElement.setFormSubmitEvt(saveEditHandler);
      renderElement(element, tripPointElement);
    };

    renderElement(pageTripInfoEl, this._tripPrice);
    renderElement(pageTripControlsEl, this._menu, AFTERBEGIN);
    renderElement(pageTripControlsEl, this._filters);
    if (!tempData.length) {
      renderElement(pageTripEventsEl, this._noPoint);
    } else {
      renderElement(pageTripInfoEl, this._tripInfo, AFTERBEGIN);
      renderElement(pageTripEventsEl, this._sort);
      this._sort.setClickListener(() => {
        const sortedTasks = sortData(this._sort.getSortType());
        const currentTasks = document.querySelectorAll(`.trip-days`);
        isFirstRendering = false;

        currentTasks.forEach((it) => it.remove());

        sortedTasks.forEach((it) => {
          renderTask(pageTripEventsEl, it);
        });
      });
      tempData.forEach((it) => {
        renderTask(pageTripEventsEl, it);
      });
    }
  }
}
