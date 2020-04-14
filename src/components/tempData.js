import {TRANSPORT_TYPES, TRIP_DESTINATIONS, EVENT_TYPES} from "./const.js";

const additionalOffers = [
  {
    title: `luggage`,
    description: `Add luggage`,
    price: `10`
  },
  {
    title: `comfort`,
    description: `Switch to comfort class`,
    price: `100`
  }
];
const descriptions = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.`, `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`, `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`, `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.`, `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`];
const tripImages = [`http://picsum.photos/248/152?r=${Math.random()}`, `http://picsum.photos/248/152?r=${Math.random()}`, `http://picsum.photos/248/152?r=${Math.random()}`];
const tripPrice = [`20`, `40`, `100`, `242`, `12`, `200`];
const eventType = TRANSPORT_TYPES.concat(EVENT_TYPES);
const NUMBER_OF_MOKES = 20;
const tempData = [];

const createRandomArr = (arr) => {
  let randomArr = [];
  for (let i = 0; i < (1 + Math.random() * (arr.length - 1)); i++) {
    randomArr.push(arr[i]);
  }
  return randomArr;
};

const returnTempData = () => {
  return {
    tripDescription: createRandomArr(descriptions).join(` `),
    tripImage: createRandomArr(tripImages),
    tripOffer: additionalOffers,
    tripDateStart: new Date(2020, 3, Math.floor(1 + Math.random() * (10 - 1)), Math.floor(Math.random() * Math.floor(24)), Math.floor(Math.random() * Math.floor(60))),
    tripDateEnd: new Date(2020, 3, Math.floor(11 + Math.random() * (20 - 11)), Math.floor(Math.random() * Math.floor(24)), Math.floor(Math.random() * Math.floor(60))),
    tripEventType: eventType[Math.floor(Math.random() * Math.floor(eventType.length))],
    tripPointTitle: TRIP_DESTINATIONS[Math.floor(Math.random() * Math.floor(TRIP_DESTINATIONS.length))],
    tripPointPrice: tripPrice[Math.floor(Math.random() * Math.floor(tripPrice.length))],
  };
};

for (let i = 0; i < NUMBER_OF_MOKES; i++) {
  tempData.push(returnTempData());
}
tempData.sort((a, b) => {
  return a.tripDateStart < b.tripDateStart ? -1 : 0;
});

export {tempData};
