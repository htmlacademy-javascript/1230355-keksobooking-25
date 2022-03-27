const formSubmission = document.querySelector('.ad-form');
const deactiveForm = () => {
  formSubmission.classList.add('ad-form--disabled');
  document.querySelectorAll('.ad-form fieldset').forEach((el) => {
    el.setAttribute('disabled', '');
  });
  document.querySelector('.ad-form__slider').setAttribute('disabled', '');
  document.querySelector('.map__filters').classList.add('map__filters--disabled');
  document.querySelectorAll('.map__filters select').forEach((el) => {
    el.setAttribute('disabled', '');
  });
};

const activeForm = () => {
  formSubmission.classList.remove('ad-form--disabled');
  document.querySelectorAll('.ad-form fieldset').forEach((el) => {
    el.removeAttribute('disabled');
  });
  document.querySelector('.ad-form__slider').removeAttribute('disabled');
  document.querySelector('.map__filters').classList.remove('map__filters--disabled');
  document.querySelectorAll('.map__filters select').forEach((el) => {
    el.removeAttribute('disabled');
  });
};

const pristine = new Pristine(formSubmission, {
  classTo: 'ad-form__element-req',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'ad-form__element-req',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__label-req__error-text'
});

formSubmission.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

const roomsField = formSubmission.querySelector('#room_number');
const capacityField = formSubmission.querySelector('#capacity');
const livingOption = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0']
};

const validateLiving = () => livingOption[roomsField.value].includes(capacityField.value);
const getLivingErrorMessage = () => 'Неверное количество гостей';
pristine.addValidator(roomsField, validateLiving, getLivingErrorMessage);
pristine.addValidator(capacityField, validateLiving, getLivingErrorMessage);


const typeField = formSubmission.querySelector('#type');
const priceField = formSubmission.querySelector('#price');
const typePrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};
typeField.addEventListener('change', () => {
  priceField.placeholder = typePrice[typeField.value];
  priceField.min = typePrice[typeField.value];
});
const validatePrice = () => priceField.value >= typePrice[typeField.value];
const getPriceErrorMessage = () => `Цена должна быть больше ${typePrice[typeField.value]}`;
pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);

const timeInField = formSubmission.querySelector('#timein');
const timeOutField = formSubmission.querySelector('#timeout');
timeInField.addEventListener('change', () => {
  timeOutField.value = timeInField.value;
});
timeOutField.addEventListener('change', () => {
  timeInField.value = timeOutField.value;
});


const sliderElement = document.querySelector('.ad-form__slider');
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
  priceField.value = sliderElement.noUiSlider.get();
  pristine.validate();
});

priceField.addEventListener('change', () => {
  sliderElement.noUiSlider.set(priceField.value);
});

export { deactiveForm, activeForm };
