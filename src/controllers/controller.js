import TripInfoComponent from '../components/trip-info-template.js';
import TripPriceComponent from '../components/trip-price-template';
import TripMenuComponent from '../components/site-menu-template.js';
import TripFilterComponent from '../components/site-filters-template.js';
import TripSortComponent from '../components/site-sort-template.js';
import NoPointComponent from "../components/no-point-template.js";
import {tempData} from "../components/tempData.js";
import {RenderPlace, SortType} from "../components/const.js";
import {renderElement} from "../utils/render.js";
import PointController from "./point-controller.js";

const {AFTERBEGIN} = RenderPlace;
const pageTripControlsEl = document.querySelector(`.trip-controls`);
const pageTripEventsEl = document.querySelector(`.trip-events`);
const pageTripInfoEl = document.querySelector(`.trip-info`);

const sortData = (type, data) => {
  const {EVENT, TIME, PRICE} = SortType;
  const newData = data.slice();
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

const renderPoints = (container, points, isFirst, onDataChange) => {
  return points.map((point) => {
    const pointController = new PointController(container, isFirst, onDataChange);
    pointController.renderPoint(point);
    return pointController;
  });
};
export default class ControllerComponent {
  constructor() {
    this._tripInfo = new TripInfoComponent();
    this._tripPrice = new TripPriceComponent();
    this._menu = new TripMenuComponent();
    this._filters = new TripFilterComponent();
    this._sort = new TripSortComponent();
    this._noPoint = new NoPointComponent();
    this._isFirstRendering = true;
    this._data = tempData;
    this._renderedPoints = [];

    this._onDataChange = this._onDataChange.bind(this);
  }
  render() {
    renderElement(pageTripInfoEl, this._tripPrice);
    renderElement(pageTripControlsEl, this._menu, AFTERBEGIN);
    renderElement(pageTripControlsEl, this._filters);
    if (!this._data.length) {
      renderElement(pageTripEventsEl, this._noPoint);
    } else {
      renderElement(pageTripInfoEl, this._tripInfo, AFTERBEGIN);
      renderElement(pageTripEventsEl, this._sort);
      this._sort.setClickListener(() => {
        this._sortHandler();
      });
      this._renderedPoints = renderPoints(pageTripEventsEl, this._data, this._isFirstRendering, this._onDataChange);
    }
  }
  _sortHandler() {
    const sortedTasks = sortData(this._sort.getSortType(), this._data);
    const currentTasks = document.querySelectorAll(`.trip-days`);
    currentTasks.forEach((it) => it.remove());
    this._isFirstRendering = false;

    this._renderedPoints = renderPoints(pageTripEventsEl, sortedTasks, this._isFirstRendering, this._onDataChange);
  }
  _onDataChange(oldData, newData) {
    const index = this._data.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._data = [].concat(this._data.slice(0, index), newData, this._data.slice(index + 1));
    this._renderedPoints[index].renderPoint(this._data[index]);
  }
}
