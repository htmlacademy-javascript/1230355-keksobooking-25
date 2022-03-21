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

export { deactiveForm, activeForm };
