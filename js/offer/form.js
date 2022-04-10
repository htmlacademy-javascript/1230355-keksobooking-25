import { sendOffer } from '../api.js';
import { resetAvatar, resetPhotos } from './photo-loader.js';

const TypePrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};

const LivingOption = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0']
};

const offerFormElement = document.querySelector('.ad-form');
const offerFormFieldSets = offerFormElement.querySelectorAll('fieldset');
const roomNumberElement = offerFormElement.querySelector('#room_number');
const capacityElement = offerFormElement.querySelector('#capacity');
const typeElement = offerFormElement.querySelector('#type');
const priceElement = offerFormElement.querySelector('#price');
const timeInElement = offerFormElement.querySelector('#timein');
const timeOutElement = offerFormElement.querySelector('#timeout');
const sliderElement = offerFormElement.querySelector('.ad-form__slider');
const submitButton = offerFormElement.querySelector('.ad-form__submit');
const resetBtn = offerFormElement.querySelector('.ad-form__reset');

const pristine = new window.Pristine(offerFormElement, {
  classTo: 'ad-form__element-req',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'ad-form__element-req',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__label-req__error-text'
});

const disableForm = () => {
  offerFormElement.classList.add('ad-form--disabled');
  offerFormFieldSets.forEach((el) => el.setAttribute('disabled', ''));

  sliderElement.setAttribute('disabled', '');
};

const enableForm = () => {
  offerFormElement.classList.remove('ad-form--disabled');
  offerFormFieldSets.forEach((el) => el.removeAttribute('disabled'));
  sliderElement.removeAttribute('disabled');
};

const resetForm = () => {
  offerFormElement.reset();
  resetAvatar();
  resetPhotos();
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const setOfferFormSubmit = (onSuccess, onFail) => {
  offerFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendOffer(
        () => {
          onSuccess();
          unblockSubmitButton();
        },
        () => {
          onFail();
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

const validateLiving = () => LivingOption[roomNumberElement.value].includes(capacityElement.value);

const getLivingErrorMessage = () => 'Неверное количество гостей';

pristine.addValidator(roomNumberElement, validateLiving, getLivingErrorMessage);

pristine.addValidator(capacityElement, validateLiving, getLivingErrorMessage);

typeElement.addEventListener('change', () => {
  priceElement.placeholder = TypePrice[typeElement.value];
  priceElement.min = TypePrice[typeElement.value];
});

const validatePrice = () => priceElement.value >= TypePrice[typeElement.value];

const getPriceErrorMessage = () => `Цена должна быть больше ${TypePrice[typeElement.value]}`;

pristine.addValidator(priceElement, validatePrice, getPriceErrorMessage);

timeInElement.addEventListener('change', () => {
  timeOutElement.value = timeInElement.value;
});

timeOutElement.addEventListener('change', () => {
  timeInElement.value = timeOutElement.value;
});

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 0,
  step: 100,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(0),
    from: (value) => {
      if (value < 0) {
        return 0;
      } else if (value > 100000) {
        return 100000;
      }
      return value;
    },
  },
});

sliderElement.noUiSlider.on('update', () => {
  priceElement.value = sliderElement.noUiSlider.get();
  pristine.validate();
});

priceElement.addEventListener('change', () => {
  sliderElement.noUiSlider.set(priceElement.value);
});

export { disableForm, enableForm, setOfferFormSubmit, resetForm, resetBtn };
