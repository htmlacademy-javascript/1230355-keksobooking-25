import { sendOffer } from './api.js';
import { resetMarker } from './map.js';
const FORM_SUBMISSION = document.querySelector('.ad-form');

const ROOMS_FIELD = FORM_SUBMISSION.querySelector('#room_number');

const CAPACITY_FIELD = FORM_SUBMISSION.querySelector('#capacity');

const PRISTINE = new window.Pristine(FORM_SUBMISSION, {
  classTo: 'ad-form__element-req',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'ad-form__element-req',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__label-req__error-text'
});

const TYPE_FIELD = FORM_SUBMISSION.querySelector('#type');

const PRICE_FIELD = FORM_SUBMISSION.querySelector('#price');

const TIME_IN_FIELD = FORM_SUBMISSION.querySelector('#timein');

const TIME_OUT_FIELD = FORM_SUBMISSION.querySelector('#timeout');

const SLIDER_ELEMENT = FORM_SUBMISSION.querySelector('.ad-form__slider');

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

const disableForm = () => {
  FORM_SUBMISSION.classList.add('ad-form--disabled');
  document.querySelectorAll('.ad-form fieldset').forEach((el) => el.setAttribute('disabled', ''));
  document.querySelector('.ad-form__slider').setAttribute('disabled', '');

};

const enableForm = () => {
  FORM_SUBMISSION.classList.remove('ad-form--disabled');
  document.querySelectorAll('.ad-form fieldset').forEach((el) => el.removeAttribute('disabled'));
  document.querySelector('.ad-form__slider').removeAttribute('disabled');

};

const submitButton = FORM_SUBMISSION.querySelector('.ad-form__submit');

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const resetBtn = document.querySelector('.ad-form__reset');
const avatar = document.querySelector('#avatar');
const avatarImg = document.querySelector('.ad-form-header__preview img');
const photos = document.querySelector('#images');
const address = document.querySelector('#address');

const resetForm = () => {
  FORM_SUBMISSION.reset();
  avatar.files.value = 'img/muffin-grey.svg';
  avatarImg.src = 'img/muffin-grey.svg';
  photos.files.value = '';
  const userPhotos = document.querySelectorAll('.photo');
  userPhotos.forEach((element) => element.remove());
  resetMarker(address);
};

resetBtn.addEventListener('click', resetForm);

const setUserFormSubmit = (onSuccess, onFail) => {
  FORM_SUBMISSION.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = PRISTINE.validate();
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

const validateLiving = () => LivingOption[ROOMS_FIELD.value].includes(CAPACITY_FIELD.value);

const getLivingErrorMessage = () => 'Неверное количество гостей';

PRISTINE.addValidator(ROOMS_FIELD, validateLiving, getLivingErrorMessage);

PRISTINE.addValidator(CAPACITY_FIELD, validateLiving, getLivingErrorMessage);

TYPE_FIELD.addEventListener('change', () => {
  PRICE_FIELD.placeholder = TypePrice[TYPE_FIELD.value];
  PRICE_FIELD.min = TypePrice[TYPE_FIELD.value];
});

const validatePrice = () => PRICE_FIELD.value >= TypePrice[TYPE_FIELD.value];

const getPriceErrorMessage = () => `Цена должна быть больше ${TypePrice[TYPE_FIELD.value]}`;

PRISTINE.addValidator(PRICE_FIELD, validatePrice, getPriceErrorMessage);

TIME_IN_FIELD.addEventListener('change', () => {
  TIME_OUT_FIELD.value = TIME_IN_FIELD.value;
});

TIME_OUT_FIELD.addEventListener('change', () => {
  TIME_IN_FIELD.value = TIME_OUT_FIELD.value;
});

noUiSlider.create(SLIDER_ELEMENT, {
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

SLIDER_ELEMENT.noUiSlider.on('update', () => {
  PRICE_FIELD.value = SLIDER_ELEMENT.noUiSlider.get();
  PRISTINE.validate();
});

PRICE_FIELD.addEventListener('change', () => {
  SLIDER_ELEMENT.noUiSlider.set(PRICE_FIELD.value);
});

export { disableForm, enableForm, setUserFormSubmit, resetForm };
