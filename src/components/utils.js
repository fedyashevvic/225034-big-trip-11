import {TIME_TARNSFORMATION, MONTH_NAMES} from "./const.js";

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours());
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

const formatDuration = (ms) => {
  const {MS_TO_MIN, MIN_TO_H, H_TO_D} = TIME_TARNSFORMATION;

  let minutes = ms / MS_TO_MIN;
  let hours;
  let days;
  if (minutes / MIN_TO_H > 1) {
    hours = Math.floor(minutes / MIN_TO_H);
    minutes = castTimeFormat(minutes - hours * MIN_TO_H);
  }
  if (hours / H_TO_D > 1) {
    days = castTimeFormat(Math.floor(hours / H_TO_D));
    hours = castTimeFormat(hours - days * H_TO_D);
  }

  return `${days ? `${days}D` : ``} ${hours ? `${hours}H` : ``} ${minutes ? `${minutes}M` : ``}`;
};

const formateFullDate = (date) => {
  return `${date.getFullYear()}-${castTimeFormat(date.getMonth())}-${castTimeFormat(date.getDate())}`;
};

const formateFullCreationDate = (date) => {
  return `${castTimeFormat(date.getDate())}/${castTimeFormat(date.getMonth())}/${date.getFullYear()}`;
};
const formatMonthAndDate = (date) => {
  return `${MONTH_NAMES[date.getMonth()]} ${castTimeFormat(date.getDate())}`;
};

const createElement = (template) => {
  const newEl = document.createElement(`div`);
  newEl.innerHTML = template;

  return newEl.firstChild;
};

export {formatTime, formatDuration, formateFullDate, formateFullCreationDate, formatMonthAndDate, createElement};
