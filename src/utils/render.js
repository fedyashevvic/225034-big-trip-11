
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

const replaceElement = (elementToRemove, elementToAdd) => {
  const parent = elementToRemove.getElement().parentElement;
  const oldElement = elementToRemove.getElement();
  const newElement = elementToAdd.getElement();

  const isExist = !!(parent, oldElement, newElement);
  if (isExist && parent.contains(oldElement)) {
    parent.replaceChild(newElement, oldElement);
  }
};

export {renderElement, replaceElement};
