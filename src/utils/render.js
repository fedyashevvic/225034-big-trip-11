
import {RenderPlace} from "../components/const.js";
const {BEFOREEND, AFTERBEGIN} = RenderPlace;

const renderElement = (container, companent, place = BEFOREEND) => {
  const element = companent.getElement();

  switch (place) {
    case AFTERBEGIN:
      container.prepend(element);
      break;
    case BEFOREEND:
      container.append(element);
      break;
  }
};

const replaceElement = (container, elementToRemove, elementToAdd) => {
  container.replaceChild(elementToRemove.getElement(), elementToAdd.getElement());
};

export {renderElement, replaceElement};
