const TRANSPORT_TYPES = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`];
const TRIP_DESTINATIONS = [`Saint Petersburg`, `Chamonix`, `Geneva`, `Amsterdam`];
const EVENT_TYPES = [`check-in`, `sightseeing`, `restaurant`];
const TIME_TARNSFORMATION = {
  MS_TO_MIN: 60000,
  MIN_TO_H: 60,
  H_TO_D: 24
};
const MONTH_NAMES = [
  `Jan`,
  `Feb`,
  `Mar`,
  `Apr`,
  `May`,
  `Jun`,
  `Jul`,
  `Aug`,
  `Sep`,
  `Oct`,
  `Nov`,
  `Dec`,
];
const RenderPlace = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

const Key = {
  ESC: `Escape`,
};

export {TRANSPORT_TYPES, TRIP_DESTINATIONS, EVENT_TYPES, TIME_TARNSFORMATION, MONTH_NAMES, RenderPlace, Key};
