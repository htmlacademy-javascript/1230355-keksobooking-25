import { isEscapeKey } from './util.js';

const removePopup = (onKeydown) => {
  const popupElement = document.querySelector('.popup');
  popupElement.removeEventListener('keydown', onKeydown);
  popupElement.remove();
};

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt.key)) {
    evt.preventDefault();
    removePopup(onPopupEscKeydown);
  }
};

const onPopupClick = () => removePopup(onPopupEscKeydown);

const showPopup = (popupNode) => {
  document.body.append(popupNode);
  const popupElement = document.querySelector('.popup');
  popupElement.addEventListener('click', onPopupClick);
  document.addEventListener('keydown', onPopupEscKeydown);
};

const showSuccessPopup = () => {
  const popupNode = document.querySelector('#success').content.cloneNode(true);
  showPopup(popupNode);
};

const showErrorPopup = () => {
  const popupNode = document.querySelector('#error').content.cloneNode(true);
  showPopup(popupNode);
};

export { showSuccessPopup, showErrorPopup };
