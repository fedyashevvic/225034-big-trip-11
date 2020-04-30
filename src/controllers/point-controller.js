import TripEditComponent from '../components/site-form-template.js';
import TripPointComponent from '../components/trip-point-template.js';
import {renderElement, replaceElement} from "../utils/render.js";
import {Key} from "../components/const.js";
import {tempData} from "../components/tempData.js";

let dayCount = 0;
let currentDate = tempData.length ? tempData[0].tripDateStart : ``;

export default class PointController {
  constructor(container, isFirst, onDataChange) {
    this._container = container;
    this._isFirstRendering = isFirst;
    this._onDataChange = onDataChange;
    this._tripPointElement = null;
    this._tripEditElement = null;
  }
  renderPoint(data) {
    const isNextDay = currentDate.getDate() < data.tripDateStart.getDate() || currentDate === data.tripDateStart ? true : false;
    const oldTripPointElement = this._tripPointElement;
    const oldTripEditElement = this._tripEditElement;

    this._tripPointElement = new TripPointComponent(data, ``, ``);
    this._tripEditElement = new TripEditComponent(data);

    if (isNextDay && this._isFirstRendering) {
      currentDate = isNextDay ? data.tripDateStart : currentDate;
      dayCount = isNextDay ? ++dayCount : dayCount;
      this._tripPointElement = new TripPointComponent(data, dayCount, currentDate);
    }
    this._tripPointElement.setEditButtonClickEvt(() => {
      this._editPointHandler();
    });
    this._tripEditElement.setFormSubmitEvt(() => {
      this._savePointChanges();
    });
    this._tripEditElement.setFavoriteEvt(() => {
      this._onDataChange(data, Object.assign({}, data, {
        isFavorite: !data.isFavorite,
      }));
    });
    if (oldTripPointElement && oldTripEditElement) {
      replaceElement(oldTripEditElement, this._tripEditElement);
    } else {
      renderElement(this._container, this._tripPointElement);
    }
  }

  _editPointHandler() {
    replaceElement(this._tripPointElement, this._tripEditElement);
    const closeOnEsc = (evt) => {
      if (evt.key === Key.ESC) {
        this._savePointChanges();
        window.removeEventListener(`keydown`, closeOnEsc);
      }
    };
    window.addEventListener(`keydown`, closeOnEsc);
  }

  _savePointChanges() {
    replaceElement(this._tripEditElement, this._tripPointElement);
  }
}
